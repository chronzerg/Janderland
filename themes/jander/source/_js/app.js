// Javascript entry point.

define(['loader', 'jquery', 'foundation'], function (loader, $) {

    // Initialize Foundation
    $(function () {
        $(document).foundation();
    });


    // Load Page Modules
    loader();
});