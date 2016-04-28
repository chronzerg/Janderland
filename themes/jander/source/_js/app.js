// Javascript entry point.

define(['loader', 'jquery', 'underscore', 'foundation', 'datatables'], function (loader, $, _) {

    $(function () {
        // Initialize Foundation
        $(document).foundation();

        // Initialize Posts
        $('table.posts').each(function () {
            var tableConfig = $(this).data('tableConfig');

            tableConfig = _({
                // Default datatable config
                info: false,
                ordering: false,
                autoWidth: false,
                lengthChange: false,
                language: {
                    search: '',
                    searchPlaceholder: 'search',
                    info: '_START_ to _END_ of _TOTAL_',
                    paginate: {
                        first: 'first',
                        last: 'last',
                        next: 'next',
                        previous: 'prev'
                    }
                }
            }).extend(tableConfig);

            $(this).DataTable(tableConfig);
        });

        // Load Page Modules
        loader();
    });
});