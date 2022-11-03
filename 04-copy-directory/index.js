const path = require('path');
const fs = require('fs');
const { mkdir } = require('fs/promises');
const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

const copyFileFromFolder = () => {
    fs.rm(dirCopy, {recursive: true, force: true}, () => {
        mkdir(dirCopy, {recursive: true}).then(() => {
            fs.readdir(dir, {withFileTypes: true}, (err, files,) => {
                for (let file of files) {
                    let fullName = path.join(dir, file.name);
                    let fullNameCopy = path.join(dirCopy, file.name);
                    fs.createReadStream(fullName).pipe(fs.createWriteStream(fullNameCopy));
                }
            });
        });
    });
}

copyFileFromFolder()
