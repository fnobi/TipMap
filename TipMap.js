(function (exports, $) {
    var TipMap = function (opts) {
        var $el = opts.$el;
        var imagePath = opts.imagePath;

        var fullWidth = opts.fullWidth;
        var fullHeight = opts.fullHeight;
        var cropWidth = opts.cropWidth;
        var cropHeight = opts.cropHeight;


        var cols = Math.ceil(fullWidth / cropWidth);
        var rows = Math.ceil(fullHeight / cropHeight);

        var split = imagePath.split(/\./g);
        var ext = split.pop();
        var base = split.join('.');

        $el.css({
            position: 'relative',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden'
        });

        var $inner = $('<div />');
        $inner.css({
            position: 'relative',
            width: fullWidth + 'px',
            height: fullHeight + 'px'
        });

        $el.append($inner);
        
        var img;
        for (var i = 0; i < cols * rows; i++) {
            img = document.createElement('img');
            img.src = [base + '-' + i, ext].join('.');
            $(img).css({
                position: 'absolute',
                left: cropWidth * (i % cols) + 'px',
                top: cropHeight * Math.floor(i / cols) + 'px'
            });
            $inner.append(img);
        }
    };

    exports.TipMap = TipMap;
})(window, jQuery);
