"use strict";

const { ServiceBroker } = require("moleculer");
global.__basedir = __dirname;
const brokerConfig = require(__basedir + "/moleculer.config");
const broker = new ServiceBroker(brokerConfig);

broker.loadServices(__basedir + "/services");

broker.start().then(async () => {
	broker.repl();
});
