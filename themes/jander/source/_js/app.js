var $ = require('jquery');

$(function () {
    // Initialize Posts
    $('.posts').each(function () {
        require('./dominate/dominate')($(this));
    });

    // Load Page Modules
    require('./loader')();
});