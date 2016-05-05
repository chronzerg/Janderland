// Javascript entry point.

define(['loader', 'jquery', 'underscore', 'foundation', 'datatables'], function (loader, $, _) {

    $(function () {
        // Initialize Foundation
        $(document).foundation();

        // Initialize Posts
        $('table.posts').each(function () {
            // TODO
        });

        // Load Page Modules
        loader();
    });
});