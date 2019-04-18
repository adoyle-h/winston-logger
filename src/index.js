'use strict';

const is = require('is_js');
const assert = require('assert');
const {createLogger, format: formatter, transports: t} = require('winston');

const {printf, combine} = formatter;
const {consoleFormat, fileFormat} = require('./format');
const {DEBUG_LOG = ''} = process.env;
const debugLogRegex = DEBUG_LOG.length > 0
    ? new RegExp(DEBUG_LOG.replace('*', '.+'))
    : null;
const debugLogMatch = debugLogRegex
    ? (label) => debugLogRegex.test(label)
    : () => false;

const create = (upperConfig) => (config = {}) => {
    assert(typeof config === 'object', 'Parameter must be an object');
    const {label} = config;
    const {
        level = 'debug',
        console: useConsole = false,
        depth = 3,
        colors = true,
        files = [
            {filename: 'logs/error.log', level: 'error'},
            {filename: 'logs/all.log', level: 'debug'},
        ],
        hiddenDebug = true,
    } = {...upperConfig, ...config};
    const defaultFileTransProps = {maxsize: 1024 * 100, maxFiles: 2, tailable: true};

    let commonFormats = [];
    if (label) commonFormats.push(formatter.label({label}));
    commonFormats = combine(...commonFormats);


    const fileTransportsProps = files.map((props) => ({
        format: printf(fileFormat({depth})),
        ...defaultFileTransProps,
        ...props,
    }));

    const transports = fileTransportsProps.map((f) => new t.File(f));

    if (useConsole === true) {
        transports.push(new t.Console({
            format: printf(consoleFormat({depth, colors})),
        }));
    }

    const logger = createLogger({
        level, transports, format: commonFormats,
    });

    if (hiddenDebug) {
        const loggerDebug = logger.debug;
        logger.debug = (...args) => {
            if (label && debugLogMatch(label)) {
                loggerDebug(...args);
            }
        };
    }

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
