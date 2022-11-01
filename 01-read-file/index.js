const file = __dirname + `\\text.txt`;
const fs = require('fs')

// fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

let readableStream = fs.createReadStream(file,'utf8')
readableStream.on('data', data =>{
    console.log(data)
})