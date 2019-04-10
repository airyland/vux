module.exports = function (source, list) {

}

var a = `<a @mousedown="hello"
@mouseup="hello">sdfdsf</a>`

a = a.replace(/\s+@mousedown="(.*?)"/g, ' ')
a = a.replace(/\s+@mouseover="(.*?)"/g, ' ')
a = a.replace(/\s+@mouseup="(.*?)"/g, ' ')

console.log(a)