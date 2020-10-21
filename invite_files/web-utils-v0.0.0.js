(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.WebUtils = {}));
}(this, (function (exports) { 'use strict';

    var MemoryStorage = /** @class */ (function () {
        function MemoryStorage() {
            this.data = new Map();
        }
        MemoryStorage.prototype.get = function (key) {
            var _a;
            return _a = this.data.get(key), (_a !== null && _a !== void 0 ? _a : null);
        };
        MemoryStorage.prototype.set = function (key, value) {
            this.data.set(key, value);
        };
        MemoryStorage.prototype.delete = function (key) {
            this.data.delete(key);
        };
        MemoryStorage.prototype.clear = function () {
            this.data.clear();
        };
        return MemoryStorage;
    }());
    var LocalStorage = /** @class */ (function () {
        function LocalStorage() {
            this.storage = window.localStorage;
        }
        LocalStorage.canUse = function () {
            var testKey = '__wm_local_storage_test__';
            try {
                window.localStorage.setItem(testKey, '1');
                window.localStorage.removeItem(testKey);
                return true;
            }
            catch (_a) {
                return false;
            }
        };
        LocalStorage.prototype.get = function (key) {
            return this.storage.getItem(key);
        };
        LocalStorage.prototype.set = function (key, value) {
            this.storage.setItem(key, value);
        };
        LocalStorage.prototype.delete = function (key) {
            this.storage.removeItem(key);
        };
        LocalStorage.prototype.clear = function () {
            this.storage.clear();
        };
        return LocalStorage;
    }());
    function canUseLocalStorage() {
        return LocalStorage.canUse();
    }
    var storage = null;
    function createStorage() {
        if (storage !== null) {
            return storage;
        }
        if (LocalStorage.canUse()) {
            storage = new LocalStorage();
        }
        else {
            storage = new MemoryStorage();
        }
        return storage;
    }
    function createStorageKey(namespace, key) {
        return "@wm/" + namespace + "/" + key;
    }

    /** Coerces a value to a CSS pixel value. */
    function coerceCssPixelValue(value) {
        if (value == null) {
            return '';
        }
        return typeof value === 'string' ? value : value + "px";
    }

    function safeScrollTo(element, options) {
        if (options === void 0) { options = {}; }
        if (!element) {
            return;
        }
        if (isWindow(element)) {
            element.scrollTo(options.left !== undefined ? options.left : element.scrollX, options.top !== undefined ? options.top : element.scrollY);
        }
        else if (typeof element.scrollTo === 'function') {
            element.scrollTo(options);
        }
        else {
            var left = options.left, top_1 = options.top;
            if (top_1 !== undefined) {
                element.scrollTop = top_1;
            }
            if (left !== undefined) {
                element.scrollLeft = left;
            }
        }
    }
    function safeSmoothScrollTo(element, scrollTargetY, speed) {
        if (speed === void 0) { speed = 2000; }
        var scrollY = isWindow(element) ? element.scrollY : element.scrollTop;
        var totalAnimatingTime = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
        function ease(animationProgress) {
            return -0.5 * (Math.cos(Math.PI * animationProgress) - 1);
        }
        function tick(currentTime) {
            var progress = currentTime / totalAnimatingTime;
            var easedProgress = ease(progress);
            if (progress < 1) {
                window.requestAnimationFrame(function () { return tick(currentTime + 1 / 60); });
                safeScrollTo(element, {
                    top: scrollY + (scrollTargetY - scrollY) * easedProgress,
                });
            }
            else {
                safeScrollTo(element, { top: scrollTargetY });
            }
        }
        tick(0);
    }
    function isWindow(el) {
        return el === window;
    }

    function copyToClipboard(text) {
        if (!clipboardCopySupported()) {
            return false;
        }
        copy(text);
        return true;
    }
    function clipboardCopySupported() {
        var _a, _b, _c;
        return _c = (_b = (_a = document).queryCommandSupported) === null || _b === void 0 ? void 0 : _b.call(_a, 'copy'), (_c !== null && _c !== void 0 ? _c : false);
    }
    function isIOS() {
        return navigator.userAgent.match(/ipad|iphone/i) != null;
    }
    function copy(text) {
        var focusingContainer = document.body;
        var textArea = document.createElement('textArea');
        textArea.value = text;
        textArea.contentEditable = 'true';
        textArea.readOnly = false;
        textArea.style.userSelect = 'text';
        textArea.style.webkitUserSelect = 'text';
        focusingContainer.insertBefore(textArea, focusingContainer.firstChild);
        if (isIOS()) {
            var range = document.createRange();
            range.selectNodeContents(textArea);
            var selection = window.getSelection();
            if (selection !== null) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
            textArea.setSelectionRange(0, 999999);
        }
        else {
            textArea.select();
        }
        document.execCommand('copy');
        focusingContainer.removeChild(textArea);
    }

    exports.canUseLocalStorage = canUseLocalStorage;
    exports.coerceCssPixelValue = coerceCssPixelValue;
    exports.copyToClipboard = copyToClipboard;
    exports.createStorage = createStorage;
    exports.createStorageKey = createStorageKey;
    exports.safeScrollTo = safeScrollTo;
    exports.safeSmoothScrollTo = safeSmoothScrollTo;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
