// The setup the search box on all pages except the search page.

var $ = require('jquery');
var q = require('./queryString');

module.exports = function () {
    $(function () {
        $('#top-bar-search input').keypress(function (e) {
            // If enter was pressed...
            if (e.which !== 13) return;

            var query = q.encode($(this).val());
            window.location.href = '/search.html?'+query;
        });
    });
};