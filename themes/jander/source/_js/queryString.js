// Helpers for encoding and decoding query strings.

define({
    encode: function (query) {
        return encodeURIComponent(query);
    },
    decode: function () {
        var query = location.search;
        if (query) {
            return decodeURIComponent(query.substr(1));
        }
        return false;
    }
});