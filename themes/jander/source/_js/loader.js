// Loads page specific javascript.

define(['jquery'], function ($) {

    // Each page's modules.
    var pageModules = {
        home: ['face']
    };

    return function () {
        var page = $('body').attr('data-page');
        if (page && pageModules[page]) {
            // Load all the page's modules asynchronously.
            require(pageModules[page])
        }
    };
});