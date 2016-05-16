var $ = require('jquery');
var dominate = require('./dominate/dominate');
var DSearch = require('./dominate/dominate-search');
var DPages = require('./dominate/dominate-pages');

$(function () {
    $('.posts').each(function () {
        var hasSearch = Boolean($(this).find('.posts-search').length);
        var hasPages = Boolean($(this).find('.posts-pages').length);

        if (hasSearch || hasPages) {
            var d = dominate($(this).find('.posts-list'));

            if (hasSearch) {
                d.addFilter(DSearch, {
                    $input: $(this).find('.posts-search')
                }, false);
            }

            if (hasPages) {
                d.addFilter(DPages, {
                    $prev: $(this).find('.posts-prev'),
                    $next: $(this).find('.posts-next'),
                    $indexes: $(this).find('.posts-indexes')
                }, false);
            }

            d.update();
        }
    });

    require('./loader')();
});