'use strict'

var config = {};

config.routes = {
    default: {
        protocol: "http",
        host: "localhost",
        port: "8080"
    },
    remote: {
        protocol: "http",
        host: "www.marca.com",
        port: "80"
    },
    remote2: {
        protocol: "http",
        host: "www.marca.com",
        port: "80",
        suburl: "futbol"
    },
};

config.mockdir = "mockfiles"

module.exports = config;