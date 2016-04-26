define(['jquery', 'queryString'], function ($, q) {
    $(function () {
        // Attach search inputs to each other
        $('.dataTables_filter input').keyup(function () {
            $('#top-bar-search input').val($(this).val());
        });
        $('#top-bar-search input').keyup(function () {
            $('table').DataTable().search($(this).val()).draw();
        });

        // Process the query string
        var query = q.decode();
        if (query) {
            $('table').DataTable().search(query).draw();
            $('#top-bar-search input').val(query);
        }
    });
});