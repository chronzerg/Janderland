// Helpers for encoding and decoding query strings.

exports.encode = function (query) {
    return encodeURIComponent(query);
};

exports.decode = function () {
    var query = location.search;
    if (query) {
        return decodeURIComponent(query.substr(1));
    }
    return false;
};