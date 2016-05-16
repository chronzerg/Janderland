// The setup the search box. This script should be run on all
// pages save the search page.

var $ = require('jquery');

var enterKeyCode = 13;

module.exports = function () {
    $('#top-bar-search input').keypress(function (e) {
        if (e.which !== enterKeyCode) return;

        var query = require('./codec').encode($(this).val());
        window.location.href = '/search.html?'+query;
    });
};