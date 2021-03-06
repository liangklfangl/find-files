const fs = require('fs');
const R = require('ramda');
const path = require('path');
const winPath = require('winpath');
let extension = "";
const rxSep = new RegExp(`[${path.sep}.]`);
const Smangle = require("string-mangle");
const util = require("util");
function isDirectory(filename) {
  return fs.statSync(filename).isDirectory();
}
// path.extname('index.coffee.md')
// Returns: '.md'
// path.extname('index.')
// Returns: '.'
// path.extname('index')
// Returns: ''
// path.extname('.index')
// Returns:
function isTargetFile(filename) {
  const extname = filename.indexOf(".")?path.extname(filename).slice(1):filename;
  return !isDirectory(filename) && extname === extension;
}

function ensureToBeArray(maybeArray) {
  return Array.isArray(maybeArray) ?
    maybeArray : [maybeArray];
}

function findFileByExt(source) {
  //In case of recursively setting extension value
  return R.pipe(
    R.filter(R.either(isDirectory, isTargetFile)),
    R.chain((filename) => {
      if (isDirectory(filename)) {
        const subFiles = fs.readdirSync(filename)
                .map((subFile) => {
                  return path.join(filename, subFile)
                });
        return findFileByExt(subFiles);
      }
      return [winPath.winPath(filename)];
    })
  )(source);
}

function filesToTreeStructure(files) {
  return files.reduce((filesTree, filename) => {
   let regex = new RegExp("\." + extension+ "$")
   const propLens = R.lensPath(filename.replace(regex, '').split("/"));
    return R.set(propLens, filename, filesTree);
  }, {});
}

function getFiles(source,ext,isObj) {
   extension = ext;
   //We only care about this kind of file with special suffix
  if (R.is(Object, source) && !Array.isArray(source)) {
    return R.mapObjIndexed((value) => findFileByExt(value), source);
    //We only care about value of object not key 
  } else {
    const mds = findFileByExt(ensureToBeArray(source));
    if(isObj){
      const filesTree = filesToTreeStructure(mds);
      return filesTree;
    }
    return mds
  }
};
/**
 * Make file object obtained to require calls
 * @param  {[type]} source [description]
 * @param  {[type]} ext    [description]
 * @return {[type]}        [description]
 */
function getRequiredFile(source,ext){
  const files = getFiles(source,ext,true);
 // console.log("stringifyTree return--->",Smangle.stringifyTree(files));
  return Smangle.stringifyTree(files);
}
/**
 * Traverse file object to get filename
 * @param  {[type]}   filesTree [description]
 * @param  {Function} fn        [description]
 * @return {[type]}             [description]
 */
function traverse(filesTree, fn) {
  Object.keys(filesTree).forEach((key) => {
    const value = filesTree[key];
    if (typeof value === 'string') {
      fn(value);
      return;
    }
    traverse(value, fn);
  });
};
module.exports = {
  getFiles,
  traverse,
  getRequiredFile
}