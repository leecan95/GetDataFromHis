const BaseValidator = require("moleculer").Validator;
const { ValidationError } = require("moleculer").Errors;
const Validator = require("fastest-validator");

class CustomValidator extends BaseValidator {
	constructor() {
		super();
		this.validator = new Validator({
			useNewCustomCheckerFunction: true,
			messages: {
				// Register our new error message text
				password:
					"Password must have one letter, one number and one special charracter",
				phone_number: "The phone number must be valid",
				string_number: "Input is not number",
				datetime: "Input cannot convert to date",
				mongo_id: "Input must be mongo id type"
			},
		});

		this.validator.rules.phone_number = function (
			{ schema, messages },
			path,
			context
		) {
			const regex = /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/;
			return {
				source: `
					let regex = ${regex};
					if(value && typeof(value) ==='string') value = value.trim();
                    if(!regex.test(value))
                        ${this.makeError({
					type: "phone_number",
					actual: "value",
					messages,
				})}
				return '0'+value.substring(value.length - 9);
                `,
			};
		};
		this.validator.rules.string_number = function (
			{ schema, messages },
			path,
			context
		) {
			return {
				source: `
				if(value && typeof(value) ==='string') value = value.trim();
				if(!/[0-9]{1,}$/.test(value))
					${this.makeError({
					type: "string_number",
					actual: "value",
					messages,
				})}
					return Number(value);
                `,
			};
		};
		this.validator.rules.datetime = function (
			{ schema, messages },
			path,
			context
		) {
			return {
				source: `
				if(value && typeof(value) ==='string') value = value.trim();
				if(!(value instanceof Date)){
					if(Number(value)){
						value = new Date(Number(value));
					}else{
						value = new Date(value);
					}
				}
				if(!(value instanceof Date) || isNaN(value.getTime())){
					${this.makeError({
					type: "datetime",
					actual: "value",
					messages,
				})}
				}
					
				return value;
                `,
			};
		};
		this.validator.rules.mongo_id = function (
			{ schema, messages },
			path,
			context
		) {
			return {
				source: `
				if(value && typeof(value) ==='string') value = value.trim();
				if(!/^[0-9a-fA-F]{24}$/.test(value)){
					${this.makeError({
					type: "mongo_id",
					actual: "value",
					messages,
				})}
				}
				return value;
				`,
			};
		};
		this.validator.rules.password = function (
			{ schema, messages },
			path,
			context
		) {
			let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+=-]).{8,20}$/;
			return {
				source: `
                    let regex = ${regex};
                    if(!regex.test(value))
                        ${this.makeError({
					type: "password",
					actual: "value",
					messages,
				})}
                        return value;
                `,
			};
		};
	}
	validate(params, schema) {
		const res = this.validator.validate(params, schema);
		if (res !== true)
			throw new ValidationError(
				"Parameters validation error!",
				null,
				res
			);

		return true;
	}
}
module.exports = CustomValidator;
