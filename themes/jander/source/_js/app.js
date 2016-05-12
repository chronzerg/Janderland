var $ = require('jquery');
var dominate = require('./dominate/dominate');
var DSearch = require('./dominate/dominate-search');
var DPages = require('./dominate/dominate-pages');

$(function () {
    // Initialize Posts
    $('.posts').each(function () {
        var d = dominate($(this).find('.posts-list'));

        if ($(this).find('.posts-search').length) {
            d.addFilter(DSearch, {
                $input: $(this).find('.posts-search')
            }, false);
        }

        if ($(this).find('.posts-pages').length) {
            d.addFilter(DPages, {
                $prev: $(this).find('.posts-prev'),
                $next: $(this).find('.posts-next'),
                $indexes: $(this).find('.posts-indexes')
            }, false);
        }

        d.update();
    });

    // Load Page Modules
    require('./loader')();
});