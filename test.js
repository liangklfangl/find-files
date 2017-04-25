const Grob = require('./index.js');
const util = require('util');
const files = Grob.getFiles(["./filelists"],'md',true);
console.log(util.inspect(files,{showHidden:true,depth:3}));

console.log(Grob.traverse(files,function(filename){
	if(!filename)
	console.log(filename);
 //    filelists/hello.md
	// filelists/index.md
	// filelists/md/fol/index.md
	// filelists/md/index.md
}));