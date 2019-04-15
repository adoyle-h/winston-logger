'use strict';

const util = require('util');
const chalk = require('chalk');

const LEVEL_COLORS = {
    SILLY: 'green',
    DEBUG: 'cyan',
    VERBOSE: 'magenta',
    INFO: 'whiteBright',
    WARNING: 'yellow',
    ERROR: 'red',
};

const common = (info, depth) => {
    const {level, message, label} = info;
    const timestamp = (new Date()).toISOString();
    const splat = info[Symbol.for('splat')] || [];
    const msg = util.formatWithOptions({
        depth,
    }, message, ...splat);
    return {...info, timestamp, msg, level, label};
};

const fileFormat = (info) => {
    const {label, level, timestamp, msg} = info;
    const labelStr = label ? ` [${label}]` : '';
    return `${timestamp} ${level.toUpperCase()}${labelStr} ${msg}`;
};

exports.consoleFormat = ({
    colors,
    depth,
} = {}) => (info) => {
    const newInfo = common(info, depth);
    const {timestamp, msg, level, label} = newInfo;

    if (colors === true) {
        const LEVEL = level.toUpperCase();
        const mainColor = chalk[LEVEL_COLORS[LEVEL] || 'white'];
        const labelStr = label ? chalk.ansi256(117)(` [${label}]`) : '';
        return `${chalk.blue(timestamp)} ${mainColor(LEVEL)}${labelStr} ${mainColor(msg)}`;
    } else {
        return fileFormat(newInfo);
    }
};

exports.fileFormat = ({
    depth,
} = {}) => (info) => {
    const newInfo = common(info, depth);
    return fileFormat(newInfo);
};
