var pointevent = function () {
    var canvas = document.getElementById("myCanvas");

    var init = function () {
        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", _addPoint);
        } else {
            canvas.addEventListener("mousedown", function (event) {
                canvas.addEventListener("pointerdown", addPoint);
            });
        }
    };

    function _addPoint(event) {
        var offset = _getOffset(canvas);
        app.addPoint({
            x: event.pageX - offset.left,
            y: event.pageY - offset.top
        });
    }

    function _getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return {
            left: offsetLeft,
            top: offsetTop
        };
    }

    return {
        init: init
    }
}();