const fs = require('fs');
const fsPromises = fs.promises;
// const text = fs.readFileSync('../package.json').toLocaleString();
// const text = fs.readFileSync('../package.json','utf-8');
// console.log(text);
// console.log(__dirname);

// fs.readFile(`${__dirname}/../package.json`,'utf8',(err,res) => {
//     if(err) {
//         throw new Error(err);
//     }
//     console.log(res);
// })

// fsPromises.readFile(`${__dirname}/../package.json`, 'utf8').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

const myfs = require('./myFs');
// myfs.readFile('./package.json').then(res => {
//     console.log(res);
// }).catch( err => {
//     console.log(err);
// })

// fs.writeFileSync('./1.txt', 'wcl', 'utf8');
// fs.writeFileSync('./1.txt', 'wcl', 'utf8');
// fs.writeFile('./1.txt', 'wclwclwcl', 'utf8', (err,res) => {
//     console.log(res);
// })
myfs.writeFile('./1.txt', 'wclwclwcl', 'utf8').then(res => {
    console.log(res);
}).catch(err => console.log(err))