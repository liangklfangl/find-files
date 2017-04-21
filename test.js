const findFiles = require('./index.js');
const util = require('util');
const files = findFiles(["./filelists"],'md',false);
console.log(util.inspect(files,{showHidden:true,depth:3}));