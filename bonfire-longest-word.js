function findLongestWord(str) {;
    var ary = str.split(" ");
    console.log("ary: " + ary);
    var longest = ary.reduce(function(a, b){
      console.log("a: " + a.length);
      console.log("b: " + b.length);
      return a.length > b.length ? a.length  : b.length;
    });
    return longest;
}

console.log(findLongestWord('The quick brown fox jumped over the lazy dog'));
