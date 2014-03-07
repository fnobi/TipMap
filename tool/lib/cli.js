(function () {
    var optimist = require('optimist');

    var TipMapSprite = require(__dirname + '/TipMapSprite');

    var argv = optimist
            .boolean('h')
            .alias('h', 'help')
            .default('h', false)
            .describe('h', 'show this help.')

            .string('f')
            .alias('f', 'file')
            .describe('f', 'image file path.')

            .argv;

    if (argv.h) {
        optimist.showHelp();
        return;
    }

    var filePath = argv.file || argv._[0];

    if (!filePath) {
        optimist.showHelp();
        return;
    }

    new TipMapSprite({
        filePath: filePath
    }, function (err) {
        if (err) {
            console.error(err);
        }
    });

})();
