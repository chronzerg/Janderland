define([
    'jquery',
    'underscore',
    'foundation'
],
function ($, _) {

    // Global Initialize
    // =================

    $(function () {
        $(document).foundation();
    });


    // Load Page Modules
    // =================

    var pageModules = {
        home: ['face']
    };

    $(function () {
        var page = $('body').attr('data-page');
        if (page && pageModules[page]) {
            pageModules[page].forEach(function (module) {
                require(module);
            });
        }
    });
});