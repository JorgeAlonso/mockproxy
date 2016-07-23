'use strict'

var config = {};

config.routes = {
    default: {
        protocol: "https",
        host: "peg-dev-public-api.eu.cloudhub.io",
        port: "443",
        suburl: "/api/v0.2"
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