"use strict";

const { pick } = require("lodash");
const Promise = require("bluebird");
//const logger = require("../utils/winston.config").file_logger;
class Database {
    /**
     * 	Create an instance of Database for a given table
     *
     * @param {String} table - name of the table
     * @param {String[]} filter - default filter for search (columns of the table)
     */
    constructor(model, filter) {
        if (!model.tableName) throw new Error("Missing table name !");
        this.table = `${model.tableName}`;
        this.fields = [];
        for (var field in model.attributes) {
            this.fields.push(field);
        }
        if (Array.isArray(filter)) {
            filter.forEach((item) => {
                if (!this.fields.includes(item))
                    throw new Error(
                        `Invalid filter field ${item}. The table ${this.table} do not contain this column.`
                    );
            });

            if (filter.length === 0)
                throw new Error(`Invalid filter. No fields found.`);
        } else if (filter) {
            throw new Error(
                `Invalid filter. The filter needs to be an array of Strings.`
            );
        }

        this.default_filter = filter || this.fields;
    }

    /**
     * 	Verify the existance of all the parameters given
     *
     * @param {Object} obj
     *
     * @returns {Promise}
     */
    parameterValidator(obj) {
        for (var item in obj) {
            if (!obj[item])
                return Promise.reject({
                    name: "Missing parameter",
                    message: `Missing parameter ${item}`,
                });

            switch (item) {
                case "ctx":
                    if (typeof obj[item].call !== "function")
                        return Promise.reject({
                            name: "Invalid parameter",
                            message: `Invalid parameter ${item}.`,
                        });
                    break;

                case "query":
                case "entity":
                case "update":
                    if (typeof obj[item] !== "object")
                        return Promise.reject({
                            name: "Invalid parameter",
                            message: `Invalid parameter ${item}, it needs to be an Object, and its fields must exist in the table (columns)`,
                        });

                    var test = this.verifyFields(obj[item], false);

                    if (test !== true) return Promise.reject(test);
                    break;

                case "entities":
                    if (!Array.isArray(obj[item]))
                        return Promise.reject({
                            name: "Invalid parameter",
                            message: `Invalid parameter ${item}.`,
                        });

                    var test = true;

                    obj[item].forEach((entity) => {
                        if (typeof entity !== "object")
                            return Promise.reject({
                                name: "Invalid parameter",
                                message: `Invalid parameter ${item}, it needs to be an Object, and its fields must exist in the table (columns)`,
                            });

                        if (test === true)
                            test = this.verifyFields(entity, false);
                    });
                    if (test !== true) return Promise.reject(test);
                    break;
            }
        }

        return Promise.resolve(true);
    }

    /**
     * 	Verify that each field of the object correspond to a column of the table
     *
     * @param {(Object|String[])} fields
     * @param {Boolean} [isPromise=true] - (Optional)
     *
     * @returns {Promise}
     */
    verifyFields(fields, isPromise) {
        var resultType = isPromise === false ? isPromise : true;
        var result = {
            error: false,
            type: "",
            field: "",
            value: "",
        };

        if (Array.isArray(fields)) {
            fields.forEach((item, i) => {
                if (!this.fields.includes(item))
                    result = {
                        error: true,
                        type: "filter",
                        field: `n°${i}`,
                        value: `: ${item}`,
                    };
            });
        } else if (typeof fields === "object") {
            for (var item in fields) {
                if (!this.fields.includes(item))
                    result = {
                        error: true,
                        type: "query",
                        field: `${item}`,
                        value: ``,
                    };
            }
        } else if (resultType)
            return Promise.reject({
                name: "Invalid data type",
                message: `Data type must be (Object|String[])`,
            });
        else
            return {
                name: "Invalid data type",
                message: `Data type must be (Object|String[])`,
            };

        if (resultType) {
            if (result.error)
                return Promise.reject({
                    name: "Invalid field",
                    message: `Invalid field ${result.field} for ${result.type}${result.value}`,
                });
            else return Promise.resolve(true);
        } else if (result.error)
            return {
                name: "Invalid field",
                message: `Invalid field ${result.field} for ${result.type}${result.value}`,
            };
        else return true;
    }

    /**
     * 	Format an Error Message from Sequelize (database) Error
     *
     * @param {Object} error - SequelizeError
     *
     * @returns {Object}
     */
    sequelizeErrorHandler(error) {
        var message = "Details:";
        var errorTypes = {
            null: false,
            unique: false,
            unkown: false,
        };

        if (error.name === "SequelizeDatabaseError")
            return {
                name: "Database Error",
                message: error.parent ? error.parent.sqlMessage : error.message,
            };
        else if (error.errors) {
            var errors = error.errors.map((error) => {
                var type = "Unknown";

                switch (error.type) {
                    case "notNull Violation":
                        errorTypes.null = true;
                        type = "notNull";
                        break;

                    case "unique violation":
                        errorTypes.unique = true;
                        type = "unique";
                        break;

                    default:
                        errorTypes.unkown = true;
                        type = error.type;
                        break;
                }

                return {
                    field: error.path,
                    type: type,
                };
            });

            if (errorTypes.null === true)
                message += " NOT NULL contraint not respected;";
            if (errorTypes.unique === true)
                message += " UNIQUE contraint not respected;";
            if (errorTypes.unkown === true) message += " Unknown error;";

            return {
                name: "Database Error",
                message: message,
                data: errors,
            };
        } else {
            return {
                name: "Database Error",
                message: "Unknown Error",
            };
        }
    }

    /**
     * 	Find all entities by query, and filter the fields of results
     *
     *	Search Fields:
     *  - query:	{type: "Object", optional: true}   --> ex:  { username: "username", age: { $lt: 5 } }
     *  - filter:	{type: "Array", optional: true, item: "String"}   --> ex:  ["id", "username"]
     *  - limit:	{type: "Number", optional: true}   --> ex:  10
     *  - order:	{type: "array", optional: true}   --> ex:  [["time", "DESC"]]
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} search
     *
     * @returns {Promise}
     */
    find(ctx, search) {
        var query = search ? search.query || {} : {};
        var filter = search
            ? search.filter || this.default_filter
            : this.default_filter;
        var limit = search
            ? typeof search.limit === "number"
                ? search.limit
                : undefined
            : undefined;
        var include = search ? search.include || "" : "";
        var order = search ? search.order || undefined : undefined;

        return this.parameterValidator({ ctx: ctx, query: query })
            .then(() => {
                if (typeof query === "object" && Array.isArray(filter))
                    return Promise.resolve(true);
                else
                    return Promise.reject({
                        name: "Invalid 'search' parameter",
                        message:
                            "Details: 'search.query' needs to be an Object, and 'search.filter' an Array",
                    });
            })
            .then(() => this.verifyFields(query))
            .then(() => this.verifyFields(filter))
            .then(() =>
                ctx.call("dbconnector.callSequelize", {
                    model: this.table,
                    action: "findAll",
                    values: null,
                    options: {
                        where: query,
                        limit: limit,
                        include: include,
                        order: order,
                    },
                })
            )
            .then((res) => res.map((item) => pick(item, filter)))
            .then((res) => {
                if (res.length !== 0)
                    return Promise.resolve({
                        name: "Operation Successful",
                        message: `Search Complete: ${res.length} element(s) found`,
                        data: res,
                    });
                else
                    return Promise.resolve({
                        name: "Nothing Found",
                        message: `Search Complete: 0 element found`,
                    });
            })
            .catch((error) => {
              //  logger.error("[find] query error: " + error.message);
                if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while searching for entities",
                    });
            });
    }

    /**
     * 	Find only one entity by query, and filter the fields of the result
     *
     *	Obj Fields:
     *  - query:	{type: "Object", optional: true}   --> ex:  { username: "username", age: { $lt: 5 } }
     *  - filter:	{type: "Array", optional: true, item: "String"}   --> ex:  ["id", "username"]
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} search
     *
     * @returns {Promise}
     */
    async findOne(ctx, search) {
        try {
            var query = search ? search.query || {} : {};
            var filter = search
                ? search.filter || this.default_filter
                : this.default_filter;
            var limit = search
                ? typeof search.limit === "number"
                    ? search.limit
                    : undefined
                : undefined;
            var include = search ? search.include || "" : "";
            var order = search ? search.order || undefined : undefined;

            await this.parameterValidator({ ctx: ctx, query: query });

            if (!(typeof query === "object" && Array.isArray(filter)))
                return Promise.reject({
                    name: "Invalid 'search' parameter",
                    message:
                        "Details: 'search.query' needs to be an Object, and 'search.filter' an Array",
                });

            await this.verifyFields(query);
            await this.verifyFields(filter);
            let result = await ctx.call("dbconnector.callSequelize", {
                model: this.table,
                action: "findOne",
                values: null,
                options: {
                    where: query,
                    include: include,
                    order: order,
                },
            });
            let data = null;
            if (result) data = pick(result, filter);
            return Promise.resolve({
                name: "Operation Successful",
                message: `Search Complete`,
                data: data,
            });
        } catch (error) {
           // logger.error("[findOne] query error: " + error.message);
            return Promise.reject({
                name: "Unkown Error",
                message:
                    "Internal Error: something went wrong while searching for entities",
            });
        }
    }

    /**
     * 	Find the entity with the given id, and filter the fields of the result
     *
     *	Search Fields:
     *  - id:	{type: "number | str], optional: false}   --> ex:  { id: "G-123456" }
     *  - filter:	{type: "Array", optional: true, item: "String"}   --> ex:  ["id", "username"]
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} search
     *
     * @returns {Promise}
     */
    /**
     * 	Find only one entity by query, and filter the fields of the result
     *
     *	Obj Fields:
     *  - query:	{type: "Object", optional: true}   --> ex:  { username: "username", age: { $lt: 5 } }
     *  - filter:	{type: "Array", optional: true, item: "String"}   --> ex:  ["id", "username"]
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} search
     *
     * @returns {Promise}
     */
    async findById(ctx, id) {
        try {
            let result = await ctx.call("dbconnector.callSequelize", {
                model: this.table,
                action: "findByPk",
                values: id,
                options: null,
            });
            return Promise.resolve({
                name: "Operation Successful",
                message: `Search Complete`,
                data: result,
            });
        } catch (error) {
            //logger.error("[findById] query error: " + error.message);
            return Promise.reject({
                name: "Unkown Error",
                message:
                    "Internal Error: something went wrong while searching for entities",
            });
        }
    }
    /**
     * 	Find only one entity by query, and filter the fields of the result
     *
     *	Obj Fields:
     *  - query:	{type: "Object", optional: true}   --> ex:  { username: "username", age: { $lt: 5 } }
     *  - filter:	{type: "Array", optional: true, item: "String"}   --> ex:  ["id", "username"]
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} search
     *
     * @returns {Promise}
     */
    async findOrCreate(ctx, search, entity) {
        try {
            var query = search ? search.query || {} : {};
            await this.parameterValidator({ ctx: ctx, query: query });
            await this.verifyFields(query);
            let result = await ctx.call("dbconnector.callSequelize", {
                model: this.table,
                action: "findOrCreate",
                values: null,
                options: {
                    where: query,
                    defaults: entity,
                },
            });
            return Promise.resolve({
                name: "Operation Successful",
                message: `Search Complete`,
                data: result,
            });
        } catch (error) {
            //logger.error("[findOrCreate] query error: " + error.message);
            return Promise.reject({
                name: "Unkown Error",
                message:
                    "Internal Error: something went wrong while searching for entities",
            });
        }
    }
    /**
     * 	Count the entities found corresponding to the given query
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} query - Clause WHERE --> ex:  { username: "username", age: { $lt: 5 } }
     *
     * @returns {Promise}
     */
    async count(ctx, query) {
        try {
            await this.parameterValidator({ ctx: ctx, query: query });
            let res = await ctx.call("dbconnector.callSequelize", {
                model: this.table,
                action: "count",
                values: null,
                options: {
                    where: query,
                },
            });
            return Promise.resolve({
                name: "Operation Successful",
                message: `Count Complete: ${res} element(s) found`,
                data: res,
            });
        } catch (error) {
            if (
                error.name &&
                error.message &&
                !error.type &&
                !error.code &&
                !error.ctx
            )
                return Promise.reject(error);
            else
                return Promise.reject({
                    name: "Unkown Error",
                    message:
                        "Internal Error: something went wrong while searching for entities",
                });
        }
    }

    /**
     * 	Insert a new entity into the table of the database
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} entity
     *
     * @returns {Promise}
     */
    async insert(ctx, entity) {
        try {
            let res = await ctx.call("dbconnector.callSequelize", {
                model: this.table,
                action: "create",
                values: entity,
                options: null,
            });
            return Promise.resolve({
                name: "Operation Successful",
                message: `Insert Done: element (id: ${res.id}) inserted in table`,
                data: res,
            });
        } catch (error) {
           // logger.error("[insert] query error: " + error.message);
            if (error.name.indexOf("Sequelize") !== -1)
                return Promise.reject(this.sequelizeErrorHandler(error));
            else if (
                error.name &&
                error.message &&
                !error.type &&
                !error.code &&
                !error.ctx
            )
                return Promise.reject(error);
            else
                return Promise.reject({
                    name: "Unkown Error",
                    message:
                        "Internal Error: something went wrong while searching for entities",
                });
        }
    }

    /**
     * 	Insert several entities into the table of the database
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object[]} entities - Array of entities
     *
     * @returns {Promise}
     */
    insertMany(ctx, entities) {
        var entities_id = [];

        return this.parameterValidator({ ctx: ctx, entities: entities })
            .then(() => entities.map((entity) => entity))
            .then((final_entities) =>
                ctx.call("dbconnector.callSequelize", {
                    model: this.table,
                    action: "bulkCreate",
                    values: entity,
                    options: null,
                })
            )
            .then((res) => res.map((item) => item.dataValues.id))
            .then((res) => {
                return Promise.resolve({
                    name: "Operation Successful",
                    message: `Inserts Done: ${res.length} element(s) inserted in table`,
                    data: res,
                });
            })
            .catch((error) => {
               // logger.error("[insertMany] query error: " + error.message);
                if (error.name.indexOf("Sequelize") !== -1)
                    return Promise.reject(this.sequelizeErrorHandler(error));
                else if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while searching for entities",
                    });
            });
    }
    /**
     * 	Update or Insert the entity with query
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {String} id
     * @param {Object} update - Object with fields to update --> ex:  { username: "user_2" }
     *
     * @returns {Promise}
     */
    upsert(ctx, query, update) {
        // logger.debug(
        //     `query ${JSON.stringify(query)} update: ${JSON.stringify(update)}`
        // );
        return this.parameterValidator({
            ctx: ctx,
            query: query,
            update: update,
        })
            .then(() =>
                ctx.call("dbconnector.callSequelize", {
                    model: this.table,
                    action: "upsert",
                    values: update,
                    options: { where: query },
                })
            )
            .then((res) =>
                Promise.resolve({
                    name: "Operation Successful",
                    message: `Update Done: element (id: ${res.id}) updated in table`,
                    data: res,
                })
            )
            .catch((error) => {
               // logger.error("[update] query error: " + error.message);
                if (error.name.indexOf("Sequelize") !== -1)
                    return Promise.reject(this.sequelizeErrorHandler(error));
                else if (error.name === "Nothing Found")
                    return Promise.reject({
                        name: "Nothing Found",
                        message: "Nothing was deleted",
                    });
                else if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while updating the entities",
                    });
            });
    }

    /**
     * 	Update the entity with the given id
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {String} id
     * @param {Object} update - Object with fields to update --> ex:  { username: "user_2" }
     *
     * @returns {Promise}
     */
    update(ctx, query, update) {
        // logger.debug(
        //     `query ${JSON.stringify(query)} update: ${JSON.stringify(update)}`
        // );
        return this.parameterValidator({
            ctx: ctx,
            query: query,
            update: update,
        })
            .then(() =>
                ctx.call("dbconnector.callSequelize", {
                    model: this.table,
                    action: "update",
                    values: update,
                    options: { where: query },
                })
            )
            .then((res) =>
                Promise.resolve({
                    name: "Operation Successful",
                    message: `Update Done: element (id: ${res.id}) updated in table`,
                    data: res,
                })
            )
            .catch((error) => {
              //  logger.error("[update] query error: " + JSON.stringify(error));
                if (error.name.indexOf("Sequelize") !== -1)
                    return Promise.reject(this.sequelizeErrorHandler(error));
                else if (error.name === "Nothing Found")
                    return Promise.reject({
                        name: "Nothing Found",
                        message: "Nothing was deleted",
                    });
                else if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while updating the entities",
                    });
            });
    }

    /**
     * 	Update all entity corresponding to the given query
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} query - Clause WHERE --> ex:  { username: "username", age: { $lt: 5 } }
     * @param {Object} update - Object with fields to update --> ex:  { username: "user_2" }
     *
     * @returns {Promise}
     */
    updateMany(ctx, query, update) {
        var entities_id = [];

        return this.parameterValidator({
            ctx: ctx,
            query: query,
            update: update,
        })
            .then(() =>
                this.find(ctx, {
                    query: query,
                    filter: ["id"],
                })
            )
            .then((res) =>
                Promise.all(
                    res.data.map((item) => this.update(ctx, item.id, update))
                )
            )
            .then((res) => res.map((item) => item.data))
            .then((res) =>
                Promise.resolve({
                    name: "Operation Successful",
                    message: `Updates Done: ${res.length} element(s) updated`,
                    data: res,
                })
            )
            .catch((error) => {
               // logger.error("[updateMany] query error: " + error.message);
                if (error.name.indexOf("Sequelize") !== -1)
                    return Promise.reject(this.sequelizeErrorHandler(error));
                else if (error.name === "Nothing Found")
                    return Promise.reject({
                        name: "Nothing Found",
                        message: "Nothing was deleted",
                    });
                else if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while updating the entities",
                    });
            });
    }

    /**
     * 	Remove the entity with the given id
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} id
     *
     * @returns {Promise}
     */
    removeOne(ctx, query) {
        return this.parameterValidator({ ctx: ctx, query: query })
            .then(() =>
                ctx.call("dbconnector.callSequelize", {
                    model: this.table,
                    action: "destroy",
                    values: null,
                    options: { where: query, limit: 1 },
                })
            )
            .then(() =>
                Promise.resolve({
                    name: "Operation Successful",
                    message: `Delete Complete: element deleted`,
                    data: query,
                })
            )
            .catch((error) => {
                if (error.name === "Nothing Found")
                    return Promise.reject({
                        name: "Nothing Found",
                        message: "Wrong id: nothing was deleted",
                    });
                else if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while deleting the entity",
                    });
            });
    }

    /**
     * 	Remove several entities with the given query
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     * @param {Object} query - Clause WHERE --> ex:  { username: "username", age: { $lt: 5 } }
     *
     * @returns {Promise}
     */
    removeMany(ctx, query) {
        return this.parameterValidator({ ctx: ctx, query: query })
            .then(() =>
                ctx.call("dbconnector.callSequelize", {
                    model: this.table,
                    action: "destroy",
                    values: null,
                    options: { where: query },
                })
            )
            .then((res) =>
                Promise.resolve({
                    name: "Operation Successful",
                    message: `Delete Complete: ${res} element(s) deleted`,
                    data: res,
                })
            )
            .catch((error) => {
                if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while deleting the entities",
                    });
            });
    }

    /**
     * 	Remove all entities from the table
     *
     * @param {Object} ctx - Will serve to call a service action: ctx.call
     *
     * @returns {Promise}
     */
    removeAll(ctx) {
        return this.parameterValidator({ ctx: ctx })
            .then(() =>
                ctx.call("dbconnector.callSequelize", {
                    model: this.table,
                    action: "destroy",
                    values: null,
                    options: { where: {}, truncate: true },
                })
            )
            .then(() =>
                Promise.resolve({
                    name: "Operation Successful",
                    message: "Delete Complete",
                })
            )
            .catch((error) => {
                if (
                    error.name &&
                    error.message &&
                    !error.type &&
                    !error.code &&
                    !error.ctx
                )
                    return Promise.reject(error);
                else
                    return Promise.reject({
                        name: "Unkown Error",
                        message:
                            "Internal Error: something went wrong while emptying the table",
                    });
            });
    }
}

module.exports = Database;
