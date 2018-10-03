var CallSkiperValue = /** @class */ (function () {
    function CallSkiperValue(value, currentCalls, currentSkippedCalls, wasSkipped) {
        this._value = null;
        this._currentCalls = null;
        this._currentSkippedCalls = null;
        this._wasSkipped = null;
        this._value = value;
        this._currentCalls = currentCalls;
        this._currentSkippedCalls = currentSkippedCalls;
        this._wasSkipped = wasSkipped;
    }
    Object.defineProperty(CallSkiperValue.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CallSkiperValue.prototype, "currentCalls", {
        get: function () {
            return this._currentCalls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CallSkiperValue.prototype, "currentSkippedCalls", {
        get: function () {
            return this._currentSkippedCalls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CallSkiperValue.prototype, "wasSkipped", {
        get: function () {
            return this._wasSkipped;
        },
        enumerable: true,
        configurable: true
    });
    return CallSkiperValue;
}());

function CallSkiper(action, shouldSkip, maxSkipNumber) {
    if (shouldSkip === void 0) { shouldSkip = null; }
    if (maxSkipNumber === void 0) { maxSkipNumber = null; }
    var currentCalls = 0;
    var currentSkippedCalls = 0;
    var canSkip = function () {
        return !Boolean(maxSkipNumber) || currentSkippedCalls < maxSkipNumber;
    };
    return function () {
        var actionArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionArguments[_i] = arguments[_i];
        }
        var isSkipRequire = canSkip()
            && (!Boolean(shouldSkip) || shouldSkip(currentCalls, currentSkippedCalls, maxSkipNumber));
        return new CallSkiperValue(isSkipRequire ? null : action.apply(void 0, actionArguments), ++currentCalls, isSkipRequire ? ++currentSkippedCalls : currentSkippedCalls, isSkipRequire);
    };
}
;

function debounce(action, time) {
    var timeout = null;
    return function () {
        var currentArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            currentArguments[_i] = arguments[_i];
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            action.apply(void 0, currentArguments);
            timeout = null;
        }, time);
    };
}
;

function runOnce(action) {
    var wasRunned = false;
    return function () {
        var currentArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            currentArguments[_i] = arguments[_i];
        }
        if (!wasRunned) {
            wasRunned = true;
            return action.apply(void 0, currentArguments);
        }
        else {
            return null;
        }
    };
}
;
