function titleCase(str) {
  var ary = str.split(" ");
  var newAry = ary.map(function(word){
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
  return newAry.join(" ");
}

console.log(titleCase("I'm a little tea pot"));
console.log(titleCase("SHoRt AnD SToUt"));
console.log(titleCase("HERE IS MY HANDLE HERE IS MY SPOUT"));
