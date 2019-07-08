'use strict';

const path = require('path');
const glob = require('glob');
const join = path.join;

module.exports = function MPARazzlePlugin(config, env, webpack, options) {
  const { target, dev } = env;
  console.log('config.entry',config.entry)
  console.log('config.output',config.output)
  if (target === 'web') {
    // client only
  }

  if (target === 'server') {
    // server only
  }

  if (dev) {
    // dev only
  } else {
    // prod only
  }

  // Do some stuff...
  return config;
};


/**
 * 获取文件名
 * @param globPath
 * @param pathDir
 * @returns {{}}
 */
function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {}, entry, dirname, basename, pathname, extname;
  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    process.platform == 'win32' && (pathname =  pathname.replace(/\\/g,'/'))
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    entries[pathname] = path.resolve(__dirname, './' + entry);
    // entries[pathname] =  './' + entry;
  }
  return entries;
}
