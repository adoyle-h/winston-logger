'use strict';

const util = require('util');

module.exports = ({
    colors, depth,
} = {}) => (info) => {
    const {level, message, label} = info;
    const timestamp = (new Date()).toISOString();
    const splat = info[Symbol.for('splat')] || [];
    const msg = util.formatWithOptions({
        colors,
        depth,
    }, message, ...splat);
    return `${timestamp} ${level.toUpperCase()} [${label}] ${msg}`;
};
