var $ = require('jquery');
var q = require('./queryString');

module.exports = function () {
    $(function () {
        // Attach search inputs to each other
        $('#top-bar-search input').keyup(function () {
            // TODO - Attach to another search box.
        });

        // Process the query string
        var query = q.decode();
        if (query) {
            // TODO - Search the table
        }
    });
};