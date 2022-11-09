const fs = require('fs')
const path = require("path");
const { stdin, stdout } = process;

let writeableStream = fs.createWriteStream(path.join(__dirname, 'new.txt'))

stdout.write('Write some text\n');
stdin.on('data', data => {
    let text = data.toString().trim()
    if(text === 'exit'){
        writeableStream.end();
        process.exit(0);
    }
    console.log(text)
    writeableStream.write(text)
});

process.on('exit', () => stdout.write('Program close'));
process.on('SIGINT', () => process.exit(0));
