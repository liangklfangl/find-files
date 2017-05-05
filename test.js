// const Grob = require('./index.js');
// const util = require('util');
// const files = Grob.getFiles(["./filelists"],'md',true);
// console.log(util.inspect(files,{showHidden:true,depth:3}));

// console.log(Grob.traverse(files,function(filename){
// 	if(!filename)
// 	console.log(filename);
 //    filelists/hello.md
	// filelists/index.md
	// filelists/md/fol/index.md
	// filelists/md/index.md
//}));
const Grob = require("./index.js");
const Smangle = require('string-mangle');
const files = Grob.getFiles(["./filelists"],'md',true);
console.log("stringifyTree return:",Smangle.stringifyTree(files));

// console.log("stringifyTree return:",Smangle.stringifyTree(files));

// const Smangle = require('string-mangle');
// const filetree =  { filelists:
//    { hello: 'filelists/hello.md',
//      index: 'filelists/index.md',
//      md:
//       { fol: { index: 'filelists/md/fol/index.md' },
//         index: 'filelists/md/index.md' } } }
// console.log("stringifyTree return:",Smangle.stringifyTree(filetree));