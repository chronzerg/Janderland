var options = {
    perPage: 10,
    indexes: 5
};

function updateUi(index, pages, $ui) {
    var drawIndex = index - Math.floor(options.indexes / 2);
    if ((drawIndex + options.indexes) >= pages) {
        drawIndex = pages - options.indexes - 1;
    }
    if (drawIndex < 1) {
        drawIndex = 1;
    }

    var i = drawIndex;
    var $elements = $();
    while((i < (drawIndex + options.indexes)) && (i < pages)) {
        var $button = $('<a class="button"></a>').html(i);
        if (i !== index) {
            $button.addClass('hollow');
        }
        $elements.add($button);

        i++;
    }

    $ui.emptry();
    $ui.append($elements);
}

module.exports = function filterBuild (context) {
    // TODO - Make these elements configurable.
    var $prev = context.$parent.find('.posts-prev');
    var $next = context.$parent.find('.posts-next');
    var $indexes = context.$parent.find('.posts-indexes');

    var pageIndex = 0;

    function update ($items) {
        // Cap the page index at it's pagesimum value.
        var pages = Math.floor($items.length / options.perPage);
        if (pageIndex > pages) pageIndex = pages;
        
        // Update the UI
        updateUi(pageIndex, pages, $indexes);

        var drawIndex = pageIndex*options.perPage;
        var end = (pageIndex+1)*options.perPage;
        return $items.slice(drawIndex, end);
    }
};