// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// set TimeCircles options
$("#pomo-progress").TimeCircles({
  start: false,
  animation: "smooth",
  count_past_zero: false,
  circle_bg_color: "#555555",
  use_background: true,
  fg_width: 0.05,
  bg_width: 0.025,
  total_duration: "Minutes",
  direction: "Counter-clockwise"
});
