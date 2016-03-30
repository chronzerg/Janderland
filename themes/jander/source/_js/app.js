// Javascript entry point.

define(['loader', 'jquery', 'underscore', 'foundation', 'datatables'], function (loader, $, _) {

    $(function () {
        // Initialize Foundation
        $(document).foundation();

        // Initialize Post Datatables
        $('.posts').each(function () {
            var config = $(this).data('dt_config');

            config = _({
                // Default post datatable config.
                autoWidth: false
            }).extend(config);

            $(this).DataTable(config);
        });

        // Load Page Modules
        loader();
    });
});