// Loads page specific javascript.

var $ = require('jquery');

// Each page's modules.
var pageModules = {
    home: ['./face'],
    search: ['./search']
};

module.exports = function () {
    var page = $('body').attr('data-page');
    if (page && pageModules[page]) {
        // Load all the page's modules.
        pageModules[page].forEach(function (module) {
            require(module);
        });
    }

    if (page !== 'search') {
        require(['searchQuery']);
    }
};