var $ = require('jquery');

module.exports = function () {
    // Attach search inputs to each other
    $('.posts-search').keyup(function () {
        $('#top-bar-search input').val($(this).val());
    });
    $('#top-bar-search input').keyup(function () {
        $('.posts-search').val($(this).val());
        // TODO - Call search function in dominate
    });

    // Process the query string
    var query = require('./codec').decode();
    if (query) {
        $('.posts-search, #top-bar-search input').val(query);
        // TODO - Call search function in dominate
    }
};