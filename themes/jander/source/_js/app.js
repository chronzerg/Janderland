// Javascript entry point.

define(['loader', 'jquery', 'underscore', 'foundation', 'datatables'], function (loader, $, _) {

    $(function () {
        // Initialize Foundation
        $(document).foundation();

        // Initialize Posts
        $('table.posts').each(function () {
            var tableConfig = $(this).data('tableConfig');

            tableConfig = _({
                // Default post datatable config.
                autoWidth: false
            }).extend(tableConfig);

            $(this).DataTable(tableConfig);
        });

        // Load Page Modules
        loader();
    });
});