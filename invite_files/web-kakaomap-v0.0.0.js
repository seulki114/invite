(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.WebKakaomap = {}));
}(this, (function (exports) { 'use strict';

    function searchAddress(address, callback) {
        try {
            var geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function (results, status) {
                if (status === 'OK') {
                    callback({
                        name: results[0].address_name,
                        x: results[0].x,
                        y: results[0].y,
                    });
                }
                else {
                    callback(null);
                }
            });
        }
        catch (error) {
            //
        }
    }
    function initializeKakaomap(addresses, $elems) {
        var _a;
        var address = addresses.address, addressDetail = addresses.addressDetail, jibunAddress = addresses.jibunAddress;
        var mapButton = $elems.mapButton, mapContainer = $elems.mapContainer, kakaomapButton = $elems.kakaomapButton, kakaonaviButton = $elems.kakaonaviButton;
        (_a = mapButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            var _a, _b, _c;
            if ((_c = (_a = window.WebUtils) === null || _a === void 0 ? void 0 : (_b = _a).copyToClipboard) === null || _c === void 0 ? void 0 : _c.call(_b, address + " " + addressDetail)) {
                alert('클립보드에 복사되었습니다!');
            }
        });
        try {
            var map_1 = new window.kakao.maps.Map(mapContainer, {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
                draggable: false,
                scrollwheel: false,
            });
            var applyAddress_1 = function (_a) {
                var name = _a.name, x = _a.x, y = _a.y;
                var _b, _c;
                var coords = new window.kakao.maps.LatLng(y, x);
                var marker = new window.kakao.maps.Marker({
                    map: map_1,
                    position: coords,
                });
                marker.setMap(map_1);
                map_1.setCenter(coords);
                (_b = kakaonaviButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
                    window.open('https://map.kakao.com/link/to/' + name + ',' + y + ',' + x, '_blank', 'noopener');
                });
                (_c = kakaomapButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
                    window.open('https://map.kakao.com/link/map/' + name + ',' + y + ',' + x, '_blank', 'noopener');
                });
            };
            searchAddress(address, function (result) {
                if (result != null) {
                    applyAddress_1(result);
                }
                else if (jibunAddress != null) {
                    searchAddress(jibunAddress, function (result) {
                        if (result != null) {
                            applyAddress_1(result);
                        }
                    });
                }
            });
        }
        catch (error) {
            //
        }
    }

    exports.initializeKakaomap = initializeKakaomap;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
