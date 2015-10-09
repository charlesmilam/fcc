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
  bg_width: 1,
  total_duration: 1500,
  direction: "Counter-clockwise",
  time: {
    Days: {show: false},
    Hours: {show: false},
    Minutes: {color: "#4CAF50"},
    Seconds: {show: false}
  }
});

// TimeCircles controls
$(".start").click(function(){
  $("#pomo-progress").TimeCircles().start();
});

$(".stop").click(function(){
  $("#pomo-progress").TimeCircles().stop();
});

$(".restart").click(function(){
  $("#pomo-progress").TimeCircles().restart();
});
