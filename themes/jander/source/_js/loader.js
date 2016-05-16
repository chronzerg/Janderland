// Loads page specific javascript.

var $ = require('jquery');

var pageModules = {
    home: [require('./face')],
    search: [require('./search')]
};

module.exports = function () {
    var page = $('body').attr('data-page');
    if (page && pageModules[page]) {
        pageModules[page].forEach(function (initModule) {
            initModule();
        });
    }

    if (page !== 'search') {
        require('./searchAll')();
    }
};