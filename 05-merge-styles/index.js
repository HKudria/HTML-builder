const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, 'styles');
const newStyle = path.join(__dirname, 'project-dist' , 'bundle.css');
const writeStream = fs.createWriteStream(newStyle);

const enjoyStyle = () => {
    fs.readdir(dir, {withFileTypes: true}, (err, files,) => {
        for (let file of files) {
            if(file.isFile() && path.extname(file.name) === '.css'){
                fs.createReadStream(path.join(dir, file.name),'utf8').on('data', data =>{
                    writeStream.write(data);
                })
            }
        }
    });
}

enjoyStyle();