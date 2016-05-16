var $ = require('jquery');
var dominate = require('./dominate/dominate');
var sName = require('./dominate/dominate-search').name;

module.exports = function () {
    var d = dominate($('.posts-list'));
    var search = d.filterApis[sName].search;

    // Attach search inputs to each other
    $('.posts-search').keyup(function () {
        $('#top-bar-search input').val($(this).val());
    });
    $('#top-bar-search input').keyup(function () {
        search($(this).val());        
    });

    // Process the query string
    var query = require('./codec').decode();
    if (query) {
        $('.posts-search, #top-bar-search input').val(query);
        search(query);
    }
};