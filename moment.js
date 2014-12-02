(function ($) {
	"use strict";

	$.moment = function (u) {

		var defaults = {
				total: 15,
				minPixel: 1,
				maxPixel: 3,
				color: "#fff",
				anispeed: 80000,
				on: null,
				motion: true
			},
			o = 0,
			i = 0,
			e = 0,
			settings = $.extend({}, defaults, u),
			$wrapper = $(settings.on).addClass('moment'),
			$rail = $("<ul class='momentRail'></u>"),
			$panel = $("<li class='momentPanel'>"),

			$o = $rail.offset(),
			$offsetTop = $o.top,
			$offsetLeft = $o.left,
			$eleHeight = $wrapper.height(),
			$eleWidth = $wrapper.outerWidth(),

			state = {
				panelCount: 2,
				interval: null,
				motion: 'forward',
				animated: false,
				nextpanel: 0,
				initialize: true
			};
		$wrapper.css({
			'overflow': 'hidden'
		});
		$rail.css({
			'position': 'absolute',
			'height': '100%',
			'width': $eleWidth * state.panelCount + 'px',
			'left': '0',
			'top': '0'
		});
		$panel.css({
			'position': 'relative',
			height: '100%',
			width: $eleWidth + 'px',
			"z-index": 1,
			'float': 'left',
			display: 'block-inline',
			'list-style': 'none'
		});

		var fx_randomPixel = function (n, x) {
				return Math.floor(Math.random() * (n - x + n) + x);
			},
			fx_random = function (u) {
				return Math.ceil(Math.random() * u) - 1;
			},
			fx_stars = function (d, elem) {
				var $sparkle = $("<span class='sparkle'>");
				elem.append($sparkle);
				return $sparkle.css({
					position: "absolute",
					width: d,
					height: d,
					top: $offsetTop + fx_random($eleHeight),
					left: $offsetLeft + fx_random($eleWidth),
					"background-color": settings.color,
					"z-index": fx_random(15)

				});
			},
			fx_sky = function (elem) {
				for (i = 0; i < settings.total; i++) {
					fx_stars(fx_randomPixel(settings.minPixel, settings.maxPixel), elem);
				}
			},
			fx_create = function (n) {
				for (o = 0; o < n; o++) {
					$panel.clone().appendTo($rail).hide();
				}
				var panel = $rail.children('li');
				for (e = 0; e < n; e++) {
					fx_sky(panel.eq(e));
				}
				var $first = panel.eq(0).clone(),
					$last = panel.eq(n - 1).clone();
				panel.remove();
				$last.attr({
					'panel': 'last'
				}).appendTo($rail).show();
				if (settings.motion === true) {
					$first.attr({
						'panel': 'first'
					}).prependTo($rail).show();
				}
			},
			fx_motion = function () {
				if (settings.motion === true) {
					var panel = $rail.children('li');
					if (!state.animated) {
						state.animated = true;
						if (!state.initialize) {
							panel.eq(0).animate({
								'left': -$eleWidth
							}, settings.anispeed * 2, 'linear', function () {
								panel.eq(0).css({
									'left': $eleWidth
								});
							});
							panel.eq(1).animate({
								'left': -$eleWidth * 2
							}, settings.anispeed * 2, 'linear', function () {
								panel.eq(1).css({
									'left': 0
								});
							});
						} else {
							settings.initialize = true;
							panel.eq(0).animate({
								'left': -$eleWidth
							}, settings.anispeed, 'linear', function () {
								panel.eq(0).css({
									'left': $eleWidth
								});
							});
							panel.eq(1).animate({
								'left': -$eleWidth * 2
							}, settings.anispeed * 2, 'linear', function () {
								panel.eq(1).css({
									'left': 0
								});
							});
							state.initialize = null;
						}

					}
					state.animated = false;
				}
			},
			init = function () {
				fx_create(state.panelCount);
				$wrapper.append($rail);
				fx_motion();
				state.interval = setInterval(function () {
					fx_motion();
				}, settings.anispeed);
			};
		init();
	};
})(jQuery);