const folder = __dirname + `\\secret-folder`;
const fs = require('fs')
fs.readdir(folder, {withFileTypes: true}, (err, files, )  => {
    files.forEach(file => {
        if(file.isFile()){
            let tmp =file.name.split('.')
            fs.stat(folder+'\\'+file.name,(err, stat, )  => {
                console.log(`${tmp[0]} - ${tmp[tmp.length-1]} - ${stat.size} kb`);
            })
        }
    });
});