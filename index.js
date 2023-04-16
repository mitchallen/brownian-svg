/**
 * Author: Mitch Allen
 * Repo: brownian-svg
 * File: index.js
 */

var fs = require('fs'),
    util = require('util');

function generate(limit, color) {

    let width = height = 1000
    let margin = 10
    let maxMove = width * 0.10
    let x = width / 2
    let y = height / 2
    let precision = 0
    let path = "M"

    // generate the path

    for (let i = 0; i < limit; i++) {
        let distance = Math.random() * maxMove
        let angle = Math.random() * 360
        let tx = x + distance * Math.sin(Math.PI / 180 * angle);
        let ty = y + distance * Math.cos(Math.PI / 180 * angle);
        if (
            tx > margin && tx < (width - margin) &&
            ty > margin && ty < (height - margin)
        ) {
            x = +tx.toFixed(precision)
            y = +ty.toFixed(precision)
             path += `${x} ${y} `
        }    
    }

    // genate the svg markup

    let fd = util.format(
        '<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" width="%d" height="%d">\n', 
        width,
        height,
        width, 
        height
    );

    fd += util.format(`<rect fill="gray" width="%d" height="%d" />\n`, width, height )

    fd += util.format(
        '<path fill="none" stroke="#000000" stroke-width="2" d="%s" />\n',
        path
    );

    fd += '</svg>';

    // write the file

    var filename = 'brownian.svg';
    var stream = fs.createWriteStream(filename);
    stream.write(fd);
    // stream.close();  // would randomly gen bad descriptor message
    stream.end();

    console.log(`Generated file: ${filename}` )

}

generate(2000)