// Создаёт папку project-dist.
// Заменяет шаблонные теги в файле template.html с названиями файлов из папки components (пример:{{section}}) на содержимое одноимённых компонентов и сохраняет результат в project-dist/index.html.

const path = require('path');
const fs = require('fs');
const {mkdir} = require('fs/promises');
const dirProject = path.join(__dirname, 'project-dist');
const dirOldAssets = path.join(__dirname, 'assets');
const dirNewAssets = path.join(dirProject, 'assets');
const dirOldStyle = path.join(__dirname, 'styles');
const newStyle = path.join(dirProject, 'style.css');

const copyFileFromFolder = (oldDir, newDir) => {
    mkdir(newDir, {recursive: true}).then(() => {
        fs.readdir(oldDir, {withFileTypes: true}, (err, files,) => {
            for (let file of files) {
                let name = path.join(oldDir, file.name);
                let nameCopy = path.join(newDir, file.name);
                if (file.isDirectory()) {
                    copyFileFromFolder(name, nameCopy)
                    console.log('create folder ' + file.name)
                } else {
                    fs.createReadStream(name).pipe(fs.createWriteStream(nameCopy));
                }
            }
        });
    });
}

const enjoyStyle = () => {
    const writeStream = fs.createWriteStream(newStyle);
    fs.readdir(dirOldStyle, {withFileTypes: true}, (err, files,) => {
        for (let file of files) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                fs.createReadStream(path.join(dirOldStyle, file.name), 'utf8').on('data', data => {
                    writeStream.write(data);
                })
            }
        }
    });
}

fs.rm(dirProject, {recursive: true, force: true}, () => {
    console.log('rebuild project')
    mkdir(dirProject, {recursive: true}).then(() => {
        console.log('create folder project-dist')
        mkdir(dirNewAssets, {recursive: true}).then(() => {
            console.log('create folder asset')
            copyFileFromFolder(dirOldAssets,dirNewAssets)
            enjoyStyle();
        });
    });
});

