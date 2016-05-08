/**
 *  Adapted from https://github.com/AceMetrix/jquery-deparam/
 */
function parseParameters(query) {
    var params = {};
    query.replace('+', ' ').replace('?', '').split('&').forEach(function (v) {
        if (!v) return;
        var param = v.split('=');
        params[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
    });
    return params;
}

function readParameter(key, defaultValue) {
    var value = parseParameters(window.location.search || "")[key];
    return typeof value !== "undefined" ? value : defaultValue;
}

function max(array) {
    return Math.max.apply(Math, array);
}

function nodeExtents(series) {
    return [0, max(nodes.map(function (node) {
        return max(node.series[series])
    }))];
}

function linkExtents(series) {
    return [0, max(links.map(function (link) {
        return max(link[series])
    }))];
}

function divide(extents) {
    return [extents[0], (extents[1] - extents[0]) / 2, extents[1], extents[1]];
}

function fix(n) {
    if (scale != "log") return n;
    return n  < 0.0001 ? 1.0 : n;
}

function shifted(x) {
    return x - 1;
}

function shortName(longName) {
    return longName
        .split(/\s|-/)
        .map(function (token) {
            return token.length ? token.substr(0,1).toUpperCase() : '';
        })
        .join("");
}
