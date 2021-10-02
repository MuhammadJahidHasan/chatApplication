const escape = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

module.exports = escape;
