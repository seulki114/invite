(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.WebImage = {}));
}(this, (function (exports) { 'use strict';

    function isHTMLImageElement(value) {
        return value != null && value.tagName.toLowerCase() === 'img';
    }
    function onImageLoad(selector, callback) {
        var elem = document.querySelector(selector);
        if (!isHTMLImageElement(elem)) {
            return;
        }
        if (elem.src !== '' && elem.src != null && elem.complete) {
            callback(elem);
        }
        else {
            var handleLoad = function () {
                callback(elem);
            };
            elem.addEventListener('load', handleLoad, false);
        }
    }

    exports.isHTMLImageElement = isHTMLImageElement;
    exports.onImageLoad = onImageLoad;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
