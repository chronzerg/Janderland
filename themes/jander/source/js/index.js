// Menu
(function ($) {
	// Returns a random value between min and max
	function getValue (min, max) {
		return min + ((max - min) * Math.random());
	}

	// Swaps the picture
	function swap (new_pic_path) {
		$("#menu_face").attr("src", new_pic_path);
	}

	// Called after every cooldown to display an alternative pic
	function running () {
		var cool_time = cooldown.get();
		var disp_time = display.get();
		var alt = map.get();

		// Swap out with alt pic
		swap(alt.path);

		// Schedule picture to revert back
		disp_timer_id = setTimeout(function () {
			swap(pics.main);

			// After picture has reverted, schedule the next time for it to run
			cool_timer_id = setTimeout(running, cool_time);
		}, disp_time);
	}

	var disp_timer_id = -1;
	var cool_timer_id = -1;

	var pics = {
		// The default idling picture
		main: "img/face/idle1.jpg",

		// Alternative pics that are randomly chosen (with weights) and displayed for a couple seconds
		alts: [
			{
				path: "img/face/idle2.jpg",
				weight: 2
			},
			{
				path: "img/face/idle3.jpg",
				weight: 1
			}
		],

		buttons: {
			button1: "img/face/button1.jpg",
			button2: "img/face/button2.jpg",
			button3: "img/face/button3.jpg",
			button4: "img/face/button4.jpg",
			button5: "img/face/button5.jpg"
		}
	};

	// The range of elapse time between displaying the alternative pics
	var cooldown = {
		min: 2,
		max: 5,
		get: function () {
			return getValue(cooldown.min, cooldown.max) * 1000;
		}
	};

	// The range of time an alternative pic is displayed for
	var display = {
		min: 0.5,
		max: 2,
		get: function () {
			return getValue(display.min, display.max) * 1000;
		}
	};

	// The weighted mapping table
	var map = {
		table: [],
		get: function () {
			var ticks = 1 / map.table.length;
			var i = Math.floor(Math.random() / ticks);
			return map.table[i];
		}
	};

	// Build the mapping table
	$.each(pics.alts, function () {
		for (var i=0; i<this.weight; i++) {
			map.table.push(this);
		}
	});

	// Schedule running to be called at a random cooldown time
	cool_timer_id = setTimeout(running, cooldown.get());

	// Register callbacks for mouseover mouseoff events
	$(document).ready(function () {
		$("#button1, #button2, #button3, #button4, #button5").hover(function () { // mouseover callback
			// Stop any other timers
			clearTimeout(disp_timer_id);
			clearTimeout(cool_timer_id);

			var id = $(this).attr("id");
			swap(pics.buttons[id]);
		}, function () { // mouseoff callback
			swap(pics.main);
			cool_timer_id = setTimeout(running, cooldown.get());
		}).click(function () { // mouse click handler
			$("#button1, #button2, #button3, #button4, #button5").unbind('mouseenter mouseleave click');
		});
	});
})(jQuery);