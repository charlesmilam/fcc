function findLongestWord(str) {;
    var ary = str.split(" ");
    console.log("ary: " + ary);
    var longest = ary.reduce(function(a, b){
      console.log("a: " + a);
      console.log("b: " + b);
      return a.length > b.length ? a  : b;
    });
    return longest.length;
}

console.log(findLongestWord('The quick brown fox jumped over the lazy dog'));
