var fs = require('fs');
var path = require('path');

var async = require('async');
var im = require('imagemagick');
var ejs = require('ejs');

var INDEX_EJS_PATH = __dirname + '/../view/index.html.ejs';
var IMG_DIR = 'img';

var TipmapSprite = function (opts, callback) {
    callback = callback || function () {};

    var filePath = opts.filePath || '';
    var size = opts.size;
    var cropWidth = opts.width || size || 500;
    var cropHeight = opts.height || size || 500;
    var dest = opts.dest || 'demo';

    var imgRootPath = path.join(dest, IMG_DIR);
    var basename = path.basename(filePath);

    var fullWidth, fullHeight, images, template;

    async.series([function (next) {
        fs.exists(filePath, function (exists) {
            if (!exists) {
                return next(new Error('"' + filePath + '" is not found.'));
            }
            next();
        });
    }, function (next) {
        // TODO: directory validation
        next();
    }, function (next) {
        console.log(filePath);
        next();
    }, function (next) {
        im.identify([
            '-format',
            '%wx%h',
            filePath
        ], function (err, output) {
            if (err) {
                return next(err);
            }

            var array = output.split(/x/);
            fullWidth = Number(array[0]);
            fullHeight = Number(array[1]);

            next();
        });
    }, function (next) {
        im.convert([
            '-crop',
            [cropWidth, cropHeight].join('x'),
            filePath, 
            path.join(imgRootPath, basename)
        ], next);
    }, function (next) {
        var imageCount = Math.ceil(
            fullWidth / cropWidth
        ) * Math.ceil(
            fullHeight / cropHeight
        );

        var ext = path.extname(filePath);
        var base = path.basename(filePath, ext);

        images = [];
        for (var i = 0; i < imageCount; i++) {
            images.push(path.join(IMG_DIR, base + '-' + i + ext));
        }

        next();
    }, function (next) {
        fs.readFile(INDEX_EJS_PATH, 'utf8', function (err, body) {
            if (err) {
                return next(err);
            }
            template = body;
            next();
        });
    }, function (next) {
        var str = ejs.render(template, {
            images: images,
            fullWidth: fullWidth,
            fullHeight: fullHeight
        });
        var destPath = path.join(dest, 'index.html');
        fs.writeFile(destPath, str, { encoding: 'utf8'}, next);
    }], callback);
};

module.exports = TipmapSprite;
