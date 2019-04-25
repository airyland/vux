'use strict'

const stripComments = require('strip-comments')

function parse(source, fn, moduleName) {
  // fix no space between import and { 
  // ref https://github.com/airyland/vux/issues/1365
  source = source.replace(/import{/g, 'import {')
  source = source.replace(/\/\/\n/g, '')
  source = trimLine(source)
  
  moduleName = moduleName || 'vux'
  if ((moduleName && source.indexOf(moduleName) === -1) || source.indexOf('import') === -1) {
    return source
  }
  const reg = getReg(moduleName)

  let replaceList = []
  removeComments(removeCommentLine(source)).replace(reg, function (match1, match2, match3) {
    // dirty way for the moment
    if(match1.indexOf('import') !== match1.lastIndexOf('import')) {
      match1 = match1.slice(match1.lastIndexOf('import'), match1.length)
    }

    const components = getNames(match1)

    if (fn) {
      const replaceString = fn({
        components: components,
        match1: match1,
        match2: match2,
        match3: match3,
        source: source
      })
      replaceList.push([match1, replaceString])
    }
  })
  source = removeCommentLine(source)
  replaceList.forEach(function (one) {
    source = source.replace(one[0], one[1])
  })
  return source
}

module.exports = parse

function getReg(moduleName) {
  return new RegExp(`import\\s.*(\\n(?!import).*)*from(\\s)+('|")${moduleName}('|");*`, 'g')
}

function removeCommentLine (source) {
  const rs = source.split('\n').map(function (line) {
    line = line.replace(/^\s+|\s+$/g, '')
    try {
      line = stripComments.line(line)
    } catch (e) {
    }
    return line
  }).join('\n')
  return rs
}

function getNames(one) {
  const startIndex = one.indexOf('{')
  const endIndex = one.indexOf('}')
  const content = one.slice(startIndex + 1, endIndex)
  const list = content.split(',').map(one => {
    return one.replace(/^\s+|\s+$/g, '')
      .replace(/\n/g, '')
  }).filter(one => {
    return !!one
  }).map(one => {

    if (!/\s+/.test(one)) {
      return {
        originalName: one,
        newName: one
      }
    } else if (/\s+as/.test(one)) {
      let _list = one.split('as').map(function (one) {
        return one.replace(/^\s+|\s+$/g, '')
      })
      return {
        originalName: _list[0],
        newName: _list[1]
      }
    }

    return one
  })
  return list
}

function trimLine (str) {
  let isImport = false
  let list = str.split('\n')
  for (let i = 0; i < list.length; i++) {
    let currentLine = trim(list[i])
    if (/import/.test(currentLine) && !/from\s+('|")vux('|")/.test(currentLine)) {
      isImport = true
    } else if (/from\s+('|")(.+)('|")/.test(currentLine)) {
      if (isImport) {
        isImport = false
      }
    }  else {
      if (isImport) {
        list[i] = trim(list[i])
      }
    }  
  }
  return list.join('\n')
}

function trim (str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '')
}

// http://james.padolsey.com/javascript/removing-comments-in-javascript/
function removeComments(str) {
  str = ('__' + str + '__').split('');
  var mode = {
    singleQuote: false,
    doubleQuote: false,
    regex: false,
    blockComment: false,
    lineComment: false,
    condComp: false
  };
  for (var i = 0, l = str.length; i < l; i++) {

    if (mode.regex) {
      if (str[i] === '/' && str[i - 1] !== '\'') {
        mode.regex = false;
      }
      continue;
    }

    if (mode.singleQuote) {
      if (str[i] === "'" && str[i - 1] !== '\'') {
        mode.singleQuote = false;
      }
      continue;
    }

    if (mode.doubleQuote) {
      if (str[i] === '"' && str[i - 1] !== '\'') {
        mode.doubleQuote = false;
      }
      continue;
    }

    if (mode.blockComment) {
      if (str[i] === '*' && str[i + 1] === '/') {
        str[i + 1] = '';
        mode.blockComment = false;
      }
      str[i] = '';
      continue;
    }

    if (mode.lineComment) {
      if (str[i + 1] === 'n' || str[i + 1] === 'r') {
        mode.lineComment = false;
      }
      str[i] = '';
      continue;
    }

    if (mode.condComp) {
      if (str[i - 2] === '@' && str[i - 1] === '*' && str[i] === '/') {
        mode.condComp = false;
      }
      continue;
    }

    mode.doubleQuote = str[i] === '"';
    mode.singleQuote = str[i] === "'";

    if (str[i] === '/') {

      if (str[i + 1] === '*' && str[i + 2] === '@') {
        mode.condComp = true;
        continue;
      }
      if (str[i + 1] === '*') {
        str[i] = '';
        mode.blockComment = true;
        continue;
      }
      if (str[i + 1] === '/') {
        str[i] = '';
        mode.lineComment = true;
        continue;
      }
      mode.regex = true;

    }

  }
  const rs = str.join('').slice(2, -2);
  return rs
}
