// The setup the search box on all pages except the search page.

var $ = require('jquery');

module.exports = function () {
    $('#top-bar-search input').keypress(function (e) {
        // If enter was pressed...
        if (e.which !== 13) return;

        var query = require('./codec').encode($(this).val());
        window.location.href = '/search.html?'+query;
    });
};