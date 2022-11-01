const fs = require('fs')
const { stdin, stdout } = process;
let writeableStream = fs.createWriteStream('new.txt')

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

