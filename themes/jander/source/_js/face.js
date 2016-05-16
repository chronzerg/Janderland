// Returns a random number generator.
function createNumGen (min, max) {
    return function () {
        return min + ((max - min) * Math.random());
    };
}

module.exports = function () {
    var $ = require('jquery');

    var imagePaths = {
        // The default idling image
        main: 'assets/face/idle1.jpg',

        // Alternative images that are randomly chosen (with weights) and
        // displayed for a couple seconds
        alts: [
            {
                path: 'assets/face/idle2.jpg',
                weight: 2
            },
            {
                path: 'assets/face/idle3.jpg',
                weight: 1
            },
            {
                path: 'assets/face/button5.jpg',
                weight: 1
            }
        ],

        // Button images are displayed when the mouse hovers over a
        // button.
        buttons: {
            button1: 'assets/face/button2.jpg',
            button2: 'assets/face/button3.jpg',
            button3: 'assets/face/button4.jpg',
        }
    };

    // The range of time between displaying
    // alt images.
    var cooldownMin = 2000;
    var cooldownMax = 5000;

    // The range of time an alt image is displayed.
    var displayMin = 500;
    var displayMax = 2000;

    var displayTimerId = -1;
    var cooldownTimerId = -1;
    var getCooldown = createNumGen(cooldownMin, cooldownMax);
    var getDisplay = createNumGen(displayMin, displayMax);

    // The weighted table used to choose an
    // alt image.
    var altImages = {
        table: [],
        get: function () {
            var ticks = 1 / this.table.length;
            var i = Math.floor(Math.random() / ticks);
            return this.table[i];
        }
    };

    // Build the alt images table
    imagePaths.alts.forEach(function (alt) {
        for (var i=0; i<alt.weight; i++) {
            altImages.table.push(alt.path);
        }
    });

    function swapImage (new_pic_path) {
        $('#face').attr('src', new_pic_path);
    }

    // Starts the loop that displays the alternative images.
    function startLoop () {
        cooldownTimerId = setTimeout(function loop () {
            var cool_time = getCooldown(),
                disp_time = getDisplay(),
                alt = altImages.get();

            // swapImage out with alt pic
            swapImage(alt);

            // Schedule picture to revert back
            displayTimerId = setTimeout(function ()  {
                swapImage(imagePaths.main);

                // After picture has reverted, schedule the next time for it to run
                cooldownTimerId = setTimeout(loop, cool_time);
            }, disp_time);
        }, getCooldown());
    }

    // Stop the loop that displays the alternative images.
    function stopLoop () {
        clearTimeout(displayTimerId);
        clearTimeout(cooldownTimerId);
    }

    startLoop();

    // Register mouse callbacks
    $('#button1, #button2, #button3')
    .hover(function () { // mouseover
        stopLoop();
        var id = $(this).attr('id');
        swapImage(imagePaths.buttons[id]);
    },
    function () { // mouseoff
        swapImage(imagePaths.main);
        startLoop();
    })
    .click(function () {
        $('#button1, #button2, #button3')
        .unbind('mouseenter mouseleave click');
    });
};