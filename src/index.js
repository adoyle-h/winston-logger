'use strict';

const is = require('is_js');
const assert = require('assert');
const {createLogger, format: formatter, transports: t} = require('winston');

const {printf, combine} = formatter;
const myFormat = require('./format');

const create = (upperConfig) => (config = {}) => {
    assert(typeof config === 'object', 'Parameter must be an object');
    const {label} = config;
    const {
        level = 'debug',
        console: useConsole = false,
        depth = 3,
        colors = false,
        files = [
            {filename: 'logs/error.log', level: 'error'},
            {filename: 'logs/all.log', level: 'debug'},
        ],
    } = {...upperConfig, ...config};
    let {format} = config;
    const defaultFileTransProps = {maxsize: 1024 * 100, maxFiles: 2, tailable: true};

    const fileTransportsProps = files.map((props) => ({
        ...defaultFileTransProps, ...props,
    }));

    const combs = [
        printf(myFormat({depth, colors})),
    ];
    if (label) combs.unshift(formatter.label({label}));
    if (!format) {
        format = combine(...combs);
    }

    const transports = fileTransportsProps.map((f) => new t.File(f));

    if (useConsole === true) {
        transports.push(new t.Console());
    }

    const logger = createLogger({
        level, format, transports,
    });

    return logger;
};

const Factory = {};

Factory.new = (config = {}) => {
    assert(is.json(config), 'config must be an object');
    const {files, console: useConsole} = config;
    if (files !== undefined) assert(is.array(files), 'config.files must be an array');
    if (useConsole !== undefined) assert(is.boolean(useConsole), 'config.console must be an boolean');

    return {config, create: create(config)};
};

module.exports = exports = Factory;
exports.default = Factory;
