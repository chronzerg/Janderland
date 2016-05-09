// Loads page specific javascript.

var $ = require('jquery');
var searchQuery = require('./searchQuery');

// Each page's modules.
var pageModules = {
    home: [require('./face')],
    search: [require('./search')]
};

module.exports = function () {
    var page = $('body').attr('data-page');
    if (page && pageModules[page]) {
        // Load all the page's modules.
        pageModules[page].forEach(function (module) {
            module();
        });
    }

    if (page !== 'search') {
        searchQuery();
    }
};