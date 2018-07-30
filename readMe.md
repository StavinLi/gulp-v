

##更改node_modules配置文件

### gulp-rev\index.js

* `第135行 manifest[originalFile] = revisionedFile;
更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash;`

### rev-path\index.js
* `9行 return filename + '-' + hash + ext;
更新为: return filename + ext;`

### gulp-rev-collector\index.js

* `40行 path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' )
更新为:  path.basename(json[key]).split('?')[0] 
`
* `
第146\170行 regexp: new RegExp( '([\/\\\\\'"])' + pattern, 'g' ),
更新为: regexp: new RegExp( '([\/\\\\\'"])' + pattern+'(\\?v=\\w{10})?', 'g' ),
`
