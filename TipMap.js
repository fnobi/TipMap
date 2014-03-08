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

        var offsetX = 0;
        var offsetY = 0;
        function posit () {
            $inner.css({
                left: offsetX + 'px',
                top: offsetY + 'px'
            });
        }

        var flag = false;
        var cursor = [];
        $el.on('mousedown touchstart', function (e) {
            flag = true;
            var finger = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
            cursor = [finger.pageX, finger.pageY];
        });
        
        $el.on('mousemove touchmove', function (e) {
            if (!flag) {
                return;
            }
            e.preventDefault();

            var finger = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
            var x = finger.pageX;
            var y = finger.pageY;

            offsetX += (x - cursor[0]);
            offsetY += (y - cursor[1]);

            posit();

            cursor = [x, y];
        });

        $el.on('mouseup touochend', function () {
            flag = false;
            cursor = [];
        });
    };

    exports.TipMap = TipMap;
})(window, jQuery);
