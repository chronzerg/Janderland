// Common utilities

define(function () {

    function remToPx (length) {
        var html = document.getElementsByTagName('html')[0],
            oneRemInPx = parseInt(window.getComputedStyle(html).fontSize);

        return (parseInt(length) * oneRemInPx);
    }

    return {
        remToPx: remToPx
    };
});