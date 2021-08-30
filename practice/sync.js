var fs = require('fs');

// read file sync
// console.log('A');
// var result = fs.readFileSync('sample.txt', 'utf-8');
// console.log(result);
// console.log('C');


// read file async
console.log('A');
fs.readFile('sample.txt', 'utf-8', function(err, result) {
    console.log(result);
});
console.log('C');