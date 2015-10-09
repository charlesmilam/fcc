// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
// window.onload = function onLoad() {
$("#pomo-progress").on("click", function() {
  console.log("clicked");
  var circle = new ProgressBar.Circle('#pomo-progress', {
   color: '#FCB03C',
   trailColor: "#ddd",
   duration: 1200,
   easing: 'linear'
  });

  var pomodoro = new Date();
  pomodoro.setMinutes(100);
  var count = 1;

  setInterval(function() {
    var minute = new Date().getMinutes();
    console.log('minutes', minute / 60);
    circle.animate(minute / 60, function() {
      console.log("animate fired", count);
      count++;
      // circle.animate(0);
    // textElement.innerHTML = second;
      // pomodoro.setMinutes(pomodoro.getMinutes() - 1);
      // console.log("minutes", pomodoro.getMinutes());
    });

//     circle.animate(pomodoro.getMinutes() / 360, function() {
//       // textElement.innerHTML = minutes;
//       pomodoro.setMinutes(pomodoro.getMinutes() - 1);
//       console.log("minutes", pomodoro.getMinutes());
//   });
  }, 60000);
  // circle.animate(1);
});
