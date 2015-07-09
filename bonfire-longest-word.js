function findLongestWord(str) {;
    var ary = str.split(" ");
    var longest = ary.reduce(function(a, b){
      return a.length > b.length ? a  : b;
    });
    
    return longest.length;
}

console.log(findLongestWord('The quick brown fox jumped over the lazy dog'));
