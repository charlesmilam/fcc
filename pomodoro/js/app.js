// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
window.onload = function onLoad() {
  var circle = new ProgressBar.Circle('#pomo-progress', {
   color: '#FCB03C',
   duration: 3000,
   easing: 'easeInOut'
  });

  circle.animate(1);
};
