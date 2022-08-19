"use strict";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$1(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$1(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook) {
  return function(data) {
    return hook(data) || data;
  };
}
function queue$1(hooks, data) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(interceptor, options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function handlePromise(promise) {
  return promise;
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject$1(options.formatArgs) && isPlainObject$1(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number2, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number2 = Number(number2);
  if (number2 === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number2 / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number2 < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string" && isPlainObject$1(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$1(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string") {
    if (isPlainObject$1(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$1(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!Array.isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({ type: "receive", data: normalizePushMessage(args.message) });
    });
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({ type: "click", data: normalizePushMessage(args.message) });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushCid(args) {
  if (!isPlainObject$1(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  getPushCidCallbacks.push((cid2, errMsg) => {
    let res;
    if (cid2) {
      res = { errMsg: "getPushCid:ok", cid: cid2 };
      hasSuccess && success(res);
    } else {
      res = { errMsg: "getPushCid:fail" + (errMsg ? " " + errMsg : "") };
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  if (typeof cid !== "undefined") {
    Promise.resolve().then(() => invokeGetPushCidCallbacks(cid, cidErrMsg));
  }
}
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$1(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ${methodName} \u6682\u4E0D\u652F\u6301 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$1(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || "zh-Hans";
};
const setLocale = (locale) => {
  const app = getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushCid,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, wx[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:\u670D\u52A1[" + service + "]\u4E0D\u5B58\u5728"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.windowHeight - safeArea.bottom
    };
  }
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getProvider,
  createSelectorQuery
});
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  showActionSheet
});
var index = initUni(shims, protocols);
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
      }
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$1,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self = toRaw(this);
    trackRefValue(self);
    if (self._dirty || !self._cacheable) {
      self._dirty = false;
      self._value = self.effect.run();
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle2 = start + end >>> 1;
    const middleJobId = getId(queue[middle2]);
    middleJobId < id ? start = middle2 + 1 : end = middle2;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
  return i;
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
function emit(event, ...args) {
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number2, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    } else if (number2) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1("rtg");
const onRenderTracked = createHook$1("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (key[0] !== "$" && key[0] !== "_") {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed$1({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$1(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount() {
      },
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
const queuePostRenderEffect = queuePostFlushCb;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component2);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = resolve(instance[type] || Component2[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.__$el || (i.__$el = {}),
  $data: (i) => i.data,
  $props: (i) => shallowReadonly(i.props),
  $attrs: (i) => shallowReadonly(i.attrs),
  $slots: (i) => shallowReadonly(i.slots),
  $refs: (i) => shallowReadonly(i.refs),
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && (key[0] === "$" || key[0] === "_") && hasOwn(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (key[0] === "$" || key[0] === "_") {
        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names2 = Object.keys(Component2.components);
      for (let i = 0; i < names2.length; i++) {
        validateComponentName(names2[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names2 = Object.keys(Component2.directives);
      for (let i = 0; i < names2.length; i++) {
        validateDirectiveName(names2[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed$1 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.33";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    if ({}.VUE_APP_DEBUG) {
      const mpInstance = ctx.$scope;
      console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:flushCallbacks[" + callbacks.length + "]");
    }
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick$1(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    if ({}.VUE_APP_DEBUG) {
      const mpInstance = ctx.$scope;
      console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:nextVueTick");
    }
    return nextTick(fn && fn.bind(instance.proxy));
  }
  if ({}.VUE_APP_DEBUG) {
    const mpInstance = ctx.$scope;
    console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:nextMPTick");
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(fn.bind(instance.proxy), instance, 14);
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs(void 0, instance.update);
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick$1(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const doSet = () => {
    const mpComponents = $scope.selectAllComponents(".r").concat($scope.selectAllComponents(".r-i-f"));
    $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, findComponentPublicInstance(mpComponents, templateRef.i), setupState));
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick$1(instance, doSet);
  }
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    return getExposeProxy(vm.$) || vm;
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction(r)) {
    r(refValue, {});
  } else {
    const _isString = isString(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect$1 = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
  }
  setupComponent(instance);
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(props, null);
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs(void 0, instance.update);
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      patch(instance, renderComponentRoot(instance));
    } else {
      const { bu, u } = instance;
      toggleRecurse(instance, false);
      updateComponentPreRender(instance);
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      patch(instance, renderComponentRoot(instance));
      if (u) {
        queuePostRenderEffect$1(u);
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
  );
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect$1(um);
  }
  queuePostRenderEffect$1(() => {
    instance.isUnmounted = true;
  });
}
const oldCreateApp = createAppAPI();
function createVueApp(rootComponent, rootProps = null) {
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$1(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType) {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$2(target, key, val) {
  return target[key] = val;
}
function errorHandler(err, instance, info) {
  if (!instance) {
    throw err;
  }
  const app = getApp();
  if (!app || !app.$vm) {
    throw err;
  }
  {
    app.$vm.$callHook(ON_ERROR, err, info);
  }
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  if (isFunction(app._component.onError)) {
    appConfig.errorHandler = errorHandler;
  }
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$2;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = {}.UNI_MP_PLUGIN ? "createPluginApp" : {}.UNI_SUBPACKAGE ? "createSubpackageApp" : "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? eventTarget.dataset.eventsync === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$1(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$1(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const eventChannels = {};
const eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  } else if (name === "onLoad" && args && args.__id__) {
    this.__eventChannel__ = getEventChannel(args.__id__);
    delete args.__id__;
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf("on") === 0 && isFunction(vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = getApp({
      allowDefault: true
    });
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
    if ({}.UNI_SUBPACKAGE) {
      (wx.$subpackages || (wx.$subpackages = {}))[{}.UNI_SUBPACKAGE] = {
        $vm: vm
      };
    }
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(wx.getSystemInfoSync().language || "zh-Hans");
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  "eO",
  "uR",
  "uRIF",
  "uI",
  "uT",
  "uP",
  "uS"
];
function initDefaultProps(isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps());
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$1(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$1(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$1(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    invalidateJob(instance.update);
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("value");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  if ({}.UNI_MP_PLUGIN) {
    return wx.$vm;
  }
  if ({}.UNI_SUBPACKAGE) {
    return wx.$subpackages[{}.UNI_SUBPACKAGE].$vm;
  }
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getApp().$vm.$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
    if ({}.UNI_MP_PLUGIN) {
      wx.$vm = vm;
    }
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  mocks,
  isPage,
  initRelation,
  handleLink,
  initLifetimes
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
/*!
  * pinia v2.0.18
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const componentStateTypes = [];
const getStoreType = (id) => "\u{1F34D} " + id;
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
}
function patchActionForGrouping(store, actionNames) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const trackedStore = new Proxy(store, {
        get(...args) {
          return Reflect.get(...args);
        },
        set(...args) {
          return Reflect.set(...args);
        }
      });
      return actions[actionName].apply(trackedStore, arguments);
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  if (options.state) {
    store._isOptionsAPI = true;
  }
  if (typeof options.state === "function") {
    patchActionForGrouping(
      store,
      Object.keys(options.actions)
    );
    const originalHotUpdate = store._hotUpdate;
    toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
    };
  }
  addStoreToDevtools(
    app,
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (IS_CLIENT && true && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? toRefs(ref(state ? state() : {}).value) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[\u{1F34D}]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed$1(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = () => {
    throw new Error(`\u{1F34D}: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
  };
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action2) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action2.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign(
    IS_CLIENT ? {
      _customProperties: markRaw(/* @__PURE__ */ new Set()),
      _hmrPayload
    } : {},
    partialStore
  ));
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action2 = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action2));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? computed$1(() => {
          setActivePinia(pinia);
          return getter.call(store, store);
        }) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
    const nonEnumerable = {
      writable: true,
      configurable: true,
      enumerable: false
    };
    if (IS_CLIENT) {
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, {
          value: store[p2],
          ...nonEnumerable
        });
      });
    }
  }
  pinia._p.forEach((extender) => {
    if (IS_CLIENT) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign(store, extensions);
    } else {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance2 = getCurrentInstance();
    pinia = pinia || currentInstance2 && inject(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[\u{1F34D}]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT && currentInstance2 && currentInstance2.proxy && !hot) {
      const vm = currentInstance2.proxy;
      const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
      cache[id] = store;
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
const onHide = /* @__PURE__ */ createHook(ON_HIDE);
const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
var family$1 = [
  "\u674E",
  "\u738B",
  "\u5F20",
  "\u5218",
  "\u9648",
  "\u6768",
  "\u8D75",
  "\u9EC4",
  "\u5468",
  "\u5434",
  "\u5F90",
  "\u5B59",
  "\u80E1",
  "\u6731",
  "\u9AD8",
  "\u6797",
  "\u4F55",
  "\u90ED",
  "\u9A6C",
  "\u7F57",
  "\u6881",
  "\u5B8B",
  "\u90D1",
  "\u8C22",
  "\u97E9",
  "\u5510",
  "\u51AF",
  "\u4E8E",
  "\u8463",
  "\u8427",
  "\u7A0B",
  "\u66F9",
  "\u8881",
  "\u9093",
  "\u8BB8",
  "\u5085",
  "\u6C88",
  "\u66FE",
  "\u5F6D",
  "\u5415",
  "\u82CF",
  "\u5362",
  "\u848B",
  "\u8521",
  "\u8D3E",
  "\u4E01",
  "\u9B4F",
  "\u859B",
  "\u53F6",
  "\u960E",
  "\u4F59",
  "\u6F58",
  "\u675C",
  "\u6234",
  "\u590F",
  "\u953A",
  "\u6C6A",
  "\u7530",
  "\u4EFB",
  "\u59DC",
  "\u8303",
  "\u65B9",
  "\u77F3",
  "\u59DA",
  "\u8C2D",
  "\u5ED6",
  "\u90B9",
  "\u718A",
  "\u91D1",
  "\u9646",
  "\u90DD",
  "\u5B54",
  "\u767D",
  "\u5D14",
  "\u5EB7",
  "\u6BDB",
  "\u90B1",
  "\u6B27\u9633",
  "\u79E6",
  "\u6C5F",
  "\u53F2",
  "\u987E",
  "\u4FAF",
  "\u90B5",
  "\u5357\u5BAB",
  "\u5B5F",
  "\u9F99",
  "\u4E07",
  "\u6BB5",
  "\u6F15",
  "\u94B1",
  "\u6C64",
  "\u5C39",
  "\u4E1C\u65B9",
  "\u9ECE",
  "\u6613",
  "\u5E38",
  "\u6B66",
  "\u4E54",
  "\u8D3A",
  "\u8D56",
  "\u9F9A",
  "\u6587",
  "\u5E9E",
  "\u6A0A",
  "\u5170",
  "\u897F\u95E8",
  "\u6BB7",
  "\u65BD",
  "\u9676",
  "\u6D2A",
  "\u7FDF",
  "\u5B89",
  "\u4EE4\u72D0",
  "\u989C",
  "\u502A",
  "\u4E25",
  "\u725B",
  "\u6E29",
  "\u5B63",
  "\u4FDE",
  "\u7AE0",
  "\u9C81",
  "\u845B",
  "\u4F0D",
  "\u767E\u91CC",
  "\u97E6",
  "\u7533",
  "\u5C24",
  "\u6BD5",
  "\u8042",
  "\u7126",
  "\u5411",
  "\u4E0A\u5B98",
  "\u67F3",
  "\u90A2",
  "\u8DEF",
  "\u5CB3",
  "\u590F\u4FAF",
  "\u9F50",
  "\u6885",
  "\u83AB",
  "\u5E84",
  "\u8F9B",
  "\u957F\u5B59",
  "\u7BA1",
  "\u795D",
  "\u6D82",
  "\u7687\u752B",
  "\u8C37",
  "\u7941",
  "\u803F",
  "\u8DEF",
  "\u6155\u5BB9",
  "\u8A79",
  "\u5173",
  "\u82D7",
  "\u51CC",
  "\u8D39",
  "\u7EAA",
  "\u7AE5",
  "\u6B27",
  "\u7504",
  "\u8BF8\u845B",
  "\u9879",
  "\u66F2",
  "\u88F4",
  "\u5E2D",
  "\u67E5",
  "\u5C48",
  "\u9C8D",
  "\u970D",
  "\u6FB9\u53F0",
  "\u67EF",
  "\u962E",
  "\u95F5",
  "\u89E3",
  "\u67F4",
  "\u5409",
  "\u77BF",
  "\u621A",
  "\u53F8\u5F92",
  "\u7C73",
  "\u6C60",
  "\u59EC",
  "\u8F69\u8F95",
  "\u664F",
  "\u683E",
  "\u5546",
  "\u6556",
  "\u51B7",
  "\u53F8\u9A6C",
  "\u82B1",
  "\u827E",
  "\u84DD",
  "\u90FD",
  "\u53F8\u7A7A",
  "\u4EF2",
  "\u4E50",
  "\u5C01",
  "\u695A",
  "\u853A",
  "\u7AEF\u6728",
  "\u58A8",
  "\u5B81"
];
var female$1 = [
  "\u516E",
  "\u82B3",
  "\u661F",
  "\u6E05",
  "\u590F",
  "\u6708",
  "\u521D",
  "\u4E66",
  "\u7B80",
  "\u96EA",
  "\u76CA",
  "\u7EAF",
  "\u741B",
  "\u99A8",
  "\u5B81",
  "\u5409",
  "\u67D4",
  "\u5FC3",
  "\u5A49",
  "\u662D",
  "\u6587",
  "\u5609",
  "\u5FAE",
  "\u79CB",
  "\u58F0",
  "\u6850",
  "\u989C",
  "\u676D",
  "\u6D32",
  "\u7B11",
  "\u8BED",
  "\u65B0",
  "\u4F69",
  "\u5353",
  "\u4F0A",
  "\u4E91",
  "\u6D01",
  "\u5B9B",
  "\u7530",
  "\u60E0",
  "\u745C",
  "\u747E",
  "\u840C",
  "\u793C",
  "\u4F73",
  "\u5915",
  "\u707C",
  "\u534E",
  "\u5F64",
  "\u7F8E",
  "\u76C8",
  "\u5A9B",
  "\u5955",
  "\u4F9D",
  "\u6797",
  "\u827E",
  "\u541B",
  "\u666F",
  "\u821F",
  "\u695A",
  "\u82F1",
  "\u5349",
  "\u96E8",
  "\u7476",
  "\u8212",
  "\u606C",
  "\u6E29",
  "\u6021",
  "\u66FC",
  "\u65AF",
  "\u8A00",
  "\u6E58",
  "\u7075",
  "\u743C",
  "\u949F",
  "\u67EF",
  "\u5EB7",
  "\u660A",
  "\u851A",
  "\u5170",
  "\u83B9",
  "\u91CD",
  "\u81FB",
  "\u7D20",
  "\u83F2",
  "\u7434",
  "\u8FDC",
  "\u5357",
  "\u5FF5",
  "\u8377",
  "\u732E",
  "\u6668",
  "\u4EAC",
  "\u51AC",
  "\u6590",
  "\u79BE",
  "\u9759",
  "\u7545",
  "\u7684",
  "\u4EBF",
  "\u8587",
  "\u9526",
  "\u9756",
  "\u767D",
  "\u6167",
  "\u6960",
  "\u654F",
  "\u537F",
  "\u97F3",
  "\u7ADE",
  "\u4E2D",
  "\u82AE",
  "\u9E3F",
  "\u7FBD",
  "\u6109",
  "\u9A70",
  "\u6538",
  "\u60A0",
  "\u6DB5",
  "\u84C9",
  "\u6DC7",
  "\u5F66",
  "\u59EC",
  "\u7D2B",
  "\u971C",
  "\u5072",
  "\u5A1F",
  "\u5A1C",
  "\u5A9A",
  "\u5F69",
  "\u6843",
  "\u59E3",
  "\u5B9D",
  "\u5A07",
  "\u6625",
  "\u9732",
  "\u68CB",
  "\u5DE7",
  "\u5AD4",
  "\u83F1",
  "\u6657",
  "\u598D",
  "\u5999",
  "\u9999",
  "\u5A34",
  "\u59DD",
  "\u96C5",
  "\u742A",
  "\u59D7",
  "\u4EEA",
  "\u6E90",
  "\u82B7",
  "\u82B9",
  "\u8C37",
  "\u6674",
  "\u73CD",
  "\u5A77",
  "\u5BFB",
  "\u59A9",
  "\u65CB",
  "\u83E1",
  "\u9896",
  "\u5A05",
  "\u7B60",
  "\u59AE",
  "\u6C9B",
  "\u8299",
  "\u5A55",
  "\u8D3B",
  "\u8431",
  "\u8D6B",
  "\u51DD",
  "\u5BB9",
  "\u83B2",
  "\u7389",
  "\u4FDE",
  "\u60C5",
  "\u5A08",
  "\u59FF",
  "\u67F3",
  "\u5E0C",
  "\u5C9A",
  "\u8776",
  "\u76FC",
  "\u73B2",
  "\u5A06",
  "\u5A75",
  "\u6D77",
  "\u5E7B",
  "\u6653",
  "\u5A67",
  "\u4E39",
  "\u5A09",
  "\u5983",
  "\u51B0",
  "\u51E1",
  "\u542C",
  "\u5BD2",
  "\u65ED",
  "\u7FE0",
  "\u70DF",
  "\u5029",
  "\u4F36",
  "\u4E3D",
  "\u840D",
  "\u84DD",
  "\u7477",
  "\u73CA",
  "\u4EE3",
  "\u857E",
  "\u4FEA",
  "\u6893",
  "\u601C",
  "\u96EF",
  "\u7433",
  "\u748E",
  "\u970F",
  "\u9716",
  "\u745E",
  "\u5AE3",
  "\u59A4",
  "\u753B",
  "\u542B",
  "\u6155",
  "\u854A",
  "\u5AF1",
  "\u67AB",
  "\u96C1",
  "\u84D3",
  "\u7EA8",
  "\u7709",
  "\u83C1",
  "\u82D1",
  "\u7457",
  "\u7430",
  "\u6DD1",
  "\u73E0",
  "\u829D",
  "\u7EA2",
  "\u5A25",
  "\u82AC",
  "\u71D5",
  "\u83CA",
  "\u51E4",
  "\u6885",
  "\u771F",
  "\u73AF",
  "\u8363",
  "\u7231",
  "\u59B9",
  "\u971E",
  "\u83BA",
  "\u8273",
  "\u52E4",
  "\u8D1E",
  "\u8389",
  "\u6842",
  "\u5A23",
  "\u53F6",
  "\u74A7",
  "\u7490",
  "\u7426",
  "\u6676",
  "\u831C",
  "\u838E",
  "\u9EDB",
  "\u9752",
  "\u97F5",
  "\u878D",
  "\u56ED",
  "\u827A",
  "\u548F",
  "\u806A",
  "\u6F9C",
  "\u6BD3",
  "\u60A6",
  "\u723D",
  "\u742C",
  "\u8317",
  "\u6B23",
  "\u98D8",
  "\u80B2",
  "\u6EE2",
  "\u99A5",
  "\u7AF9",
  "\u972D",
  "\u6B22",
  "\u9704",
  "\u82B8",
  "\u4E9A",
  "\u5F71",
  "\u8354",
  "\u679D",
  "\u79C0",
  "\u6292",
  "\u8F69",
  "\u777F",
  "\u61FF",
  "\u51CC",
  "\u7FCA",
  "\u8339",
  "\u5AE6",
  "\u9038",
  "\u6F4D",
  "\u6ED4",
  "\u6CCA",
  "\u4F1A",
  "\u7814",
  "\u9633",
  "\u68EE",
  "\u5F18",
  "\u6631",
  "\u4E16",
  "\u704F",
  "\u6C81",
  "\u9518",
  "\u9510",
  "\u946B",
  "\u5B87",
  "\u8D24",
  "\u73A5",
  "\u6CFD",
  "\u9552",
  "\u6A59",
  "\u8559",
  "\u6EDF",
  "\u67C4",
  "\u94ED",
  "\u53CC",
  "\u71E8",
  "\u828A",
  "\u58EC",
  "\u5CA9",
  "\u7166",
  "\u7B71",
  "\u8335",
  "\u8FB0",
  "\u5F08",
  "\u683C",
  "\u745B",
  "\u73FA",
  "\u4EAD",
  "\u6CC9",
  "\u5C39",
  "\u4F18",
  "\u6768",
  "\u57A3",
  "\u8476",
  "\u8D1D",
  "\u6829",
  "\u82AF",
  "\u79B9",
  "\u5189",
  "\u6F2B",
  "\u7AE5",
  "\u9E92",
  "\u6F84",
  "\u82CF",
  "\u845B",
  "\u73C2",
  "\u5C1A",
  "\u8C6B",
  "\u6EAA",
  "\u9F50",
  "\u55BB",
  "\u7696",
  "\u66E6",
  "\u95F5",
  "\u4E1E",
  "\u5B5D",
  "\u7EEE",
  "\u8BD7",
  "\u6BB7",
  "\u5A7C",
  "\u8679",
  "\u7FCC",
  "\u66DC",
  "\u8427",
  "\u5524",
  "\u7F28",
  "\u8BFA",
  "\u91D1",
  "\u768E",
  "\u84C1",
  "\u98DE",
  "\u614E",
  "\u709C",
  "\u6D35",
  "\u90A6",
  "\u8283",
  "\u7EFF",
  "\u7407",
  "\u741A",
  "\u9676",
  "\u7396",
  "\u597D",
  "\u821C",
  "\u5FB7",
  "\u96F6",
  "\u7317",
  "\u8863",
  "\u82D3",
  "\u6E44",
  "\u6E25",
  "\u7A88",
  "\u835F",
  "\u7FD5",
  "\u7EE5",
  "\u4EE4",
  "\u95FB",
  "\u5929",
  "\u9A8F",
  "\u7FF0",
  "\u6EB1",
  "\u82FE",
  "\u6862",
  "\u7F09",
  "\u7199",
  "\u9E70",
  "\u74D2",
  "\u5FBD",
  "\u7A46",
  "\u54F2",
  "\u79C9",
  "\u632F",
  "\u9E6D",
  "\u94C3"
];
var male$1 = [
  "\u56FD",
  "\u6C11",
  "\u90A6",
  "\u6770",
  "\u5B9D",
  "\u68EE",
  "\u70B3",
  "\u6587",
  "\u4F2F",
  "\u534E",
  "\u9F99",
  "\u4F26",
  "\u9633",
  "\u535A",
  "\u5E38",
  "\u6625",
  "\u680B",
  "\u51E4",
  "\u8D35",
  "\u4FCA",
  "\u5FB7",
  "\u7AE0",
  "\u6069",
  "\u82B3",
  "\u4E1A",
  "\u5FD7",
  "\u5149",
  "\u6CFD",
  "\u660C",
  "\u5DDD",
  "\u65B9",
  "\u594E",
  "\u4EAE",
  "\u660E",
  "\u5E74",
  "\u9E4F",
  "\u5168",
  "\u987A",
  "\u540C",
  "\u6B66",
  "\u6CBB",
  "\u667A",
  "\u5FE0",
  "\u58EE",
  "\u9053",
  "\u6E05",
  "\u5174",
  "\u8FDC",
  "\u8BDA",
  "\u8F89",
  "\u826F",
  "\u6797",
  "\u9686",
  "\u654F",
  "\u4EC1",
  "\u8363",
  "\u5BB9",
  "\u6DA6",
  "\u751F",
  "\u5A01",
  "\u7965",
  "\u65B0",
  "\u99A8",
  "\u79C0",
  "\u4E49",
  "\u7389",
  "\u6E90",
  "\u653F",
  "\u4E2D",
  "\u4E91",
  "\u5B9A",
  "\u4E1C",
  "\u5F69",
  "\u9E23",
  "\u7FD4",
  "\u4EEA",
  "\u798F",
  "\u6D77",
  "\u524D",
  "\u5B87",
  "\u88D5",
  "\u6842",
  "\u82AC",
  "\u5BBE",
  "\u5747",
  "\u537F",
  "\u745E",
  "\u6CF0",
  "\u8D24",
  "\u5F66",
  "\u82F1",
  "\u73CD",
  "\u6C49",
  "\u6D69",
  "\u6CB3",
  "\u9E64",
  "\u5F18",
  "\u6BC5",
  "\u9E3F",
  "\u5112",
  "\u7115",
  "\u5409",
  "\u6D4E",
  "\u5148",
  "\u5609",
  "\u666F",
  "\u5C71",
  "\u661F",
  "\u521A",
  "\u4FED",
  "\u52E4",
  "\u6765",
  "\u5170",
  "\u8A00",
  "\u5229",
  "\u81E3",
  "\u91D1",
  "\u51CC",
  "\u8302",
  "\u5B5F",
  "\u9E9F",
  "\u5B66",
  "\u54F2",
  "\u5357",
  "\u57F9",
  "\u57FA",
  "\u6C9B",
  "\u9716",
  "\u7A0B",
  "\u4E3E",
  "\u9704",
  "\u542F",
  "\u8D77",
  "\u5343",
  "\u91CC",
  "\u677E",
  "\u8C37",
  "\u5C1A",
  "\u5FAE",
  "\u7ECD",
  "\u65F6",
  "\u96E8",
  "\u8FBE",
  "\u5947",
  "\u4F1F",
  "\u4E16",
  "\u79D1",
  "\u7984",
  "\u7F8E",
  "\u94ED",
  "\u5B81",
  "\u96C4",
  "\u52CB",
  "\u4ED5",
  "\u6DD1",
  "\u6811",
  "\u806A",
  "\u9F50",
  "\u777F",
  "\u56DB",
  "\u5929",
  "\u4FDD",
  "\u797A",
  "\u9E92",
  "\u5EF7",
  "\u5EAD",
  "\u5F6C",
  "\u658C",
  "\u707F",
  "\u9F0E",
  "\u5BCC",
  "\u5E7F",
  "\u7FF0",
  "\u701A",
  "\u864E",
  "\u4F1A",
  "\u60E0",
  "\u9526",
  "\u9B41",
  "\u6F9C",
  "\u793C",
  "\u5347",
  "\u80DC",
  "\u76DB",
  "\u901A",
  "\u709C",
  "\u851A",
  "\u7199",
  "\u4FE1",
  "\u9009",
  "\u96C5",
  "\u8000",
  "\u70E8",
  "\u53CB",
  "\u715C",
  "\u6E0A",
  "\u662D",
  "\u7167",
  "\u5E0C",
  "\u9521",
  "\u663E",
  "\u5BAA",
  "\u5B5D",
  "\u98DE",
  "\u5EB7",
  "\u8D1E",
  "\u6052",
  "\u4E66",
  "\u5802",
  "\u51EF",
  "\u8DC3",
  "\u8DEF",
  "\u8FD0",
  "\u5E9A",
  "\u5146",
  "\u4E30",
  "\u632F",
  "\u58F0",
  "\u9707",
  "\u6602",
  "\u9AD8",
  "\u81F4",
  "\u4EF2",
  "\u8C26",
  "\u771F",
  "\u6C5F",
  "\u5BD2",
  "\u8F69",
  "\u5BA3",
  "\u7AF9",
  "\u82D1",
  "\u6743",
  "\u741B",
  "\u664B",
  "\u8861",
  "\u6631",
  "\u822A",
  "\u8FB0",
  "\u660A",
  "\u65ED",
  "\u5B63",
  "\u4E1E",
  "\u950B",
  "\u6FEF",
  "\u73AE",
  "\u7693",
  "\u708E",
  "\u6E29",
  "\u714A",
  "\u67EF",
  "\u607A",
  "\u9756",
  "\u745C",
  "\u5B8F",
  "\u887F",
  "\u5353",
  "\u6D3A",
  "\u827A",
  "\u6668",
  "\u6656",
  "\u6D0B",
  "\u6B4C",
  "\u4FEE",
  "\u541B",
  "\u7384",
  "\u4ED9",
  "\u6BDB",
  "\u95EE",
  "\u83F1",
  "\u5B98",
  "\u7A37",
  "\u90BA",
  "\u6D01",
  "\u5C9A",
  "\u4E7E",
  "\u6E38",
  "\u9646",
  "\u6653",
  "\u58A8",
  "\u6BBF",
  "\u664F",
  "\u4F51",
  "\u572D",
  "\u6C85",
  "\u695A",
  "\u6893",
  "\u5764",
  "\u62D3",
  "\u82D7",
  "\u9E6D",
  "\u9706",
  "\u8317",
  "\u9ECE",
  "\u6D32",
  "\u4F0A",
  "\u51B7",
  "\u7136",
  "\u5BA5",
  "\u97EC",
  "\u964C",
  "\u65CB",
  "\u4E88",
  "\u5C55",
  "\u5BB8",
  "\u53F8",
  "\u66AE",
  "\u8FC5",
  "\u6714",
  "\u9A79",
  "\u7FBD",
  "\u4F97",
  "\u5723",
  "\u98CE",
  "\u6DF1",
  "\u7941",
  "\u9773",
  "\u7FCC",
  "\u67AB",
  "\u70AB",
  "\u747E",
  "\u53F6",
  "\u8D6B",
  "\u539A",
  "\u64CE",
  "\u7FCA",
  "\u591C",
  "\u503E",
  "\u6DEE",
  "\u7B80",
  "\u6734",
  "\u6866",
  "\u5065",
  "\u88F4",
  "\u6C5C",
  "\u6377",
  "\u5E55",
  "\u73CF",
  "\u6728",
  "\u94A7",
  "\u9ED8",
  "\u987E",
  "\u6D1B",
  "\u521D",
  "\u5F26",
  "\u7EDC",
  "\u6615",
  "\u91CE",
  "\u9A9E",
  "\u5EB8",
  "\u80FD",
  "\u9A90",
  "\u9AA5",
  "\u5CFB",
  "\u66FC",
  "\u8212",
  "\u79BB",
  "\u73F5",
  "\u65D7",
  "\u9535",
  "\u5021",
  "\u7075",
  "\u675C",
  "\u6CE2",
  "\u65E2",
  "\u7FFE",
  "\u9752",
  "\u52C7",
  "\u575A",
  "\u7490",
  "\u79C9",
  "\u7FFC",
  "\u9065",
  "\u4F11",
  "\u5C24",
  "\u742C",
  "\u7430",
  "\u51AC",
  "\u884D",
  "\u7ECE",
  "\u5FC3",
  "\u603F",
  "\u5E7C",
  "\u9759",
  "\u95F2",
  "\u5AEE",
  "\u7406",
  "\u6148",
  "\u903E",
  "\u4F9D",
  "\u6590",
  "\u6708",
  "\u594B",
  "\u7D20",
  "\u83C0",
  "\u748B",
  "\u7855"
];
var middle$1 = [
  "\u4E4B",
  "\u4EA6",
  "\u5176",
  "\u5982",
  "\u800C",
  "\u4F55",
  "\u4E43",
  "\u4E14",
  "\u82E5",
  "\u548C",
  "\u6240",
  "\u4E3A",
  "\u4E5F",
  "\u4EE5",
  "\u56E0",
  "\u4E8E",
  "\u4E0E",
  "\u5219",
  "\u4E4B",
  "\u5C14",
  "\u5316",
  "\u4ECE",
  "\u53EF",
  "\u5728",
  "\u518D",
  "\u7136",
  "\u5DF2",
  "\u5927",
  "\u4E0D",
  "\u5F03",
  "\u81EA",
  "\u51C6",
  "\u5C82",
  "\u624D",
  "\u4EC5",
  "\u4ECA",
  "\u975E",
  "\u516C",
  "\u5141",
  "\u53C8",
  "\u6709",
  "\u7531",
  "\u5FC5",
  "\u7ADF",
  "\u4E88",
  "\u5145",
  "\u5C11",
  "\u5B9C",
  "\u66F4",
  "\u590D",
  "\u8005",
  "\u5BA2",
  "\u5B89",
  "\u6210",
  "\u627F",
  "\u5D07",
  "\u7EE7",
  "\u8FDB",
  "\u656C",
  "\u514B",
  "\u7ACB",
  "\u58EB",
  "\u77E5",
  "\u7EF4",
  "\u552F",
  "\u91C7",
  "\u6613",
  "\u626C",
  "\u601D",
  "\u671B",
  "\u4E50",
  "\u5FC6",
  "\u4E00",
  "\u5143",
  "\u957F",
  "\u6B63",
  "\u5B50",
  "\u5B97",
  "\u671D",
  "\u6000",
  "\u65E0",
  "\u5EFA",
  "\u68A6",
  "\u5E86",
  "\u4E07",
  "\u5411",
  "\u5EF6",
  "\u5E94",
  "\u6C38",
  "\u98DE",
  "\u5E7F",
  "\u5782",
  "\u632F",
  "\u5174",
  "\u7167",
  "\u884C",
  "\u7FA1",
  "\u6447",
  "\u51DD",
  "\u7B11",
  "\u878D",
  "\u542C",
  "\u5FCD",
  "\u6E38",
  "\u6F5C",
  "\u7720",
  "\u5FF5",
  "\u8FD1",
  "\u732E",
  "\u7559",
  "\u5BFB",
  "\u5C55",
  "\u5165",
  "\u6068",
  "\u67D3",
  "\u8C08",
  "\u8FFD",
  "\u60DC",
  "\u5BB9",
  "\u751F",
  "\u843D",
  "\u51CC",
  "\u4FEE",
  "\u4F9D",
  "\u542B",
  "\u548F",
  "\u5B66"
];
var names = {
  family: family$1,
  female: female$1,
  male: male$1,
  middle: middle$1
};
var family = names.family, female = names.female, male = names.male, middle = names.middle;
function getName(number2, options) {
  var _a;
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var theFamilyName = void 0;
    if (options === null || options === void 0 ? void 0 : options.familyName) {
      theFamilyName = options.familyName;
    } else {
      var familyIndex = Math.floor(Math.random() * family.length);
      theFamilyName = family[familyIndex];
    }
    var f2 = (_a = options === null || options === void 0 ? void 0 : options.isFemale) !== null && _a !== void 0 ? _a : Math.floor(Math.random() * 10) % 2 == 0;
    var namesOfASex = f2 ? female : male;
    var r = Math.random();
    var s2 = options === null || options === void 0 ? void 0 : options.style;
    if (!s2) {
      s2 = r < 0.33333333 ? "single" : r < 0.66666666 ? "double" : "combine";
    }
    var name_1 = "";
    if (s2 == "single") {
      if (options === null || options === void 0 ? void 0 : options.middleCharacter) {
        name_1 = options.middleCharacter;
      } else {
        var nameIndex = Math.floor(Math.random() * namesOfASex.length);
        name_1 = namesOfASex[nameIndex];
      }
    } else if (s2 == "double") {
      var theMiddleCharacter = void 0;
      if (options === null || options === void 0 ? void 0 : options.middleCharacter) {
        theMiddleCharacter = options.middleCharacter;
      } else {
        var nameIndex_1 = Math.floor(Math.random() * namesOfASex.length);
        theMiddleCharacter = namesOfASex[nameIndex_1];
      }
      var nameIndex = Math.floor(Math.random() * namesOfASex.length);
      var theLastCharacter = namesOfASex[nameIndex];
      name_1 = theMiddleCharacter + theLastCharacter;
    } else {
      var theMiddleCharacter = void 0;
      if (options === null || options === void 0 ? void 0 : options.middleCharacter) {
        theMiddleCharacter = options.middleCharacter;
      } else {
        var nameIndex_2 = Math.floor(Math.random() * middle.length);
        theMiddleCharacter = middle[nameIndex_2];
      }
      var nameIndex = Math.floor(Math.random() * namesOfASex.length);
      var theLastCharacter = namesOfASex[nameIndex];
      name_1 = theMiddleCharacter + theLastCharacter;
    }
    names2.push(theFamilyName + name_1);
  }
  return names2;
}
var sexOptions = [
  { text: "\u968F\u673A", value: null },
  { text: "\u5973", value: true },
  { text: "\u7537", value: false }
];
var numberOptions = [
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
  { text: 100, value: 100 }
];
var rarityValues = {
  common: 1,
  uncommon: 0.35,
  rare: 0.15,
  epic: 0.075,
  legendary: 0.03,
  mythic: 0.012,
  exotic: 5e-3
};
var creatureCategory = [
  "plant",
  "worm",
  "fish",
  "beast",
  "bird",
  "reptile",
  "insect"
];
var zoneCategories = ["land", "water", "void"];
var _kParenthesisLeft$2 = "\uFF08";
var _kParenthesisRight$2 = "\uFF09";
var colorPrefix = [
  "\u8D64",
  "\u9752",
  "\u7D2B",
  "\u78A7",
  "\u767D",
  "\u7070",
  "\u4E4C",
  "\u9ED1",
  "\u58A8",
  "\u6697"
];
var dao$2 = [
  "\u957F\u751F",
  "\u7389\u6E05",
  "\u6E05\u5FAE",
  "\u5143\u59CB",
  "\u4E0A\u6E05",
  "\u79B9\u4F59",
  "\u7075\u5B9D",
  "\u592A\u6E05",
  "\u5927\u8D64",
  "\u9053\u5FB7",
  "\u515C\u7387",
  "\u7D2B\u5FAE",
  "\u592A\u5FAE",
  "\u79B9\u4F59",
  "\u6D1E\u7384",
  "\u5927\u8D64",
  "\u5185\u666F",
  "\u6DF7\u4E16",
  "\u5408\u6B22",
  "\u6781\u4E50",
  "\u6B22\u559C",
  "\u6148\u60B2",
  "\u5927\u54C1",
  "\u771F\u6B66",
  "\u7075\u5B9D",
  "\u795E\u7167",
  "\u661F\u67A2",
  "\u795E\u5B9D",
  "\u7985\u97F3",
  "\u5F02\u76F8",
  "\u5DE8\u9619",
  "\u73B2\u73D1",
  "\u7F57\u70DF",
  "\u5982\u610F",
  "\u592A\u7956",
  "\u7F57\u6C49",
  "\u5927\u884D",
  "\u4E2D\u5B5A",
  "\u65E0\u8272",
  "\u83E9\u63D0",
  "\u666E\u8D24",
  "\u83B2\u534E",
  "\u5FC3\u610F",
  "\u9759\u7985",
  "\u5149\u76F8",
  "\u8FBE\u6469",
  "\u822C\u82E5",
  "\u6D85\u69C3",
  "\u7075\u6B66",
  "\u7075\u609F",
  "\u5750\u5FD8",
  "\u4E0D\u5FF5",
  "\u767E\u5408",
  "\u8299\u84C9",
  "\u5B9D\u8272",
  "\u7075\u67A2",
  "\u7D20\u95EE",
  "\u4E91\u73AF",
  "\u7389\u865A",
  "\u5F52\u85CF",
  "\u8FDE\u5C71",
  "\u5947\u7ECF",
  "\u5947\u95E8",
  "\u9041\u7532",
  "\u9738\u738B",
  "\u5B88\u62D9",
  "\u82E5\u611A",
  "\u592A\u4FDD",
  "\u7487\u7391",
  "\u795E\u673A",
  "\u6606\u543E",
  "\u91D1\u521A",
  "\u7F57\u5239",
  "\u4FEE\u7F57",
  "\u5982\u610F",
  "\u5468\u5929",
  "\u8F6E\u56DE",
  "\u6F47\u6E58",
  "\u8F69\u8F95",
  "\u67AF\u8363",
  "\u96CC\u96C4",
  "\u5B50\u6BCD"
];
var element = [
  "\u5929\u7F61",
  "\u5929\u5E08",
  "\u5929\u5E9C",
  "\u5929\u7167",
  "\u5929\u4ED9",
  "\u5929\u5BAB",
  "\u5929\u96F7",
  "\u5929\u706B",
  "\u5929\u5B9D",
  "\u5929\u5175",
  "\u5929\u67A2",
  "\u5929\u9B54",
  "\u5929\u5730",
  "\u5730\u715E",
  "\u5730\u4ED9",
  "\u5730\u5B9D",
  "\u5E7D\u51A5",
  "\u51A5\u6CB3",
  "\u65E5\u6708",
  "\u53E4\u4ED9",
  "\u53E4\u4F5B",
  "\u706B\u7130",
  "\u706B\u5143",
  "\u795E\u706B",
  "\u70C8\u706B",
  "\u9752\u7130",
  "\u7130\u5149",
  "\u5BD2\u51B0",
  "\u7384\u51B0",
  "\u5149\u660E",
  "\u96F7\u7535",
  "\u6C34\u706B",
  "\u98CE\u96F7",
  "\u96F7\u706B",
  "\u98CE\u706B",
  "\u51B0\u706B",
  "\u6676\u708E"
];
var creature$1 = [
  "\u91D1\u7AE5",
  "\u7389\u5973",
  "\u5E1D\u5973",
  "\u7D20\u5973",
  "\u661F\u5973",
  "\u6E38\u9F99",
  "\u87E0\u9F99",
  "\u795E\u9F99",
  "\u5929\u9F99",
  "\u706B\u9F99",
  "\u6BD2\u9F99",
  "\u72C2\u9F99",
  "\u70DB\u9F99",
  "\u5E94\u9F99",
  "\u9F99\u864E",
  "\u8001\u864E",
  "\u72EE\u5B50",
  "\u72EE\u543C",
  "\u72EE\u5578",
  "\u82CD\u72FC",
  "\u91CE\u718A",
  "\u4ED9\u9E64",
  "\u7075\u9E64",
  "\u795E\u9F9F",
  "\u7075\u9F9F",
  "\u7384\u9F9F",
  "\u7075\u9CCC",
  "\u7075\u86C7",
  "\u91D1\u86C7",
  "\u7075\u7334",
  "\u7075\u733F",
  "\u4ED9\u733F",
  "\u7075\u5154",
  "\u98DE\u71D5",
  "\u9E92\u9E9F",
  "\u51E4\u51F0",
  "\u5B54\u96C0",
  "\u9D1B\u9D26",
  "\u8774\u8776",
  "\u87B3\u8782",
  "\u5929\u8749",
  "\u71D5\u5B50",
  "\u9752\u9F99",
  "\u767D\u864E",
  "\u6731\u96C0"
];
var thing = [
  "\u7D2B\u4E91",
  "\u7D2B\u9704",
  "\u7D2B\u5E9C",
  "\u9EC4\u6CC9",
  "\u9EC4\u7AF9",
  "\u91D1\u9619",
  "\u91D1\u7389",
  "\u91D1\u8EAB",
  "\u91D1\u7802",
  "\u9752\u83B2",
  "\u9752\u7AF9",
  "\u9752\u82B1",
  "\u767D\u4E91",
  "\u767D\u8679",
  "\u767D\u7389",
  "\u767D\u7709",
  "\u6731\u7802",
  "\u7384\u6B66",
  "\u7384\u95E8",
  "\u7384\u5973",
  "\u7384\u5929",
  "\u7384\u90FD",
  "\u9ED1\u6728",
  "\u9ED1\u77F3",
  "\u98CE\u96E8",
  "\u82B1\u96E8",
  "\u70DF\u96E8",
  "\u9739\u96F3",
  "\u5E7B\u68A6",
  "\u7075\u4E39",
  "\u83B2\u82B1",
  "\u6885\u82B1",
  "\u743C\u82B1",
  "\u68A8\u82B1",
  "\u6843\u82B1",
  "\u98DE\u4E91",
  "\u67D4\u4E91",
  "\u9752\u4E91",
  "\u5F69\u4E91",
  "\u9634\u98CE",
  "\u5BD2\u98CE",
  "\u7F61\u98CE",
  "\u6D41\u661F",
  "\u957F\u98CE",
  "\u957F\u6625",
  "\u6607\u9633",
  "\u6B8B\u9B42",
  "\u6B8B\u8679"
];
var color = [
  "\u7D20\u5FC3",
  "\u7D20\u94F6",
  "\u7D2B\u971E",
  "\u7D20\u5149",
  "\u91D1\u971E",
  "\u91D1\u5149",
  "\u8D64\u9704",
  "\u7384\u9634",
  "\u7384\u51A5",
  "\u7384\u5FAE",
  "\u9752\u9762"
];
var place$1 = [
  "\u5C11\u6797",
  "\u6B66\u5F53",
  "\u5CE8\u7709",
  "\u6606\u4ED1",
  "\u5D06\u5CD2",
  "\u70B9\u82CD",
  "\u7EC8\u5357",
  "\u6B66\u5937",
  "\u54C0\u7262",
  "\u592A\u884C",
  "\u534E\u5C71",
  "\u6CF0\u5C71",
  "\u5D69\u5C71",
  "\u5929\u5C71",
  "\u8861\u5C71",
  "\u6052\u5C71",
  "\u987B\u5F25",
  "\u84EC\u83B1",
  "\u4E1C\u6D77",
  "\u4E1C\u534E",
  "\u5357\u6D77",
  "\u5357\u534E",
  "\u5357\u6597",
  "\u897F\u6D77",
  "\u897F\u57DF",
  "\u5317\u6D77",
  "\u5317\u6597"
];
var adj = [
  "\u901A\u5929",
  "\u901A\u81C2",
  "\u901A\u8EAB",
  "\u4E00\u5B57",
  "\u5927\u529B",
  "\u8FF7\u8E2A",
  "\u6C9B\u7136",
  "\u6E05\u51C0",
  "\u900D\u9065",
  "\u7F25\u7F08"
];
var number = [
  "\u65E0\u5E38",
  "\u65E0\u76F8",
  "\u65E0\u91CF",
  "\u65E0\u6781",
  "\u65E0\u4E0A",
  "\u65E0\u5F62",
  "\u65E0\u5F71",
  "\u65E0\u5984",
  "\u65E0\u5B9A",
  "\u65E0\u8E2A",
  "\u65E0\u4E3A",
  "\u65E0\u6DAF",
  "\u65E0\u7EC8",
  "\u65E0\u6839",
  "\u865A\u7A7A",
  "\u7A7A\u51A5",
  "\u5148\u5929",
  "\u5E0C\u5937",
  "\u6DF7\u6C8C",
  "\u6DF7\u5929",
  "\u6DF7\u5143",
  "\u6D51\u5143",
  "\u5927\u8352",
  "\u5927\u6210",
  "\u592A\u6781",
  "\u592A\u5143",
  "\u592A\u4E59",
  "\u592A\u4E00",
  "\u592A\u521D",
  "\u592A\u59CB",
  "\u592A\u7384",
  "\u6B63\u6C14",
  "\u671D\u5143",
  "\u5F52\u5143",
  "\u5F52\u4E00",
  "\u4E00\u5143",
  "\u4E00\u6C14",
  "\u4E00\u9633",
  "\u9634\u9633",
  "\u7D2B\u9633",
  "\u592A\u9633",
  "\u7EAF\u9633",
  "\u5C11\u9633",
  "\u592A\u9634",
  "\u7EAF\u9634",
  "\u5C11\u9634",
  "\u5BD2\u9634",
  "\u4E8C\u6C14",
  "\u4E24\u4EEA",
  "\u4E24\u754C",
  "\u4E09\u6E05",
  "\u4E09\u6627",
  "\u4E09\u751F",
  "\u4E09\u4E16",
  "\u4E09\u624D",
  "\u4E09\u5143",
  "\u4E09\u5371",
  "\u4E09\u5C38",
  "\u56DB\u65B9",
  "\u56DB\u6D77",
  "\u56DB\u8C61",
  "\u4E94\u884C",
  "\u4E94\u5149",
  "\u4E94\u6C14",
  "\u4E94\u8272",
  "\u4E94\u5F69",
  "\u4E94\u706B",
  "\u4E94\u9F99",
  "\u4E94\u9634",
  "\u4E94\u9633",
  "\u4E94\u82B1",
  "\u4E94\u9B3C",
  "\u4E94\u6BD2",
  "\u4E94\u96F7",
  "\u516D\u5408",
  "\u516D\u5F26",
  "\u516D\u9634",
  "\u516D\u9633",
  "\u516D\u4E01",
  "\u516D\u7532",
  "\u516D\u865A",
  "\u4E03\u661F",
  "\u4E03\u5B9D",
  "\u4E03\u5F69",
  "\u4E03\u9999",
  "\u4E03\u5DE7",
  "\u4E03\u5F26",
  "\u4E03\u6740",
  "\u4E03\u715E",
  "\u516B\u5366",
  "\u516B\u95E8",
  "\u516B\u65B9",
  "\u516B\u7EA7",
  "\u516B\u76EE",
  "\u516B\u8109",
  "\u4E5D\u9F99",
  "\u4E5D\u5929",
  "\u4E5D\u8F6C",
  "\u4E5D\u9634",
  "\u4E5D\u9633",
  "\u4E5D\u5E7D",
  "\u4E5D\u5BAB",
  "\u4E5D\u70BC",
  "\u4E5D\u534E",
  "\u4E5D\u9F0E",
  "\u4E5D\u66DC",
  "\u4E5D\u66F2",
  "\u5341\u65B9",
  "\u767E\u82B1",
  "\u767E\u7075",
  "\u767E\u6BD2",
  "\u767E\u9B54",
  "\u767E\u4ED9",
  "\u767E\u91CC",
  "\u767E\u4E08",
  "\u767E\u517D",
  "\u767E\u9B3C",
  "\u767E\u70BC",
  "\u5343\u673A",
  "\u5343\u94A7",
  "\u5343\u91CC",
  "\u4E07\u82B1",
  "\u4E07\u5251",
  "\u4E07\u5203",
  "\u4E07\u4ED9",
  "\u4E07\u9B42",
  "\u4E07\u91CC"
];
var gesture = [
  "\u522B\u79BB",
  "\u79BB\u522B",
  "\u5F00\u9616",
  "\u79BB\u5408",
  "\u7A7F\u68AD",
  "\u7EB5\u6A2A",
  "\u6765\u53BB",
  "\u8FDE\u73AF",
  "\u53C2\u5408"
];
var action = [
  "\u62B1\u5143",
  "\u5B88\u4E00",
  "\u70BC\u6C14",
  "\u7B51\u57FA",
  "\u7ED3\u4E39",
  "\u5206\u795E",
  "\u5408\u4F53",
  "\u70BC\u865A",
  "\u6D1E\u771F",
  "\u6D1E\u865A",
  "\u51CC\u865A",
  "\u6613\u7B4B",
  "\u6D17\u9AD3",
  "\u517B\u5FD7",
  "\u6563\u52BF",
  "\u7167\u795E",
  "\u7167\u5929",
  "\u7167\u5996",
  "\u964D\u9B54",
  "\u9A71\u9B54",
  "\u8361\u9B54",
  "\u5EA6\u96BE",
  "\u5EA6\u5384",
  "\u8F9F\u90AA",
  "\u706D\u795E",
  "\u706D\u9B54",
  "\u4F0F\u864E",
  "\u541E\u8C61",
  "\u541E\u661F",
  "\u5438\u661F",
  "\u79FB\u661F",
  "\u6458\u661F",
  "\u95EE\u5929",
  "\u62C2\u4E91",
  "\u6D6E\u5149",
  "\u6D6E\u82B1",
  "\u5206\u82B1",
  "\u63A0\u5F71",
  "\u5316\u5F71",
  "\u6E38\u8EAB",
  "\u62C2\u67F3",
  "\u51CC\u4E91",
  "\u98DE\u6E21",
  "\u8FFD\u98CE",
  "\u626B\u971E",
  "\u542C\u96E8",
  "\u542C\u96EA",
  "\u8E0F\u96EA",
  "\u5BFB\u6885",
  "\u846C\u82B1",
  "\u671B\u6708",
  "\u63B7\u7075",
  "\u7F20\u4E1D",
  "\u626B\u5C18",
  "\u79BB\u5C18",
  "\u5FA1\u98CE",
  "\u4E58\u98CE",
  "\u5F04\u96FE",
  "\u5174\u4E91",
  "\u6D88\u51B0",
  "\u9668\u7389",
  "\u788E\u7389",
  "\u65A9\u94C1",
  "\u63A7\u9E64",
  "\u5B9A\u6D77",
  "\u5B9A\u98CE",
  "\u5B9A\u6167",
  "\u5B9A\u5F71",
  "\u5F00\u7891",
  "\u5F00\u5F13",
  "\u5F00\u5929",
  "\u5F00\u5C71",
  "\u5288\u5730",
  "\u9707\u5CB3",
  "\u9707\u5C71",
  "\u62C5\u5C71",
  "\u67B6\u6D77",
  "\u517B\u6C14",
  "\u6467\u5FC3",
  "\u70BC\u8840",
  "\u5316\u8840",
  "\u5316\u9AA8",
  "\u5316\u8109",
  "\u5316\u715E",
  "\u5316\u529F",
  "\u843D\u9633",
  "\u79BB\u68A6",
  "\u7EDD\u60C5",
  "\u95EE\u60C5",
  "\u8BDB\u4F5B",
  "\u622E\u4F5B",
  "\u56F0\u4F5B",
  "\u6CE3\u7075",
  "\u5316\u7075",
  "\u53F1\u7075",
  "\u65A9\u5996",
  "\u8BDB\u5996",
  "\u622E\u5996",
  "\u56F0\u5996",
  "\u9501\u5996",
  "\u8FD8\u9B42",
  "\u5316\u9B42",
  "\u843D\u9B42",
  "\u566C\u9B42",
  "\u5931\u9B42",
  "\u8FFD\u9B42",
  "\u65AD\u9B42",
  "\u6444\u9B42",
  "\u52FE\u9B42",
  "\u622E\u9B42",
  "\u9501\u9B42",
  "\u5C01\u9B42",
  "\u517B\u9B42",
  "\u8361\u9B54",
  "\u9547\u9B54",
  "\u4F0F\u9B54",
  "\u8BDB\u9B54",
  "\u622E\u9B54",
  "\u56F0\u9B54",
  "\u7EDD\u9B54",
  "\u9501\u9B54",
  "\u5C01\u9B54",
  "\u517B\u9B54",
  "\u62A4\u9B54",
  "\u5B88\u9B54",
  "\u4F0F\u5929",
  "\u8BDB\u5929",
  "\u622E\u5929",
  "\u56F0\u5929",
  "\u7EDD\u5929",
  "\u9501\u5929",
  "\u5C01\u5929",
  "\u517B\u5929",
  "\u62A4\u5929",
  "\u5B88\u5929",
  "\u4F0F\u795E",
  "\u8BDB\u795E",
  "\u622E\u795E",
  "\u56F0\u795E",
  "\u7EDD\u795E",
  "\u9501\u795E",
  "\u5C01\u795E",
  "\u517B\u795E",
  "\u62A4\u795E",
  "\u5B88\u795E",
  "\u8FF7\u4ED9",
  "\u4F0F\u4ED9",
  "\u8BDB\u4ED9",
  "\u622E\u4ED9",
  "\u56F0\u4ED9",
  "\u7EDD\u4ED9",
  "\u9501\u4ED9",
  "\u5C01\u4ED9",
  "\u517B\u4ED9",
  "\u62A4\u4ED9",
  "\u5B88\u4ED9",
  "\u64D2\u9F99",
  "\u4E58\u9F99",
  "\u5FA1\u9F99",
  "\u964D\u9F99",
  "\u4F0F\u9F99",
  "\u8BDB\u9F99",
  "\u622E\u9F99",
  "\u56F0\u9F99",
  "\u7EDD\u9F99",
  "\u9501\u9F99",
  "\u5C01\u9F99",
  "\u517B\u9F99",
  "\u62A4\u9F99",
  "\u5B88\u9F99"
];
var commonNames = {
  dao: dao$2,
  element,
  creature: creature$1,
  thing,
  color,
  place: place$1,
  adj,
  number,
  gesture,
  action
};
var spiritPrefix = [
  "\u79D8",
  "\u7CBE",
  "\u771F",
  "\u5B9D",
  "\u53E4",
  "\u7384",
  "\u7075",
  "\u4ED9",
  "\u9B54",
  "\u795E",
  "\u9B3C"
];
var strangeNames = [
  "\u62DB\u6447",
  "\u5802\u5EAD",
  "\u795D\u4F59",
  "\u5BAA\u7FFC",
  "\u9675\u5C45",
  "\u7559\u725B",
  "\u7B95\u5C3E",
  "\u8BF8\u6BD7",
  "\u957F\u53F3",
  "\u4E39\u7C9F",
  "\u5C27\u5149",
  "\u77BF\u7236",
  "\u53E5\u4F59",
  "\u6D6E\u7389",
  "\u4F1A\u7A3D",
  "\u5217\u6D82",
  "\u4EC6\u52FE",
  "\u54B8\u9634",
  "\u8346\u675E",
  "\u533A\u5434",
  "\u9E7F\u5434",
  "\u86CA\u96D5",
  "\u6F06\u5434",
  "\u5929\u865E",
  "\u77BF\u5982",
  "\u4E39\u7A74",
  "\u53D1\u723D",
  "\u80B2\u9057",
  "\u9633\u5939",
  "\u704C\u6E58",
  "\u4ED1\u8005",
  "\u5357\u79BA",
  "\u592A\u534E",
  "\u7B26\u79BA",
  "\u5927\u65F6",
  "\u5D93\u51A1",
  "\u768B\u6D82",
  "\u65E0\u6761",
  "\u6570\u65AF",
  "\u6CF0\u5192",
  "\u6570\u5386",
  "\u9E7F\u53F0",
  "\u9F99\u9996",
  "\u9E1F\u5371",
  "\u5D07\u543E",
  "\u535A\u671B",
  "\u4E0D\u5468",
  "\u8803\u6BCD",
  "\u957F\u7559",
  "\u79EF\u77F3",
  "\u7FFC\u671B",
  "\u4E0A\u7533",
  "\u8BF8\u6B21",
  "\u767D\u4E8E",
  "\u7533\u9996",
  "\u4E2D\u66F2",
  "\u5355\u72D0",
  "\u80A5\u9057",
  "\u8C2F\u660E",
  "\u6DBF\u5149",
  "\u8BF8\u6000",
  "\u9886\u80E1",
  "\u6C42\u5982",
  "\u4E39\u718F",
  "\u8FB9\u6625",
  "\u5355\u5F20",
  "\u704C\u9898",
  "\u6F58\u4FAF",
  "\u6D51\u5915",
  "\u72D0\u5C90",
  "\u8BF8\u4F59",
  "\u94A9\u543E",
  "\u6881\u6E20",
  "\u59D1\u704C",
  "\u6566\u9898",
  "\u9F99\u4FAF",
  "\u9A6C\u6210",
  "\u5929\u6C60",
  "\u738B\u5C4B",
  "\u5B5F\u95E8",
  "\u866B\u5C3E",
  "\u5F6D\u6BD7",
  "\u6CF0\u5934",
  "\u53D1\u9E20",
  "\u9898\u9996",
  "\u6566\u4E0E",
  "\u7EF4\u9F99",
  "\u78A3\u77F3",
  "\u96C1\u95E8",
  "\u5362\u5176",
  "\u59D1\u5C04",
  "\u59D1\u9022",
  "\u7A7A\u6851",
  "\u8BF8\u94A9",
  "\u4E2D\u7236",
  "\u80E1\u5C04",
  "\u5B9C\u82CF",
  "\u7280\u6E20",
  "\u8499\u6728",
  "\u5E1D\u4F11",
  "\u5609\u8363",
  "\u9A6C\u5D6C",
  "\u6556\u5CB8",
  "\u718A\u8033",
  "\u9E7F\u8E44",
  "\u6210\u4FAF",
  "\u671D\u6B4C",
  "\u957F\u77F3",
  "\u9633\u534E",
  "\u653E\u768B",
  "\u5A74\u6881",
  "\u5B9C\u8BF8",
  "\u4EC1\u4E3E",
  "\u9685\u9633",
  "\u652F\u79BB",
  "\u7476\u78A7",
  "\u9AD8\u524D",
  "\u4E50\u9A6C",
  "\u864E\u9996",
  "\u4E11\u9633",
  "\u7ED3\u5308",
  "\u538C\u706B",
  "\u5468\u9976",
  "\u795D\u878D",
  "\u706D\u8499",
  "\u5947\u80B1",
  "\u67D4\u5229",
  "\u52FE\u8292",
  "\u82CD\u68A7",
  "\u9AD8\u67F3",
  "\u670D\u5E38",
  "\u51E4\u5C3E",
  "\u51E4\u9E9F",
  "\u805A\u7A9F",
  "\u9C9C\u865E",
  "\u4E49\u6E20",
  "\u9646\u6D51"
];
var common$2 = Object.values(commonNames).flat(1);
var skill = [
  "\u52B2",
  "\u6C14",
  "\u6C14\u529F",
  "\u5185\u529F",
  "\u7384\u529F",
  "\u5410\u7EB3\u672F",
  "\u5BFC\u5F15\u672F",
  "\u8F7B\u8EAB\u672F",
  "\u5FA1\u5251\u672F",
  "\u5FA1\u98CE\u672F",
  "\u8F7B\u529F",
  "\u9041\u672F",
  "\u64D2\u62FF\u624B",
  "\u795E\u884C\u6CD5",
  "\u7EB5\u8DC3\u529F",
  "\u6B65\u6CD5",
  "\u8EAB\u6CD5",
  "\u62F3",
  "\u638C",
  "\u6307",
  "\u722A",
  "\u624B",
  "\u817F",
  "\u6B65",
  "\u5200",
  "\u5251",
  "\u67AA",
  "\u68CD",
  "\u5FC3\u6CD5",
  "\u5FC3\u8BC0",
  "\u795E\u672F",
  "\u795E\u6CD5",
  "\u795E\u529F",
  "\u529F",
  "\u8BC0",
  "\u795E\u901A",
  "\u7EDD\u6280"
];
var skillPrefix = [
  "\u5C0F",
  "\u5927"
];
var skillNumfix = [
  "\u4E09",
  "\u56DB",
  "\u4E94",
  "\u516D",
  "\u4E03",
  "\u516B",
  "\u4E5D",
  "\u5341",
  "\u5341\u4E00",
  "\u5341\u4E8C",
  "\u5341\u4E94",
  "\u5341\u516B",
  "\u4E8C\u5341\u56DB",
  "\u4E09\u5341\u516D",
  "\u56DB\u5341\u516B",
  "\u516D\u5341\u56DB",
  "\u4E03\u5341\u4E8C",
  "\u516B\u5341\u4E00",
  "\u4E00\u767E\u96F6\u516B"
];
function _getRarity(max) {
  var rarity;
  var value = Math.random() * (max || 1);
  if (value < rarityValues.exotic) {
    rarity = "exotic";
  } else if (value < rarityValues.mythic) {
    rarity = "mythic";
  } else if (value < rarityValues.legendary) {
    rarity = "legendary";
  } else if (value < rarityValues.epic) {
    rarity = "epic";
  } else if (value < rarityValues.rare) {
    rarity = "rare";
  } else if (value < rarityValues.uncommon) {
    rarity = "uncommon";
  } else {
    rarity = "common";
  }
  return { rarity, value };
}
var _kNumberBeginSupplement = "\u8DEF";
var _kNumberEndSupplement = "\u5F0F";
function _getSkillName(length, kind, prefix, numfix) {
  var l = length || 1;
  var rarity = "common";
  if (!length) {
    var r = _getRarity();
    if (r.value < rarityValues.rare) {
      l = 3;
    } else if (r.value < rarityValues.uncommon) {
      l = 2;
    }
    rarity = r.rarity;
  } else {
    if (length > 2) {
      rarity = "rare";
    } else if (length > 1) {
      rarity = "uncommon";
    }
  }
  var name = "";
  for (var i = 0; i < l; ++i) {
    name += common$2[Math.floor(Math.random() * common$2.length)];
  }
  var pre = prefix || "";
  if (!pre && Math.random() < rarityValues.epic) {
    pre = skillPrefix[Math.floor(Math.random() * skillPrefix.length)];
  }
  var n2 = numfix || "";
  if (!n2 && Math.random() < rarityValues.epic) {
    n2 = skillNumfix[Math.floor(Math.random() * skillNumfix.length)];
  }
  var k = kind || skill[Math.floor(Math.random() * skill.length)];
  if (Math.random() < 0.5) {
    name = (n2 != "" ? n2 + _kNumberBeginSupplement : "") + pre + name + k;
  } else {
    if (k.length > 1) {
      name = pre + name + k + (n2 != "" ? n2 + _kNumberEndSupplement : "");
    } else {
      name = pre + name + n2 + k;
    }
  }
  return { name, rarity };
}
var dao$1 = [
  "\u6B63",
  "\u609F",
  "\u6D4E",
  "\u5E7F",
  "\u5584",
  "\u51C0",
  "\u83B2",
  "\u6167",
  "\u666E",
  "\u89C9",
  "\u5B97",
  "\u7985",
  "\u660E",
  "\u6CD5",
  "\u6E05",
  "\u771F",
  "\u5999",
  "\u6D77",
  "\u667A",
  "\u9896",
  "\u5706",
  "\u4E86",
  "\u672C",
  "\u53EF",
  "\u9053",
  "\u5E86",
  "\u540C",
  "\u7384",
  "\u9759",
  "\u6E5B",
  "\u5BC2",
  "\u6DF3",
  "\u8D1E",
  "\u7D20",
  "\u5FB7",
  "\u884C",
  "\u6C38",
  "\u5EF6",
  "\u6052",
  "\u5E38",
  "\u6717",
  "\u5E7D",
  "\u6DF1",
  "\u9274",
  "\u8C28",
  "\u539F",
  "\u5EA6",
  "\u521D",
  "\u4E58",
  "\u521A",
  "\u91CF",
  "\u85CF",
  "\u5149",
  "\u7ECF",
  "\u95FB",
  "\u5BA3",
  "\u884D",
  "\u5174",
  "\u6212",
  "\u9634",
  "\u9633",
  "\u4E91",
  "\u6781",
  "\u53E4",
  "\u4ECA",
  "\u6148",
  "\u60B2",
  "\u4E16",
  "\u613F",
  "\u65E0",
  "\u5C3D",
  "\u542F",
  "\u82B1",
  "\u5B8F",
  "\u76F8",
  "\u660C",
  "\u4E7E",
  "\u5764",
  "\u865A",
  "\u6000",
  "\u5370",
  "\u5BB9",
  "\u60AC",
  "\u955C",
  "\u878D",
  "\u60E0",
  "\u6CFD",
  "\u751F",
  "\u9686",
  "\u4E34",
  "\u901A",
  "\u6E90",
  "\u80FD",
  "\u4EC1",
  "\u679C",
  "\u60DF",
  "\u4F1A",
  "\u5B9A",
  "\u5D07",
  "\u80DC",
  "\u7EF4",
  "\u65B9",
  "\u798F",
  "\u7965",
  "\u6F84",
  "\u7A7A",
  "\u8FDC",
  "\u9F99",
  "\u9633",
  "\u81F3",
  "\u7406",
  "\u8BDA",
  "\u4FE1",
  "\u9AD8",
  "\u666F",
  "\u8363",
  "\u5E0C",
  "\u5FAE",
  "\u4FEE",
  "\u4E49",
  "\u9EC4",
  "\u8D35",
  "\u5168",
  "\u529F",
  "\u79C0",
  "\u6728",
  "\u5C71",
  "\u5B9D",
  "\u548C",
  "\u5FD7",
  "\u7389",
  "\u5143",
  "\u5F18",
  "\u7F57",
  "\u8D24",
  "\u6210",
  "\u7AE0",
  "\u54F2",
  "\u683C",
  "\u8302",
  "\u8A00",
  "\u795E",
  "\u53C2",
  "\u7ACB",
  "\u5947",
  "\u606D",
  "\u5B58",
  "\u4F9D",
  "\u656C",
  "\u627F",
  "\u8D2F",
  "\u7AEF",
  "\u654F",
  "\u534E",
  "\u793C",
  "\u5609",
  "\u6CF0",
  "\u5B87",
  "\u4EA8",
  "\u7075",
  "\u79D8",
  "\u614E",
  "\u7EAF",
  "\u5EFA",
  "\u76CA",
  "\u5B81",
  "\u5229",
  "\u4EAB",
  "\u59CB",
  "\u9704",
  "\u70BC",
  "\u77E5",
  "\u6781",
  "\u606F",
  "\u6DA6",
  "\u5B89",
  "\u51DD"
];
var uncommon$4 = [
  "\u5B50",
  "\u9053\u4EBA"
];
var rare$4 = [
  "\u771F\u4EBA",
  "\u6CD5\u5E08"
];
var epic$4 = [
  "\u4E0A\u4EBA",
  "\u6D1E\u4E3B"
];
var legendary$4 = [
  "\u6559\u4E3B",
  "\u771F\u541B"
];
var mythic$4 = [
  "\u4ED9",
  "\u4ED9\u4EBA",
  "\u4ED9\u5E08",
  "\u4ED9\u7FC1"
];
var exotic$4 = [
  "\u5929\u5C0A"
];
var daoTitleMale$1 = {
  uncommon: uncommon$4,
  rare: rare$4,
  epic: epic$4,
  legendary: legendary$4,
  mythic: mythic$4,
  exotic: exotic$4
};
var uncommon$3 = [
  "\u5B50",
  "\u9053\u59D1"
];
var rare$3 = [
  "\u771F\u4EBA",
  "\u6CD5\u5E08"
];
var epic$3 = [
  "\u516C\u4E3B",
  "\u6D1E\u4E3B"
];
var legendary$3 = [
  "\u6559\u6BCD",
  "\u5723\u5973"
];
var mythic$3 = [
  "\u4ED9",
  "\u4ED9\u5B50",
  "\u4ED9\u5973",
  "\u5723\u6BCD"
];
var exotic$3 = [
  "\u5A18\u5A18"
];
var daoTitleFemale$1 = {
  uncommon: uncommon$3,
  rare: rare$3,
  epic: epic$3,
  legendary: legendary$3,
  mythic: mythic$3,
  exotic: exotic$3
};
var daoMaleStrings = Object.values(daoTitleMale$1).flat(1);
var daoFemaleStrings = Object.values(daoTitleFemale$1).flat(1);
daoMaleStrings.concat(daoFemaleStrings);
var daos = {
  dao: dao$1,
  daoTitleMale: daoTitleMale$1,
  daoTitleFemale: daoTitleFemale$1
};
var dao = daos.dao, daoTitleMale = daos.daoTitleMale, daoTitleFemale = daos.daoTitleFemale;
function getDao(number2, options) {
  var _a;
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var theFirstCharacter = void 0;
    if (options === null || options === void 0 ? void 0 : options.firstCharacter) {
      theFirstCharacter = options.firstCharacter;
    } else {
      var nameIndex1 = Math.floor(Math.random() * dao.length);
      theFirstCharacter = dao[nameIndex1];
    }
    var nameIndex2 = Math.floor(Math.random() * dao.length);
    var name_1 = theFirstCharacter + dao[nameIndex2];
    var titleGroup = ((_a = options === null || options === void 0 ? void 0 : options.isFemale) !== null && _a !== void 0 ? _a : Math.floor(Math.random() * 10) % 2 == 0) ? daoTitleFemale : daoTitleMale;
    var t2 = (options === null || options === void 0 ? void 0 : options.title) || "";
    var rarity = "common";
    if (!t2) {
      rarity = _getRarity().rarity;
      if (rarity == "exotic") {
        t2 = titleGroup.exotic[Math.floor(Math.random() * titleGroup.exotic.length)];
      } else if (rarity == "mythic") {
        t2 = titleGroup.mythic[Math.floor(Math.random() * titleGroup.mythic.length)];
      } else if (rarity == "legendary") {
        t2 = titleGroup.legendary[Math.floor(Math.random() * titleGroup.legendary.length)];
      } else if (rarity == "epic") {
        t2 = titleGroup.epic[Math.floor(Math.random() * titleGroup.epic.length)];
      } else if (rarity == "rare") {
        t2 = titleGroup.rare[Math.floor(Math.random() * titleGroup.rare.length)];
      } else if (rarity == "uncommon") {
        t2 = titleGroup.uncommon[Math.floor(Math.random() * titleGroup.uncommon.length)];
      }
    } else {
      if (daoTitleFemale.exotic.includes(t2) || daoTitleMale.exotic.includes(t2)) {
        rarity = "exotic";
      } else if (daoTitleFemale.mythic.includes(t2) || daoTitleMale.mythic.includes(t2)) {
        rarity = "mythic";
      }
      if (daoTitleFemale.legendary.includes(t2) || daoTitleMale.legendary.includes(t2)) {
        rarity = "legendary";
      }
      if (daoTitleFemale.epic.includes(t2) || daoTitleMale.epic.includes(t2)) {
        rarity = "epic";
      }
      if (daoTitleFemale.rare.includes(t2) || daoTitleMale.rare.includes(t2)) {
        rarity = "rare";
      }
      if (daoTitleFemale.uncommon.includes(t2) || daoTitleMale.uncommon.includes(t2)) {
        rarity = "uncommon";
      }
    }
    names2.push({ name: name_1 + t2, rarity });
  }
  return names2;
}
function getSkill(number2, options) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = _getSkillName(options === null || options === void 0 ? void 0 : options.length, options === null || options === void 0 ? void 0 : options.kind, options === null || options === void 0 ? void 0 : options.prefix, options === null || options === void 0 ? void 0 : options.numfix);
    names2.push(name_1);
  }
  return names2;
}
var book = [
  "\u56FE",
  "\u7ECF",
  "\u5178",
  "\u7C4D",
  "\u7BC6"
];
var uncommon$2 = [
  "\u6B8B\u9875",
  "\u6B8B\u5377",
  "\u6B8B\u672C"
];
var rare$2 = [
  "\u6284\u672C",
  "\u8FC7\u5F55\u672C",
  "\u62D3\u672C",
  "\u6479\u672C"
];
var bookPostfix = {
  uncommon: uncommon$2,
  rare: rare$2
};
var epic$2 = [
  "\u5168",
  "\u603B"
];
var legendary$2 = [
  "\u771F",
  "\u79D8"
];
var mythic$2 = [
  "\u5B9D",
  "\u7384"
];
var exotic$2 = [
  "\u4ED9",
  "\u9B54"
];
var bookPrefix = {
  epic: epic$2,
  legendary: legendary$2,
  mythic: mythic$2,
  exotic: exotic$2
};
Object.values(bookPrefix).flat(1);
Object.values(bookPostfix).flat(1);
var _kParenthesisLeft$1 = "\uFF08";
var _kParenthesisRight$1 = "\uFF09";
var _kBookLeft = "\u300A";
var _kBookRight = "\u300B";
function getBook(number2, options) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var skillname = _getSkillName(options === null || options === void 0 ? void 0 : options.length, options === null || options === void 0 ? void 0 : options.mainkind);
    var rarity = skillname.rarity;
    var pre = (options === null || options === void 0 ? void 0 : options.prefix) || "";
    if (!pre) {
      if (rarity == "exotic") {
        pre = bookPrefix.exotic[Math.floor(Math.random() * bookPrefix.exotic.length)];
      } else if (rarity == "mythic") {
        pre = bookPrefix.mythic[Math.floor(Math.random() * bookPrefix.mythic.length)];
      } else if (rarity == "legendary") {
        pre = bookPrefix.legendary[Math.floor(Math.random() * bookPrefix.legendary.length)];
      } else if (rarity == "epic") {
        pre = bookPrefix.epic[Math.floor(Math.random() * bookPrefix.epic.length)];
      }
    }
    var pk = (options === null || options === void 0 ? void 0 : options.postkind) || "";
    if (pre && !pk) {
      pk = book[Math.floor(Math.random() * book.length)];
    }
    var post = (options === null || options === void 0 ? void 0 : options.postfix) || "";
    if (!post) {
      var r1 = Math.random();
      var r2 = Math.random();
      if (r1 < rarityValues.rare && r2 < rarityValues.rare) {
        post = _kParenthesisLeft$1 + bookPostfix.rare[Math.floor(Math.random() * bookPostfix.rare.length)] + _kParenthesisRight$1;
      } else if (r1 < rarityValues.uncommon && r2 < rarityValues.uncommon) {
        post = _kParenthesisLeft$1 + bookPostfix.uncommon[Math.floor(Math.random() * bookPostfix.uncommon.length)] + _kParenthesisRight$1;
      }
    } else {
      post = _kParenthesisLeft$1 + post + _kParenthesisRight$1;
    }
    names2.push({
      name: _kBookLeft + skillname.name + pre + pk + post + _kBookRight,
      rarity
    });
  }
  return names2;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var common$1 = [
  "\u91D1",
  "\u94F6",
  "\u94DC",
  "\u94C1",
  "\u7389",
  "\u6676",
  "\u94BB",
  "\u7802",
  "\u77F3",
  "\u5CA9",
  "\u6CE5"
];
var uncommon$1 = [
  "\u6C34",
  "\u6DB2",
  "\u9732",
  "\u80F6",
  "\u6D46"
];
var rare$1 = [
  "\u6728",
  "\u6811",
  "\u6811\u76AE",
  "\u6811\u6839",
  "\u8349",
  "\u82D4",
  "\u7AF9",
  "\u53C2",
  "\u829D",
  "\u82B1",
  "\u4E1D",
  "\u85E4",
  "\u53F6",
  "\u78B3",
  "\u6F06",
  "\u6C41",
  "\u679C",
  "\u679C\u6838",
  "\u679C\u58F3"
];
var epic$1 = [
  "\u6C34\u6676",
  "\u73CA\u745A",
  "\u739B\u7459",
  "\u66DC\u77F3",
  "\u73B3\u7441",
  "\u7425\u73C0",
  "\u73CD\u73E0"
];
var legendary$1 = [
  "\u9AA8",
  "\u7259",
  "\u9F7F",
  "\u9AD3",
  "\u76EE",
  "\u773C",
  "\u775B",
  "\u773C\u73E0",
  "\u5C3E",
  "\u9CDE",
  "\u9CCD",
  "\u8E44",
  "\u987B",
  "\u6BDB",
  "\u76AE",
  "\u89D2",
  "\u722A",
  "\u7FC5",
  "\u7FBD"
];
var mythic$1 = [
  "\u706B",
  "\u708E",
  "\u7130",
  "\u96F7",
  "\u7535",
  "\u51B0"
];
var exotic$1 = [
  "\u7CBE",
  "\u9B42",
  "\u9B44"
];
var material = {
  common: common$1,
  uncommon: uncommon$1,
  rare: rare$1,
  epic: epic$1,
  legendary: legendary$1,
  mythic: mythic$1,
  exotic: exotic$1
};
var broken$1 = [
  "\u7834\u635F",
  "\u6C61\u635F"
];
var handmade$1 = [
  "\u6B8B\u7834",
  "\u7F3A\u635F"
];
var materialPostfix = {
  broken: broken$1,
  handmade: handmade$1
};
Object.values(materialPostfix).flat(1);
Object.values(material).flat(1);
var _kAge1 = "\u767E\u5E74";
var _kAge10 = "\u5343\u5E74";
var _kAge100 = "\u4E07\u5E74";
var _kParenthesisLeft = "\uFF08";
var _kParenthesisRight = "\uFF09";
function getMaterial(number2, options) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = "";
    var age = "";
    var pre = common$2[Math.floor(Math.random() * common$2.length)];
    var c = colorPrefix[Math.floor(Math.random() * colorPrefix.length)];
    var s2 = spiritPrefix[Math.floor(Math.random() * spiritPrefix.length)];
    var k = options === null || options === void 0 ? void 0 : options.kind;
    var r = (options === null || options === void 0 ? void 0 : options.rarity) || _getRarity(rarityValues.uncommon).rarity;
    if (r == "exotic") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], material.exotic, true), material.mythic, true), material.legendary, true), material.epic, true), material.rare, true), material.uncommon, true), material.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      age = _kAge100;
      name_1 = age + pre + c + s2 + k;
    } else if (r == "mythic") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], material.mythic, true), material.legendary, true), material.epic, true), material.rare, true), material.uncommon, true), material.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      age = _kAge10;
      name_1 = age + pre + c + s2 + k;
    } else if (r == "legendary") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], material.legendary, true), material.epic, true), material.rare, true), material.uncommon, true), material.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      age = _kAge1;
      name_1 = age + pre + c + s2 + k;
    } else if (r == "epic") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], material.epic, true), material.rare, true), material.uncommon, true), material.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = pre + c + s2 + k;
    } else if (r == "rare") {
      var t2 = __spreadArray(__spreadArray(__spreadArray([], material.rare, true), material.uncommon, true), material.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = pre + s2 + k;
    } else if (r == "uncommon") {
      var t2 = __spreadArray(__spreadArray([], material.uncommon, true), material.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = c + s2 + k;
    } else if (r == "common") {
      k !== null && k !== void 0 ? k : k = material.common[Math.floor(Math.random() * material.common.length)];
      name_1 = c + k;
    }
    var post = (options === null || options === void 0 ? void 0 : options.postfix) || "";
    if (!post) {
      var r1 = Math.random();
      var r2 = Math.random();
      if (r1 < rarityValues.rare && r2 < rarityValues.rare) {
        post = _kParenthesisLeft + materialPostfix.broken[Math.floor(Math.random() * materialPostfix.broken.length)] + _kParenthesisRight;
      } else if (r1 < rarityValues.uncommon && r2 < rarityValues.uncommon) {
        post = _kParenthesisLeft + materialPostfix.handmade[Math.floor(Math.random() * materialPostfix.handmade.length)] + _kParenthesisRight;
      }
    } else {
      post = _kParenthesisLeft + post + _kParenthesisRight;
    }
    names2.push({ name: name_1 + post, rarity: r });
  }
  return names2;
}
var alchemy = [
  "\u4E39",
  "\u4E38",
  "\u6563",
  "\u836F",
  "\u5242",
  "\u6C64",
  "\u996E",
  "\u8336",
  "\u9152"
];
var commonAlchemyNames = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], commonNames.dao, true), commonNames.element, true), commonNames.color, true), commonNames.number, true), commonNames.action, true);
function getAlchemy(number2, kind) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var rarity = "common";
    var pre = commonAlchemyNames[Math.floor(Math.random() * commonAlchemyNames.length)];
    var s2 = "";
    var r = _getRarity();
    if (r.value < rarityValues.rare) {
      s2 = spiritPrefix[Math.floor(Math.random() * spiritPrefix.length)];
    }
    rarity = r.rarity;
    var k = kind || "";
    if (!kind) {
      k = alchemy[Math.floor(Math.random() * alchemy.length)];
    }
    names2.push({ name: pre + s2 + k, rarity });
  }
  return names2;
}
var talismanMaterial = [
  "\u91D1",
  "\u94F6",
  "\u94C1",
  "\u6728",
  "\u7AF9",
  "\u77F3",
  "\u7389",
  "\u9AA8",
  "\u7409\u7483",
  "\u6C34\u6676"
];
var broken = [
  "\u672A\u5B8C\u6210",
  "\u6B21\u54C1",
  "\u7834\u635F"
];
var handmade = [
  "\u4EFF\u5236\u54C1",
  "\u8D5D\u54C1"
];
var talismanPostfix = {
  broken,
  handmade
};
var common = [
  "\u5200",
  "\u5251",
  "\u67AA",
  "\u68CD",
  "\u5F13",
  "\u77DB",
  "\u65A7",
  "\u9524",
  "\u5F29",
  "\u97AD",
  "\u621F",
  "\u6208",
  "\u73AF",
  "\u94A9",
  "\u523A",
  "\u722A",
  "\u9488",
  "\u9489",
  "\u9556",
  "\u76FE",
  "\u8863",
  "\u7532"
];
var uncommon = [
  "\u7D22",
  "\u94FE",
  "\u7F51",
  "\u9501",
  "\u6247",
  "\u7F69",
  "\u4F1E",
  "\u9F13",
  "\u7434",
  "\u9AB0",
  "\u888B",
  "\u949F",
  "\u68AD",
  "\u724C",
  "\u76D8",
  "\u5370",
  "\u73BA",
  "\u846B\u82A6"
];
var rare = [
  "\u65D7",
  "\u5C3A",
  "\u73E0",
  "\u7EEB",
  "\u956F",
  "\u6212",
  "\u7B80"
];
var epic = [
  "\u94C3",
  "\u955C",
  "\u74F6",
  "\u56FE",
  "\u8F6E",
  "\u5E61"
];
var legendary = [
  "\u7891",
  "\u9F0E",
  "\u5854",
  "\u4EAD",
  "\u821F",
  "\u8F66"
];
var mythic = [
  "\u76EE",
  "\u773C",
  "\u775B",
  "\u7259",
  "\u89D2",
  "\u722A",
  "\u9CDE",
  "\u7FC5",
  "\u7FBD"
];
var exotic = [
  "\u96F7",
  "\u7535",
  "\u706B",
  "\u708E",
  "\u7130",
  "\u5C71",
  "\u5CF0",
  "\u77F3",
  "\u6676",
  "\u7802",
  "\u51B0",
  "\u6C34",
  "\u9B42"
];
var talisman = {
  common,
  uncommon,
  rare,
  epic,
  legendary,
  mythic,
  exotic
};
Object.values(talisman).flat(1);
Object.values(talismanPostfix).flat(1);
function getTalisman(number2, options) {
  var _a;
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = "";
    var prefix = common$2[Math.floor(Math.random() * common$2.length)];
    var c = colorPrefix[Math.floor(Math.random() * colorPrefix.length)];
    var m = talismanMaterial[Math.floor(Math.random() * talismanMaterial.length)];
    var s2 = spiritPrefix[Math.floor(Math.random() * spiritPrefix.length)];
    var k = options === null || options === void 0 ? void 0 : options.kind;
    var r = (_a = options === null || options === void 0 ? void 0 : options.rarity) !== null && _a !== void 0 ? _a : _getRarity(rarityValues.uncommon).rarity;
    if (r == "exotic") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], talisman.exotic, true), talisman.mythic, true), talisman.legendary, true), talisman.epic, true), talisman.rare, true), talisman.uncommon, true), talisman.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = prefix + s2 + k;
    } else if (r == "mythic") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], talisman.mythic, true), talisman.legendary, true), talisman.epic, true), talisman.rare, true), talisman.uncommon, true), talisman.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = prefix + s2 + k;
    } else if (r == "legendary") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], talisman.legendary, true), talisman.epic, true), talisman.rare, true), talisman.uncommon, true), talisman.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = prefix + c + m + k;
    } else if (r == "epic") {
      var t2 = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], talisman.epic, true), talisman.rare, true), talisman.uncommon, true), talisman.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = prefix + m + k;
    } else if (r == "rare") {
      var t2 = __spreadArray(__spreadArray(__spreadArray([], talisman.rare, true), talisman.uncommon, true), talisman.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = prefix + k;
    } else if (r == "uncommon") {
      var t2 = __spreadArray(__spreadArray([], talisman.uncommon, true), talisman.common, true);
      k !== null && k !== void 0 ? k : k = t2[Math.floor(Math.random() * t2.length)];
      name_1 = c + m + k;
    } else if (r == "common") {
      k !== null && k !== void 0 ? k : k = talisman.common[Math.floor(Math.random() * talisman.common.length)];
      name_1 = m + k;
    }
    var post = (options === null || options === void 0 ? void 0 : options.postfix) || "";
    if (!post) {
      var r1 = Math.random();
      var r2 = Math.random();
      if (r1 < rarityValues.rare && r2 < rarityValues.rare) {
        post = _kParenthesisLeft$2 + talismanPostfix.broken[Math.floor(Math.random() * talismanPostfix.broken.length)] + _kParenthesisRight$2;
      } else if (r1 < rarityValues.uncommon && r2 < rarityValues.uncommon) {
        post = _kParenthesisLeft$2 + talismanPostfix.handmade[Math.floor(Math.random() * talismanPostfix.handmade.length)] + _kParenthesisRight$2;
      }
    } else {
      post = _kParenthesisLeft$2 + post + _kParenthesisRight$2;
    }
    names2.push({ name: name_1 + post, rarity: r });
  }
  return names2;
}
var plant = [
  "\u6728",
  "\u6811",
  "\u8349",
  "\u82D4",
  "\u7AF9",
  "\u53C2",
  "\u829D",
  "\u82B1",
  "\u68D8",
  "\u8346",
  "\u85E4"
];
var worm = [
  "\u9F99",
  "\u86DF",
  "\u866B",
  "\u86D9",
  "\u8695",
  "\u86FE",
  "\u8776",
  "\u86E4",
  "\u8774\u8776",
  "\u86E4\u87C6",
  "\u86AF\u8693"
];
var fish = [
  "\u9C7C",
  "\u9CB8",
  "\u8C5A"
];
var beast = [
  "\u517D",
  "\u7334",
  "\u733F",
  "\u9A6C",
  "\u725B",
  "\u732A",
  "\u7F8A",
  "\u9E7F",
  "\u732B",
  "\u72EE",
  "\u864E",
  "\u72FC",
  "\u72D7",
  "\u718A",
  "\u8C79",
  "\u72D0",
  "\u9F20",
  "\u5154",
  "\u72F8",
  "\u7280",
  "\u9B48",
  "\u9E92\u9E9F",
  "\u8C94\u8C85",
  "\u72FB\u730A",
  "\u72F8\u732B",
  "\u7280\u725B",
  "\u731E\u7301",
  "\u72B0\u72F3"
];
var bird = [
  "\u9E1F",
  "\u96D5",
  "\u9E70",
  "\u9E64",
  "\u71D5",
  "\u96C0",
  "\u9E26",
  "\u9E21",
  "\u51E4",
  "\u9E20",
  "\u9E45",
  "\u9E66",
  "\u8760",
  "\u51E4\u51F0",
  "\u5B54\u96C0",
  "\u9D1B\u9D26",
  "\u5929\u9E45",
  "\u9E67\u9E2A",
  "\u9E4C\u9E51",
  "\u9E48\u9E55",
  "\u9E2C\u9E5A",
  "\u9E66\u9E49",
  "\u8759\u8760"
];
var reptile = [
  "\u9F9F",
  "\u9CC4",
  "\u9CCC",
  "\u86C7",
  "\u8725",
  "\u8725\u8734",
  "\u877E\u8788"
];
var insect = [
  "\u866B",
  "\u874E",
  "\u8702",
  "\u87F9",
  "\u86A3",
  "\u8782",
  "\u8783\u87F9",
  "\u8708\u86A3",
  "\u87B3\u8782"
];
var creature = {
  plant,
  worm,
  fish,
  beast,
  bird,
  reptile,
  insect
};
var creaturePrefix = [
  "\u91CE",
  "\u53E4",
  "\u7384",
  "\u7075",
  "\u4ED9",
  "\u9B54",
  "\u795E",
  "\u9B3C"
];
var strangeCreature = [
  "\u50B2\u56E0",
  "\u6BD5\u65B9",
  "\u5E76\u5C01",
  "\u72F4\u72B4",
  "\u5632\u98CE",
  "\u8D64\u9C6C",
  "\u957F\u53F3",
  "\u4E58\u9EC4",
  "\u91CD\u660E\u9E1F",
  "\u62C5\u751F",
  "\u5E1D\u6C5F",
  "\u5200\u52B3\u9B3C",
  "\u5F53\u5EB7",
  "\u5C01\u8C68",
  "\u98CE\u72F8",
  "\u592B\u8BF8",
  "\u98DE\u8BDE\u9E1F",
  "\u80A5\u9057",
  "\u98DE\u5EC9",
  "\u59D1\u83B7\u9E1F",
  "\u5B70\u80E1",
  "\u8679\u873A",
  "\u8C6A\u5F58",
  "\u4F55\u7F57\u9C7C",
  "\u542B\u5229",
  "\u5409\u91CF",
  "\u8BA1\u8499",
  "\u94A6\u539F",
  "\u5F00\u660E\u517D",
  "\u87AD\u543B",
  "\u9F99\u4F2F",
  "\u5189\u9057\u9C7C",
  "\u7F57\u7F57\u9E1F",
  "\u87AD\u9996",
  "\u86EE\u86EE\u9E1F",
  "\u7A77\u5947",
  "\u68BC\u674C",
  "\u736C\u8C78",
  "\u5914\u725B",
  "\u706D\u8499",
  "\u5F53\u6248",
  "\u89D2\u7AEF",
  "\u9646\u543E",
  "\u6731\u538C",
  "\u7978\u6597",
  "\u8BF8\u728D",
  "\u767D\u6CFD\u517D",
  "\u592B\u8BF8",
  "\u4E58\u9EC4",
  "\u7330\u8C90",
  "\u5C4F\u84EC",
  "\u76F8\u67F3",
  "\u72CD\u9E2E",
  "\u7280\u6E20",
  "\u5374\u706B\u96C0",
  "\u5F6D\u4FAF",
  "\u5374\u5C18\u7280",
  "\u5E86\u5FCC",
  "\u77BF\u5982",
  "\u65E5\u53CA",
  "\u5C1A\u4ED8",
  "\u86CA\u96D5",
  "\u72CC\u72CC",
  "\u9A7A\u865E",
  "\u65E0\u652F\u7941",
  "\u6587\u9CD0\u9C7C",
  "\u72D9\u5982",
  "\u6731\u538C",
  "\u7F57\u777A",
  "\u8513\u91D1\u82D4",
  "\u6D1E\u51A5\u8349",
  "\u795D\u9980\u8349",
  "\u8FF7\u6996\u6811",
  "\u767D\u44D8\u6728",
  "\u8406\u8354\u8349",
  "\u6587\u830E\u6728",
  "\u68D5\u6960\u6811",
  "\u9EC4\u96DA\u8349",
  "\u84C7\u84C9\u8349",
  "\u675C\u8861\u8349",
  "\u65E0\u6761\u8349",
  "\u6C99\u68E0\u6728",
  "\u96D5\u68E0\u6728",
  "\u8476\u82E7\u8349"
];
var commonCreatureNames = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], commonNames.dao, true), commonNames.element, true), commonNames.thing, true), commonNames.color, true), commonNames.number, true), commonNames.action, true);
function getCreature(number2, options) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = "";
    var pre = commonCreatureNames[Math.floor(Math.random() * commonCreatureNames.length)];
    var c = colorPrefix[Math.floor(Math.random() * colorPrefix.length)];
    var s2 = creaturePrefix[Math.floor(Math.random() * creaturePrefix.length)];
    var cat = options === null || options === void 0 ? void 0 : options.category;
    var k = "";
    if (!cat) {
      cat = creatureCategory[Math.floor(Math.random() * creatureCategory.length)];
    }
    k = creature[cat][Math.floor(Math.random() * creature[cat].length)];
    var r = (options === null || options === void 0 ? void 0 : options.rarity) || _getRarity(rarityValues.uncommon).rarity;
    if (r == "exotic") {
      name_1 = strangeCreature[Math.floor(Math.random() * strangeCreature.length)];
    } else if (r == "mythic") {
      name_1 = pre + c + s2 + k;
    } else if (r == "legendary") {
      name_1 = pre + s2 + k;
    } else if (r == "epic") {
      name_1 = pre + c + k;
    } else if (r == "rare") {
      name_1 = pre + k;
    } else if (r == "uncommon") {
      name_1 = c + s2 + k;
    } else if (r == "common") {
      name_1 = c + k;
    }
    names2.push({ name: name_1, rarity: r, category: cat });
  }
  return names2;
}
var clan = [
  "\u95E8",
  "\u5B97",
  "\u6D3E",
  "\u6559",
  "\u5E2E",
  "\u76DF",
  "\u4F1A",
  "\u793E",
  "\u515A",
  "\u9601",
  "\u5239",
  "\u5E99",
  "\u5EB5",
  "\u697C",
  "\u623F",
  "\u89C2",
  "\u5BAB",
  "\u5BFA",
  "\u5E9C",
  "\u9662",
  "\u5802",
  "\u575E",
  "\u574A",
  "\u8F69",
  "\u82D1",
  "\u658B",
  "\u6BBF",
  "\u57CE",
  "\u5821",
  "\u6751",
  "\u5E84",
  "\u5BE8",
  "\u5C71",
  "\u5CF0",
  "\u5D16",
  "\u8C37",
  "\u6D1E",
  "\u5C9B",
  "\u5854",
  "\u72F1",
  "\u65D7",
  "\u9053",
  "\u4E16\u5BB6",
  "\u5C71\u5E84",
  "\u4E66\u9662",
  "\u5BA2\u6808",
  "\u5251\u6D3E",
  "\u795E\u6559"
];
var nation = [
  "\u56FD",
  "\u65CF",
  "\u90E8\u843D",
  "\u8054\u76DF"
];
function getClan(number2, kind) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = common$2[Math.floor(Math.random() * common$2.length)];
    var k = kind;
    if (!k) {
      k = clan[Math.floor(Math.random() * clan.length)];
    }
    names2.push(name_1 + k);
  }
  return names2;
}
var location = [
  "\u5DDE",
  "\u53BF",
  "\u5E02",
  "\u90E1",
  "\u4E61",
  "\u9053",
  "\u5E9C",
  "\u57CE",
  "\u5821",
  "\u9547",
  "\u6751",
  "\u5E84",
  "\u9A7F",
  "\u8425",
  "\u5BE8",
  "\u5C71",
  "\u5CF0",
  "\u5CAD",
  "\u576A",
  "\u5D16",
  "\u8C37",
  "\u5C97",
  "\u6D1E",
  "\u5DDD",
  "\u5761",
  "\u89C2",
  "\u5BFA",
  "\u5BAB",
  "\u539F",
  "\u5C9B",
  "\u5C7F",
  "\u6E1A",
  "\u6C40",
  "\u6E7E",
  "\u6E2F",
  "\u6E21",
  "\u6D25",
  "\u575E",
  "\u5173",
  "\u6797",
  "\u6E56",
  "\u6F6D",
  "\u6C60",
  "\u6CCA",
  "\u6CFD",
  "\u6CB3",
  "\u6D77",
  "\u6C5F",
  "\u6C34"
];
var place = [
  "\u666F",
  "\u845B",
  "\u5C90",
  "\u5386",
  "\u6587",
  "\u5CB7",
  "\u6DBF",
  "\u76C2",
  "\u5D02",
  "\u7533",
  "\u83B1",
  "\u6E24",
  "\u5937",
  "\u7FBD",
  "\u9752",
  "\u6210",
  "\u6E2D",
  "\u7AF9",
  "\u6D6E",
  "\u82F1",
  "\u65F6",
  "\u54B8",
  "\u9C9C",
  "\u5355",
  "\u96CD",
  "\u701B",
  "\u82D7",
  "\u72C4",
  "\u708E",
  "\u7384",
  "\u957F",
  "\u5143",
  "\u664B",
  "\u8D8A",
  "\u71D5",
  "\u84DF",
  "\u5B89",
  "\u5B9A",
  "\u8679",
  "\u6D66",
  "\u4E07",
  "\u6714",
  "\u5174",
  "\u5BBF",
  "\u4EB3",
  "\u6C60",
  "\u5BA3",
  "\u798F",
  "\u6CC9",
  "\u5FB7",
  "\u5B81",
  "\u666F",
  "\u5409",
  "\u629A",
  "\u6D4E",
  "\u6CF0",
  "\u804A",
  "\u6EE8",
  "\u7126",
  "\u9102",
  "\u968F",
  "\u5E38",
  "\u6DEE",
  "\u60E0",
  "\u6885",
  "\u6F6E",
  "\u67F3",
  "\u94A6",
  "\u8D3A",
  "\u743C",
  "\u6CF8",
  "\u4E50",
  "\u7709",
  "\u4E3D",
  "\u5E86",
  "\u590F",
  "\u683E",
  "\u5E7F",
  "\u6EE1",
  "\u6DBF",
  "\u96C4",
  "\u987A",
  "\u6613",
  "\u5BB9",
  "\u8D64",
  "\u4E30",
  "\u5E7F",
  "\u56FA",
  "\u5180",
  "\u5E73",
  "\u4E91",
  "\u7075",
  "\u6F5E",
  "\u6EC1",
  "\u9738",
  "\u5E94",
  "\u6D2A",
  "\u84B2",
  "\u4EA4",
  "\u5C9A",
  "\u626C",
  "\u8346",
  "\u51C9",
  "\u76CA",
  "\u5E7D",
  "\u5E76",
  "\u8944",
  "\u6C38",
  "\u8FBD",
  "\u5DF4",
  "\u6E05",
  "\u660E",
  "\u4E49",
  "\u6881",
  "\u4FE1"
];
var placePostfix = [
  "\u9634",
  "\u9633",
  "\u4E1C",
  "\u897F",
  "\u5357",
  "\u5317",
  "\u4E2D",
  "\u5B89",
  "\u5E73",
  "\u660C",
  "\u5B81",
  "\u5E86"
];
var placePrefix = [
  "\u524D",
  "\u540E",
  "\u4E0A",
  "\u4E0B",
  "\u5927",
  "\u5C0F",
  "\u5185",
  "\u5916",
  "\u5DE6",
  "\u53F3",
  "\u4E34",
  "\u671B",
  "\u6B63",
  "\u4E1C",
  "\u897F",
  "\u5357",
  "\u5317",
  "\u4E2D"
];
var water = [
  "\u6D77",
  "\u6D0B"
];
var land = [
  "\u6D32",
  "\u5927\u9646"
];
var zone = {
  water,
  land,
  "void": [
    "\u57DF",
    "\u5883",
    "\u5929",
    "\u754C"
  ]
};
Object.values(zone).flat(1);
var _kContry = "\u56FD";
function getNation(number2, kind) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = "";
    var k = kind !== null && kind !== void 0 ? kind : "";
    var rarity = "common";
    var r = Math.random();
    if (r < rarityValues.rare) {
      name_1 = strangeNames[Math.floor(Math.random() * strangeNames.length)];
      rarity = "rare";
      if (!kind) {
        if (name_1.length == 1) {
          k = _kContry;
        } else {
          k = nation[Math.floor(Math.random() * nation.length)];
        }
      }
    } else if (r < rarityValues.uncommon) {
      name_1 = common$2[Math.floor(Math.random() * common$2.length)];
      rarity = "uncommon";
      if (!kind) {
        if (name_1.length == 1) {
          k = _kContry;
        } else {
          k = nation[Math.floor(Math.random() * nation.length)];
        }
      }
    } else {
      var prefix = "";
      if (Math.random() < rarityValues.rare) {
        prefix = placePrefix[Math.floor(Math.random() * placePrefix.length)];
      }
      name_1 = prefix + place[Math.floor(Math.random() * place.length)];
      if (!kind) {
        k = _kContry;
      }
    }
    names2.push({ name: name_1 + k, rarity });
  }
  return names2;
}
function getLocation(number2, kind) {
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = "";
    var k = kind !== null && kind !== void 0 ? kind : "";
    var rarity = "common";
    var r = Math.random();
    if (r < rarityValues.rare) {
      name_1 = strangeNames[Math.floor(Math.random() * strangeNames.length)];
      rarity = "rare";
    } else if (r < rarityValues.uncommon) {
      name_1 = common$2[Math.floor(Math.random() * common$2.length)];
      rarity = "uncommon";
    } else {
      var placeIndex = Math.floor(Math.random() * place.length);
      var postfix = "";
      if (Math.random() < rarityValues.uncommon) {
        var postfixIndex = Math.floor(Math.random() * placePostfix.length);
        postfix = placePostfix[postfixIndex];
      }
      name_1 = place[placeIndex] + postfix;
    }
    if (!kind) {
      k = location[Math.floor(Math.random() * location.length)];
    }
    names2.push({ name: name_1 + k, rarity });
  }
  return names2;
}
var _kLinkWord = "\u4E4B";
function getZone(number2, options) {
  var _a;
  var names2 = [];
  for (var i = 0; i < number2; ++i) {
    var name_1 = "";
    var k = (_a = options === null || options === void 0 ? void 0 : options.kind) !== null && _a !== void 0 ? _a : getZoneKind(options === null || options === void 0 ? void 0 : options.category);
    var rarity = "common";
    var r = Math.random();
    if (r < rarityValues.rare) {
      name_1 = strangeNames[Math.floor(Math.random() * strangeNames.length)];
      rarity = "rare";
    } else if (r < rarityValues.uncommon) {
      name_1 = common$2[Math.floor(Math.random() * common$2.length)];
      rarity = "uncommon";
    } else {
      var prefix = "";
      if (Math.random() < rarityValues.rare) {
        prefix = placePrefix[Math.floor(Math.random() * placePrefix.length)];
      }
      name_1 = prefix + place[Math.floor(Math.random() * place.length)];
      if (name_1.length == 1) {
        if (k.length > 1) {
          name_1 += _kLinkWord;
        } else {
          if (Math.random() < rarityValues.rare) {
            name_1 += _kLinkWord;
          }
        }
      }
    }
    names2.push({ name: name_1 + k, rarity });
  }
  return names2;
}
function getZoneKind(category) {
  category !== null && category !== void 0 ? category : category = zoneCategories[Math.floor(Math.random() * zoneCategories.length)];
  var group = zone[category];
  return group[Math.floor(Math.random() * group.length)];
}
exports._export_sfc = _export_sfc;
exports.createPinia = createPinia;
exports.createSSRApp = createSSRApp;
exports.defineComponent = defineComponent;
exports.defineStore = defineStore;
exports.e = e;
exports.f = f;
exports.getAlchemy = getAlchemy;
exports.getBook = getBook;
exports.getClan = getClan;
exports.getCreature = getCreature;
exports.getDao = getDao;
exports.getLocation = getLocation;
exports.getMaterial = getMaterial;
exports.getName = getName;
exports.getNation = getNation;
exports.getSkill = getSkill;
exports.getTalisman = getTalisman;
exports.getZone = getZone;
exports.index = index;
exports.n = n;
exports.numberOptions = numberOptions;
exports.o = o;
exports.onHide = onHide;
exports.onLaunch = onLaunch;
exports.onShow = onShow;
exports.p = p;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.sexOptions = sexOptions;
exports.t = t;
exports.unref = unref;
