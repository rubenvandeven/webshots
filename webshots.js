/*
A script using PhantomJS http://phantomjs.org to create Web page screenshot at
the given browser resolution and save it as a PNG file.

Written by Ramiro Gómez http://ramiro.org/
MIT licensed: http://rg.mit-license.org/
*/
var args = require('system').args,
    page = require('webpage').create(),
    re_trim = /^https?:\/\/|\/$/g,
    re_conv = /[^\w\.-]/g

var url2filename = function(url, w, h) {
    return url
        .replace(re_trim, '')
        .replace(re_conv, '-')
        + '.' + w + 'x' + h + '.png'
}

var webshot = function(url, w, h, dir) {
    page.viewportSize = { width: w, height: h }
    page.open(url, function(status) {
        if (status !== 'success') {
            console.log('Unable to load url: ' + url)
            phantom.exit()
        } else {
            window.setTimeout(function() {
                page.clipRect = { top: 0, left: 0, width: w, height: h }
                f = dir + '/' + url2filename(url, w, h)
                page.evaluate(function() {
                    if ('transparent' === document.defaultView.getComputedStyle(document.body).getPropertyValue('background-color')) {
                        document.body.style.backgroundColor = '#fff';
                    }
                });
                console.log('Creating file: ' + f)
                page.render(f)
                phantom.exit()
            }, 200)
        }
    })
}

// phantom now favours system args
if (5 !== args.length) {
    console.log('Usage: phantomjs webshots.js http://example.com 1024 768 target_directory')
    phantom.exit()
} else {
    webshot(args[1], args[2], args[3], args[4])
}
