var loader = require('./loader');
var $ = require('jquery');
var _ = require('lodash');
require('foundation-sites');

$(function () {
    // Initialize Foundation
    $(document).foundation();

    // Initialize Posts
    $('.posts').each(function () {
        // TODO
    });

    // Load Page Modules
    loader();
});