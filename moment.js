(function ($) {
  $.moment = function (u) {
    let defaults = {
        total: 15,
        minPixel: 1,
        maxPixel: 3,
        color: "#fff",
        anispeed: 80000,
        on: null,
        motion: true
      },
      settings = $.extend({}, defaults, u),
      $wrapper = $(settings.on).addClass("moment"),
      $rail = $("<ul class='momentRail'></u>"),
      $panel = $("<li class='momentPanel'>"),
      $eleHeight = $wrapper.height(),
      $eleWidth = $wrapper.width(),
      state = {
        panelCount: 2,
        interval: null,
        motion: "forward",
        animated: false,
        nextpanel: 0,
        initialize: true
      };
    $wrapper.css({
      "overflow-x": "hidden"
    });
    $rail.css({
      "box-sizing": "border-box",
      position: "absolute",
      height: "100%",
      margin: "0",
      padding: "0",
      display: "flex",
      width: "100%",
      left: "0",
      top: "0"
    });
    $panel.css({
      position: "relative",
      display: "inline",
      height: "100%",
      width: "100%",
      "z-index": 1,
      display: "block",
      "list-style": "none"
    });

    let fx_randomPixel = function (min, max) {
        return Math.floor(Math.random() * (min - max + min) + max);
      },
      fx_random = function (value) {
        return Math.ceil(Math.random() * value) - 1;
      },
      fx_stars = function (starSize, elem) {
        var $sparkle = $("<span class='sparkle'>");
        elem.append($sparkle);
        return $sparkle.css({
          position: "absolute",
          width: starSize,
          height: starSize,
          top: fx_random($eleHeight),
          left: fx_random($eleWidth),
          "background-color": settings.color,
          "z-index": fx_random(15)
        });
      },
      fx_sky = function (elem) {
        for (let i = 0; i < settings.total; i++) {
          fx_stars(fx_randomPixel(settings.minPixel, settings.maxPixel), elem);
        }
      },
      fx_create = function (panelCount) {
        for (let i = 0; i < panelCount; i++) {
          $panel.clone().appendTo($rail).hide();
        }
        let panel = $rail.children("li");
        for (let i = 0; i < panelCount; i++) {
          fx_sky(panel.eq(i));
        }
        let $first = panel.eq(0).clone(),
          $last = panel.eq(panelCount - 1).clone();
        panel.remove();
        $last
          .attr({
            "data-panel": "last"
          })
          .appendTo($rail)
          .show();
        if (settings.motion === true) {
          $first
            .attr({
              "data-panel": "first"
            })
            .prependTo($rail)
            .show();
        }
      },
      fx_motion = function () {
        if (settings.motion === true) {
          let panels = $rail.children("li");
          if (!state.animated) {
            state.animated = true;
            if (!state.initialize) {
              for (const panel in panels) {
                if (
                  panel.dataset.panel === "first" ||
                  panels.eq(0).dataset.panel === "first"
                ) {
                  panel.animate(
                    { left: -$eleWidth },
                    settings.anispeed * 2,
                    "linear",
                    function () {
                      panel.css({
                        left: $eleWidth
                      });
                      console.log("first panel: " + $eleWidth);
                    }
                  );
                } else if (
                  panel.dataset.panel === "last" ||
                  panels.eq(1).dataset.panel === "last"
                ) {
                  panel.animate(
                    { left: -$eleWidth },
                    settings.anispeed * 2,
                    "linear",
                    function () {
                      panel.css({ left: $eleWidth });
                      console.log("last panel: " + $eleWidth);
                    }
                  );
                }
              }
            } else {
              settings.initialize = true;
              panels.eq(0).animate(
                {
                  left: -$eleWidth
                },
                settings.anispeed,
                "linear",
                () => {
                  panels.eq(0).css({
                    left: $eleWidth
                  });
                }
              );
              panels.eq(1).animate(
                {
                  left: -$eleWidth * 2
                },
                settings.anispeed * 2,
                "linear",
                () => {
                  panels.eq(1).css({
                    left: 0
                  });
                }
              );
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

$.moment({
  on: "body",
  total: 100
});

	
