/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/homePage.js":
/*!*************************!*\
  !*** ./src/homePage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createContent)
/* harmony export */ });
function createContent(container) {
	const logo = document.createElement('img');
	logo.classList.add('logo');
	logo.src = 'https://source.unsplash.com/1600x300/?food';
	container.appendChild(logo);

	const headline = document.createElement('h1');
	headline.classList.add('headline');
	headline.textContent =
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex iste!';
	container.appendChild(headline);

	const descr = document.createElement('p');
	descr.classList.add('description');
	descr.textContent =
		'Lorem ipsum dolor sit amet consectetur, adipisicing elit.  Nostrum maxime numquam nobis quae sed amet vitae tenetur   provident iste repudiandae.';
	container.appendChild(descr);
}


/***/ }),

/***/ "./node_modules/@iconify/iconify/dist/iconify.mjs":
/*!********************************************************!*\
  !*** ./node_modules/@iconify/iconify/dist/iconify.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_api": () => (/* binding */ _api),
/* harmony export */   "addAPIProvider": () => (/* binding */ addAPIProvider),
/* harmony export */   "addCollection": () => (/* binding */ addCollection),
/* harmony export */   "addIcon": () => (/* binding */ addIcon),
/* harmony export */   "buildIcon": () => (/* binding */ buildIcon),
/* harmony export */   "calculateSize": () => (/* binding */ calculateSize),
/* harmony export */   "default": () => (/* binding */ Iconify),
/* harmony export */   "disableCache": () => (/* binding */ disableCache),
/* harmony export */   "enableCache": () => (/* binding */ enableCache),
/* harmony export */   "getIcon": () => (/* binding */ getIcon),
/* harmony export */   "getVersion": () => (/* binding */ getVersion),
/* harmony export */   "iconExists": () => (/* binding */ iconExists),
/* harmony export */   "listIcons": () => (/* binding */ listIcons),
/* harmony export */   "loadIcon": () => (/* binding */ loadIcon),
/* harmony export */   "loadIcons": () => (/* binding */ loadIcons),
/* harmony export */   "observe": () => (/* binding */ observe),
/* harmony export */   "pauseObserver": () => (/* binding */ pauseObserver),
/* harmony export */   "renderHTML": () => (/* binding */ renderHTML),
/* harmony export */   "renderIcon": () => (/* binding */ renderIcon),
/* harmony export */   "renderSVG": () => (/* binding */ renderSVG),
/* harmony export */   "replaceIDs": () => (/* binding */ replaceIDs),
/* harmony export */   "resumeObserver": () => (/* binding */ resumeObserver),
/* harmony export */   "scan": () => (/* binding */ scan),
/* harmony export */   "shareStorage": () => (/* binding */ shareStorage),
/* harmony export */   "stopObserving": () => (/* binding */ stopObserving)
/* harmony export */ });
/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt or license.gpl.txt
* files at https://github.com/iconify/iconify
*
* Licensed under Apache 2.0 or GPL 2.0 at your option.
* If derivative product is not compatible with one of licenses, you can pick one of licenses.
*
* @license Apache 2.0
* @license GPL 2.0
* @version 2.2.1
*/
const matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const iconDefaults = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16,
  rotate: 0,
  vFlip: false,
  hFlip: false
});
function fullIcon(data) {
  return { ...iconDefaults, ...data };
}

function mergeIconData(icon, alias) {
  const result = { ...icon };
  for (const key in iconDefaults) {
    const prop = key;
    if (alias[prop] !== void 0) {
      const value = alias[prop];
      if (result[prop] === void 0) {
        result[prop] = value;
        continue;
      }
      switch (prop) {
        case "rotate":
          result[prop] = (result[prop] + value) % 4;
          break;
        case "hFlip":
        case "vFlip":
          result[prop] = value !== result[prop];
          break;
        default:
          result[prop] = value;
      }
    }
  }
  return result;
}

function getIconData$1(data, name, full = false) {
  function getIcon(name2, iteration) {
    if (data.icons[name2] !== void 0) {
      return Object.assign({}, data.icons[name2]);
    }
    if (iteration > 5) {
      return null;
    }
    const aliases = data.aliases;
    if (aliases && aliases[name2] !== void 0) {
      const item = aliases[name2];
      const result2 = getIcon(item.parent, iteration + 1);
      if (result2) {
        return mergeIconData(result2, item);
      }
      return result2;
    }
    const chars = data.chars;
    if (!iteration && chars && chars[name2] !== void 0) {
      return getIcon(chars[name2], iteration + 1);
    }
    return null;
  }
  const result = getIcon(name, 0);
  if (result) {
    for (const key in iconDefaults) {
      if (result[key] === void 0 && data[key] !== void 0) {
        result[key] = data[key];
      }
    }
  }
  return result && full ? fullIcon(result) : result;
}

function isVariation(item) {
  for (const key in iconDefaults) {
    if (item[key] !== void 0) {
      return true;
    }
  }
  return false;
}
function parseIconSet(data, callback, options) {
  options = options || {};
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const icons = data.icons;
  Object.keys(icons).forEach((name) => {
    const iconData = getIconData$1(data, name, true);
    if (iconData) {
      callback(name, iconData);
      names.push(name);
    }
  });
  const parseAliases = options.aliases || "all";
  if (parseAliases !== "none" && typeof data.aliases === "object") {
    const aliases = data.aliases;
    Object.keys(aliases).forEach((name) => {
      if (parseAliases === "variations" && isVariation(aliases[name])) {
        return;
      }
      const iconData = getIconData$1(data, name, true);
      if (iconData) {
        callback(name, iconData);
        names.push(name);
      }
    });
  }
  return names;
}

const optionalProperties = {
  provider: "string",
  aliases: "object",
  not_found: "object"
};
for (const prop in iconDefaults) {
  optionalProperties[prop] = typeof iconDefaults[prop];
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  for (const prop in optionalProperties) {
    if (obj[prop] !== void 0 && typeof obj[prop] !== optionalProperties[prop]) {
      return null;
    }
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchName) || typeof icon.body !== "string") {
      return null;
    }
    for (const prop in iconDefaults) {
      if (icon[prop] !== void 0 && typeof icon[prop] !== typeof iconDefaults[prop]) {
        return null;
      }
    }
  }
  const aliases = data.aliases;
  if (aliases) {
    for (const name in aliases) {
      const icon = aliases[name];
      const parent = icon.parent;
      if (!name.match(matchName) || typeof parent !== "string" || !icons[parent] && !aliases[parent]) {
        return null;
      }
      for (const prop in iconDefaults) {
        if (icon[prop] !== void 0 && typeof icon[prop] !== typeof iconDefaults[prop]) {
          return null;
        }
      }
    }
  }
  return data;
}

const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIcon(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIcon(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIcon(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIcon = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchName)) && icon.name.match(matchName));
};

const storageVersion = 1;
let storage$1 = /* @__PURE__ */ Object.create(null);
try {
  const w = window || self;
  if (w && w._iconifyStorage.version === storageVersion) {
    storage$1 = w._iconifyStorage.storage;
  }
} catch (err) {
}
function shareStorage() {
  try {
    const w = window || self;
    if (w && !w._iconifyStorage) {
      w._iconifyStorage = {
        version: storageVersion,
        storage: storage$1
      };
    }
  } catch (err) {
  }
}
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ Object.create(null)
  };
}
function getStorage(provider, prefix) {
  if (storage$1[provider] === void 0) {
    storage$1[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerStorage = storage$1[provider];
  if (providerStorage[prefix] === void 0) {
    providerStorage[prefix] = newStorage(provider, prefix);
  }
  return providerStorage[prefix];
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  const t = Date.now();
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing[name] = t;
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = Object.freeze(fullIcon(icon));
      return true;
    }
  } catch (err) {
  }
  return false;
}
function getIconFromStorage(storage2, name) {
  const value = storage2.icons[name];
  return value === void 0 ? null : value;
}
function listIcons(provider, prefix) {
  let allIcons = [];
  let providers;
  if (typeof provider === "string") {
    providers = [provider];
  } else {
    providers = Object.keys(storage$1);
  }
  providers.forEach((provider2) => {
    let prefixes;
    if (typeof provider2 === "string" && typeof prefix === "string") {
      prefixes = [prefix];
    } else {
      prefixes = storage$1[provider2] === void 0 ? [] : Object.keys(storage$1[provider2]);
    }
    prefixes.forEach((prefix2) => {
      const storage2 = getStorage(provider2, prefix2);
      const icons = Object.keys(storage2.icons).map((name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name);
      allIcons = allIcons.concat(icons);
    });
  });
  return allIcons;
}

let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  return icon ? getIconFromStorage(getStorage(icon.provider, icon.prefix), icon.name) : null;
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = typeof data.provider === "string" ? data.provider : "";
  }
  if (simpleNames && provider === "" && (typeof data.prefix !== "string" || data.prefix === "")) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  if (typeof data.prefix !== "string" || !validateIcon({
    provider,
    prefix: data.prefix,
    name: "a"
  })) {
    return false;
  }
  const storage = getStorage(provider, data.prefix);
  return !!addIconSet(storage, data);
}
function iconExists(name) {
  return getIconData(name) !== null;
}
function getIcon(name) {
  const result = getIconData(name);
  return result ? { ...result } : null;
}

const defaults = Object.freeze({
  inline: false,
  width: null,
  height: null,
  hAlign: "center",
  vAlign: "middle",
  slice: false,
  hFlip: false,
  vFlip: false,
  rotate: 0
});
function mergeCustomisations(defaults2, item) {
  const result = {};
  for (const key in defaults2) {
    const attr = key;
    result[attr] = defaults2[attr];
    if (item[attr] === void 0) {
      continue;
    }
    const value = item[attr];
    switch (attr) {
      case "inline":
      case "slice":
        if (typeof value === "boolean") {
          result[attr] = value;
        }
        break;
      case "hFlip":
      case "vFlip":
        if (value === true) {
          result[attr] = !result[attr];
        }
        break;
      case "hAlign":
      case "vAlign":
        if (typeof value === "string" && value !== "") {
          result[attr] = value;
        }
        break;
      case "width":
      case "height":
        if (typeof value === "string" && value !== "" || typeof value === "number" && value || value === null) {
          result[attr] = value;
        }
        break;
      case "rotate":
        if (typeof value === "number") {
          result[attr] += value;
        }
        break;
    }
  }
  return result;
}

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision === void 0 ? 100 : precision;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

function preserveAspectRatio(props) {
  let result = "";
  switch (props.hAlign) {
    case "left":
      result += "xMin";
      break;
    case "right":
      result += "xMax";
      break;
    default:
      result += "xMid";
  }
  switch (props.vAlign) {
    case "top":
      result += "YMin";
      break;
    case "bottom":
      result += "YMax";
      break;
    default:
      result += "YMid";
  }
  result += props.slice ? " slice" : " meet";
  return result;
}
function iconToSVG(icon, customisations) {
  const box = {
    left: icon.left,
    top: icon.top,
    width: icon.width,
    height: icon.height
  };
  let body = icon.body;
  [icon, customisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== 0 || box.top !== 0) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  let width, height;
  if (customisations.width === null && customisations.height === null) {
    height = "1em";
    width = calculateSize(height, box.width / box.height);
  } else if (customisations.width !== null && customisations.height !== null) {
    width = customisations.width;
    height = customisations.height;
  } else if (customisations.height !== null) {
    height = customisations.height;
    width = calculateSize(height, box.width / box.height);
  } else {
    width = customisations.width;
    height = calculateSize(width, box.height / box.width);
  }
  if (width === "auto") {
    width = box.width;
  }
  if (height === "auto") {
    height = box.height;
  }
  width = typeof width === "string" ? width : width.toString() + "";
  height = typeof height === "string" ? height : height.toString() + "";
  const result = {
    attributes: {
      width,
      height,
      preserveAspectRatio: preserveAspectRatio(customisations),
      viewBox: box.left.toString() + " " + box.top.toString() + " " + box.width.toString() + " " + box.height.toString()
    },
    body
  };
  if (customisations.inline) {
    result.inline = true;
  }
  return result;
}

function buildIcon(icon, customisations) {
  return iconToSVG(fullIcon(icon), customisations ? mergeCustomisations(defaults, customisations) : defaults);
}

const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
  });
  return body;
}

const cacheVersion = "iconify2";
const cachePrefix = "iconify";
const countKey = cachePrefix + "-count";
const versionKey = cachePrefix + "-version";
const hour = 36e5;
const cacheExpiration = 168;
const config = {
  local: true,
  session: true
};
let loaded = false;
const count = {
  local: 0,
  session: 0
};
const emptyList = {
  local: [],
  session: []
};
let _window = typeof window === "undefined" ? {} : window;
function getGlobal(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  config[key] = false;
  return null;
}
function setCount(storage, key, value) {
  try {
    storage.setItem(countKey, value.toString());
    count[key] = value;
    return true;
  } catch (err) {
    return false;
  }
}
function getCount(storage) {
  const count2 = storage.getItem(countKey);
  if (count2) {
    const total = parseInt(count2);
    return total ? total : 0;
  }
  return 0;
}
function initCache(storage, key) {
  try {
    storage.setItem(versionKey, cacheVersion);
  } catch (err) {
  }
  setCount(storage, key, 0);
}
function destroyCache(storage) {
  try {
    const total = getCount(storage);
    for (let i = 0; i < total; i++) {
      storage.removeItem(cachePrefix + i.toString());
    }
  } catch (err) {
  }
}
const loadCache = () => {
  if (loaded) {
    return;
  }
  loaded = true;
  const minTime = Math.floor(Date.now() / hour) - cacheExpiration;
  function load(key) {
    const func = getGlobal(key);
    if (!func) {
      return;
    }
    const getItem = (index) => {
      const name = cachePrefix + index.toString();
      const item = func.getItem(name);
      if (typeof item !== "string") {
        return false;
      }
      let valid = true;
      try {
        const data = JSON.parse(item);
        if (typeof data !== "object" || typeof data.cached !== "number" || data.cached < minTime || typeof data.provider !== "string" || typeof data.data !== "object" || typeof data.data.prefix !== "string") {
          valid = false;
        } else {
          const provider = data.provider;
          const prefix = data.data.prefix;
          const storage = getStorage(provider, prefix);
          valid = addIconSet(storage, data.data).length > 0;
        }
      } catch (err) {
        valid = false;
      }
      if (!valid) {
        func.removeItem(name);
      }
      return valid;
    };
    try {
      const version = func.getItem(versionKey);
      if (version !== cacheVersion) {
        if (version) {
          destroyCache(func);
        }
        initCache(func, key);
        return;
      }
      let total = getCount(func);
      for (let i = total - 1; i >= 0; i--) {
        if (!getItem(i)) {
          if (i === total - 1) {
            total--;
          } else {
            emptyList[key].push(i);
          }
        }
      }
      setCount(func, key, total);
    } catch (err) {
    }
  }
  for (const key in config) {
    load(key);
  }
};
const storeCache = (provider, data) => {
  if (!loaded) {
    loadCache();
  }
  function store(key) {
    if (!config[key]) {
      return false;
    }
    const func = getGlobal(key);
    if (!func) {
      return false;
    }
    let index = emptyList[key].shift();
    if (index === void 0) {
      index = count[key];
      if (!setCount(func, key, index + 1)) {
        return false;
      }
    }
    try {
      const item = {
        cached: Math.floor(Date.now() / hour),
        provider,
        data
      };
      func.setItem(cachePrefix + index.toString(), JSON.stringify(item));
    } catch (err) {
      return false;
    }
    return true;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
};

const cache = {};

function toggleBrowserCache(storage, value) {
  switch (storage) {
    case "local":
    case "session":
      config[storage] = value;
      break;
    case "all":
      for (const key in config) {
        config[key] = value;
      }
      break;
  }
}

const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}

function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    resources,
    path: source.path === void 0 ? "/" : source.path,
    maxURL: source.maxURL ? source.maxURL : 500,
    rotate: source.rotate ? source.rotate : 750,
    timeout: source.timeout ? source.timeout : 5e3,
    random: source.random === true,
    index: source.index ? source.index : 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}

const mergeParams = (base, params) => {
  let result = base, hasParams = result.indexOf("?") !== -1;
  function paramToString(value) {
    switch (typeof value) {
      case "boolean":
        return value ? "true" : "false";
      case "number":
        return encodeURIComponent(value);
      case "string":
        return encodeURIComponent(value);
      default:
        throw new Error("Invalid parameter");
    }
  }
  Object.keys(params).forEach((key) => {
    let value;
    try {
      value = paramToString(params[key]);
    } catch (err) {
      return;
    }
    result += (hasParams ? "&" : "?") + encodeURIComponent(key) + "=" + value;
    hasParams = true;
  });
  return result;
};

const maxLengthCache = {};
const pathCache = {};
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
  return null;
};
let fetchModule = detectFetch();
function setFetch(fetch2) {
  fetchModule = fetch2;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = mergeParams(prefix + ".json", {
      icons: ""
    });
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  const cacheKey = provider + ":" + prefix;
  pathCache[provider] = config.path;
  maxLengthCache[cacheKey] = result;
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  let maxLength = maxLengthCache[prefix];
  if (maxLength === void 0) {
    maxLength = calculateMaxLength(provider, prefix);
  }
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    if (pathCache[provider] === void 0) {
      const config = getAPIConfig(provider);
      if (!config) {
        return "/";
      }
      pathCache[provider] = config.path;
    }
    return pathCache[provider];
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      path += mergeParams(prefix + ".json", {
        icons: iconsList
      });
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        callback("next", defaultError);
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};

function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    if (storage[provider] === void 0) {
      storage[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerStorage = storage[provider];
    if (providerStorage[prefix] === void 0) {
      providerStorage[prefix] = getStorage(provider, prefix);
    }
    const localStorage = providerStorage[prefix];
    let list;
    if (localStorage.icons[name] !== void 0) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing[name] !== void 0) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}

const callbacks = /* @__PURE__ */ Object.create(null);
const pendingUpdates = /* @__PURE__ */ Object.create(null);
function removeCallback(sources, id) {
  sources.forEach((source) => {
    const provider = source.provider;
    if (callbacks[provider] === void 0) {
      return;
    }
    const providerCallbacks = callbacks[provider];
    const prefix = source.prefix;
    const items = providerCallbacks[prefix];
    if (items) {
      providerCallbacks[prefix] = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(provider, prefix) {
  if (pendingUpdates[provider] === void 0) {
    pendingUpdates[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerPendingUpdates = pendingUpdates[provider];
  if (!providerPendingUpdates[prefix]) {
    providerPendingUpdates[prefix] = true;
    setTimeout(() => {
      providerPendingUpdates[prefix] = false;
      if (callbacks[provider] === void 0 || callbacks[provider][prefix] === void 0) {
        return;
      }
      const items = callbacks[provider][prefix].slice(0);
      if (!items.length) {
        return;
      }
      const storage = getStorage(provider, prefix);
      let hasPending = false;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage.icons[name] !== void 0) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage.missing[name] !== void 0) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([
              {
                provider,
                prefix
              }
            ], item.id);
          }
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (callbacks[provider] === void 0) {
      callbacks[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerCallbacks = callbacks[provider];
    if (providerCallbacks[prefix] === void 0) {
      providerCallbacks[prefix] = [];
    }
    providerCallbacks[prefix].push(item);
  });
  return abort;
}

function listToIcons(list, validate = true, simpleNames = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, false, simpleNames) : item;
    if (!validate || validateIcon(icon, simpleNames)) {
      result.push({
        provider: icon.provider,
        prefix: icon.prefix,
        name: icon.name
      });
    }
  });
  return result;
}

// src/config.ts
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};

// src/query.ts
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}

// src/index.ts
function setConfig(config) {
  if (typeof config !== "object" || typeof config.resources !== "object" || !(config.resources instanceof Array) || !config.resources.length) {
    throw new Error("Invalid Reduncancy configuration");
  }
  const newConfig = /* @__PURE__ */ Object.create(null);
  let key;
  for (key in defaultConfig) {
    if (config[key] !== void 0) {
      newConfig[key] = config[key];
    } else {
      newConfig[key] = defaultConfig[key];
    }
  }
  return newConfig;
}
function initRedundancy(cfg) {
  const config = setConfig(cfg);
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config, payload, queryCallback, (data, error) => {
      cleanup();
      if (doneCallback) {
        doneCallback(data, error);
      }
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    const result = queries.find((value) => {
      return callback(value);
    });
    return result !== void 0 ? result : null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}

function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (redundancyCache[provider] === void 0) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send = api.send;
      }
    }
  }
  if (!redundancy || !send) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send, callback)().abort;
}

function emptyCallback() {
}
const pendingIcons = /* @__PURE__ */ Object.create(null);
const iconsToLoad = /* @__PURE__ */ Object.create(null);
const loaderFlags = /* @__PURE__ */ Object.create(null);
const queueFlags = /* @__PURE__ */ Object.create(null);
function loadedNewIcons(provider, prefix) {
  if (loaderFlags[provider] === void 0) {
    loaderFlags[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerLoaderFlags = loaderFlags[provider];
  if (!providerLoaderFlags[prefix]) {
    providerLoaderFlags[prefix] = true;
    setTimeout(() => {
      providerLoaderFlags[prefix] = false;
      updateCallbacks(provider, prefix);
    });
  }
}
const errorsCache = /* @__PURE__ */ Object.create(null);
function loadNewIcons(provider, prefix, icons) {
  function err() {
    const key = (provider === "" ? "" : "@" + provider + ":") + prefix;
    const time = Math.floor(Date.now() / 6e4);
    if (errorsCache[key] < time) {
      errorsCache[key] = time;
      console.error('Unable to retrieve icons for "' + key + '" because API is not configured properly.');
    }
  }
  if (iconsToLoad[provider] === void 0) {
    iconsToLoad[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerIconsToLoad = iconsToLoad[provider];
  if (queueFlags[provider] === void 0) {
    queueFlags[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerQueueFlags = queueFlags[provider];
  if (pendingIcons[provider] === void 0) {
    pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerPendingIcons = pendingIcons[provider];
  if (providerIconsToLoad[prefix] === void 0) {
    providerIconsToLoad[prefix] = icons;
  } else {
    providerIconsToLoad[prefix] = providerIconsToLoad[prefix].concat(icons).sort();
  }
  if (!providerQueueFlags[prefix]) {
    providerQueueFlags[prefix] = true;
    setTimeout(() => {
      providerQueueFlags[prefix] = false;
      const icons2 = providerIconsToLoad[prefix];
      delete providerIconsToLoad[prefix];
      const api = getAPIModule(provider);
      if (!api) {
        err();
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data, error) => {
          const storage = getStorage(provider, prefix);
          if (typeof data !== "object") {
            if (error !== 404) {
              return;
            }
            const t = Date.now();
            item.icons.forEach((name) => {
              storage.missing[name] = t;
            });
          } else {
            try {
              const parsed = addIconSet(storage, data);
              if (!parsed.length) {
                return;
              }
              const pending = providerPendingIcons[prefix];
              parsed.forEach((name) => {
                delete pending[name];
              });
              if (cache.store) {
                cache.store(provider, data);
              }
            } catch (err2) {
              console.error(err2);
            }
          }
          loadedNewIcons(provider, prefix);
        });
      });
    });
  }
}
const isPending = (icon) => {
  const provider = icon.provider;
  const prefix = icon.prefix;
  return pendingIcons[provider] && pendingIcons[provider][prefix] && pendingIcons[provider][prefix][icon.name] !== void 0;
};
const loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push({
      provider,
      prefix
    });
    if (pendingIcons[provider] === void 0) {
      pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerPendingIcons = pendingIcons[provider];
    if (providerPendingIcons[prefix] === void 0) {
      providerPendingIcons[prefix] = /* @__PURE__ */ Object.create(null);
    }
    if (newIcons[provider] === void 0) {
      newIcons[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerNewIcons = newIcons[provider];
    if (providerNewIcons[prefix] === void 0) {
      providerNewIcons[prefix] = [];
    }
  });
  const time = Date.now();
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const pendingQueue = pendingIcons[provider][prefix];
    if (pendingQueue[name] === void 0) {
      pendingQueue[name] = time;
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(provider, prefix, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const loadIcon = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon) : icon;
    loadIcons([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const storage = getStorage(iconObj.provider, iconObj.prefix);
        const data = getIconFromStorage(storage, iconObj.name);
        if (data) {
          fulfill(data);
          return;
        }
      }
      reject(icon);
    });
  });
};

/**
 * Names of properties to add to nodes
 */
const elementFinderProperty = ('iconifyFinder' + Date.now());
const elementDataProperty = ('iconifyData' + Date.now());

/**
 * Replace element with SVG
 */
function renderIconInPlaceholder(placeholder, customisations, iconData, returnString) {
    // Create placeholder. Why placeholder? IE11 doesn't support innerHTML method on SVG.
    let span;
    try {
        span = document.createElement('span');
    }
    catch (err) {
        return returnString ? '' : null;
    }
    const data = iconToSVG(iconData, mergeCustomisations(defaults, customisations));
    // Placeholder properties
    const placeholderElement = placeholder.element;
    const finder = placeholder.finder;
    const name = placeholder.name;
    // Get class name
    const placeholderClassName = placeholderElement
        ? placeholderElement.getAttribute('class')
        : '';
    const filteredClassList = finder
        ? finder.classFilter(placeholderClassName ? placeholderClassName.split(/\s+/) : [])
        : [];
    const className = 'iconify iconify--' +
        name.prefix +
        (name.provider === '' ? '' : ' iconify--' + name.provider) +
        (filteredClassList.length ? ' ' + filteredClassList.join(' ') : '');
    // Generate SVG as string
    const html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="' +
        className +
        '">' +
        replaceIDs(data.body) +
        '</svg>';
    // Set HTML for placeholder
    span.innerHTML = html;
    // Get SVG element
    const svg = span.childNodes[0];
    const svgStyle = svg.style;
    // Add attributes
    const svgAttributes = data.attributes;
    Object.keys(svgAttributes).forEach((attr) => {
        svg.setAttribute(attr, svgAttributes[attr]);
    });
    // Add custom styles
    if (data.inline) {
        svgStyle.verticalAlign = '-0.125em';
    }
    // Copy stuff from placeholder
    if (placeholderElement) {
        // Copy attributes
        const placeholderAttributes = placeholderElement.attributes;
        for (let i = 0; i < placeholderAttributes.length; i++) {
            const item = placeholderAttributes.item(i);
            if (item) {
                const name = item.name;
                if (name !== 'class' &&
                    name !== 'style' &&
                    svgAttributes[name] === void 0) {
                    try {
                        svg.setAttribute(name, item.value);
                    }
                    catch (err) {
                        //
                    }
                }
            }
        }
        // Copy styles
        const placeholderStyle = placeholderElement.style;
        for (let i = 0; i < placeholderStyle.length; i++) {
            const attr = placeholderStyle[i];
            svgStyle[attr] = placeholderStyle[attr];
        }
    }
    // Store finder specific data
    if (finder) {
        const elementData = {
            name: name,
            status: 'loaded',
            customisations: customisations,
        };
        svg[elementDataProperty] = elementData;
        svg[elementFinderProperty] = finder;
    }
    // Get result
    const result = returnString ? span.innerHTML : svg;
    // Replace placeholder
    if (placeholderElement && placeholderElement.parentNode) {
        placeholderElement.parentNode.replaceChild(svg, placeholderElement);
    }
    else {
        // Placeholder has no parent? Remove SVG parent as well
        span.removeChild(svg);
    }
    // Return new node
    return result;
}

/**
 * List of root nodes
 */
let nodes = [];
/**
 * Find node
 */
function findRootNode(node) {
    for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];
        const root = typeof item.node === 'function' ? item.node() : item.node;
        if (root === node) {
            return item;
        }
    }
}
/**
 * Add extra root node
 */
function addRootNode(root, autoRemove = false) {
    let node = findRootNode(root);
    if (node) {
        // Node already exist: switch type if needed
        if (node.temporary) {
            node.temporary = autoRemove;
        }
        return node;
    }
    // Create item, add it to list, start observer
    node = {
        node: root,
        temporary: autoRemove,
    };
    nodes.push(node);
    return node;
}
/**
 * Add document.body node
 */
function addBodyNode() {
    if (document.documentElement) {
        return addRootNode(document.documentElement);
    }
    nodes.push({
        node: () => {
            return document.documentElement;
        },
    });
}
/**
 * Remove root node
 */
function removeRootNode(root) {
    nodes = nodes.filter((node) => {
        const element = typeof node.node === 'function' ? node.node() : node.node;
        return root !== element;
    });
}
/**
 * Get list of root nodes
 */
function listRootNodes() {
    return nodes;
}

/**
 * Execute function when DOM is ready
 */
function onReady(callback) {
    const doc = document;
    if (doc.readyState === 'complete' ||
        (doc.readyState !== 'loading' &&
            !doc.documentElement.doScroll)) {
        callback();
    }
    else {
        doc.addEventListener('DOMContentLoaded', callback);
        window.addEventListener('load', callback);
    }
}

/**
 * Callback
 */
let callback = null;
/**
 * Parameters for mutation observer
 */
const observerParams = {
    childList: true,
    subtree: true,
    attributes: true,
};
/**
 * Queue DOM scan
 */
function queueScan(node) {
    if (!node.observer) {
        return;
    }
    const observer = node.observer;
    if (!observer.pendingScan) {
        observer.pendingScan = setTimeout(() => {
            delete observer.pendingScan;
            if (callback) {
                callback(node);
            }
        });
    }
}
/**
 * Check mutations for added nodes
 */
function checkMutations(node, mutations) {
    if (!node.observer) {
        return;
    }
    const observer = node.observer;
    if (!observer.pendingScan) {
        for (let i = 0; i < mutations.length; i++) {
            const item = mutations[i];
            if (
            // Check for added nodes
            (item.addedNodes && item.addedNodes.length > 0) ||
                // Check for icon or placeholder with modified attributes
                (item.type === 'attributes' &&
                    item.target[elementFinderProperty] !==
                        void 0)) {
                if (!observer.paused) {
                    queueScan(node);
                }
                return;
            }
        }
    }
}
/**
 * Start/resume observer
 */
function continueObserving(node, root) {
    node.observer.instance.observe(root, observerParams);
}
/**
 * Start mutation observer
 */
function startObserver(node) {
    let observer = node.observer;
    if (observer && observer.instance) {
        // Already started
        return;
    }
    const root = typeof node.node === 'function' ? node.node() : node.node;
    if (!root) {
        // document.body is not available yet
        return;
    }
    if (!observer) {
        observer = {
            paused: 0,
        };
        node.observer = observer;
    }
    // Create new instance, observe
    observer.instance = new MutationObserver(checkMutations.bind(null, node));
    continueObserving(node, root);
    // Scan immediately
    if (!observer.paused) {
        queueScan(node);
    }
}
/**
 * Start all observers
 */
function startObservers() {
    listRootNodes().forEach(startObserver);
}
/**
 * Stop observer
 */
function stopObserver(node) {
    if (!node.observer) {
        return;
    }
    const observer = node.observer;
    // Stop scan
    if (observer.pendingScan) {
        clearTimeout(observer.pendingScan);
        delete observer.pendingScan;
    }
    // Disconnect observer
    if (observer.instance) {
        observer.instance.disconnect();
        delete observer.instance;
    }
}
/**
 * Start observer when DOM is ready
 */
function initObserver(cb) {
    const isRestart = callback !== null;
    if (callback !== cb) {
        // Change callback and stop all pending observers
        callback = cb;
        if (isRestart) {
            listRootNodes().forEach(stopObserver);
        }
    }
    if (isRestart) {
        // Restart instances
        startObservers();
        return;
    }
    // Start observers when document is ready
    onReady(startObservers);
}
/**
 * Pause observing node
 */
function pauseObservingNode(node) {
    (node ? [node] : listRootNodes()).forEach((node) => {
        if (!node.observer) {
            node.observer = {
                paused: 1,
            };
            return;
        }
        const observer = node.observer;
        observer.paused++;
        if (observer.paused > 1 || !observer.instance) {
            return;
        }
        // Disconnect observer
        const instance = observer.instance;
        // checkMutations(node, instance.takeRecords());
        instance.disconnect();
    });
}
/**
 * Pause observer
 */
function pauseObserver(root) {
    if (root) {
        const node = findRootNode(root);
        if (node) {
            pauseObservingNode(node);
        }
    }
    else {
        pauseObservingNode();
    }
}
/**
 * Resume observer
 */
function resumeObservingNode(observer) {
    (observer ? [observer] : listRootNodes()).forEach((node) => {
        if (!node.observer) {
            // Start observer
            startObserver(node);
            return;
        }
        const observer = node.observer;
        if (observer.paused) {
            observer.paused--;
            if (!observer.paused) {
                // Start / resume
                const root = typeof node.node === 'function' ? node.node() : node.node;
                if (!root) {
                    return;
                }
                else if (observer.instance) {
                    continueObserving(node, root);
                }
                else {
                    startObserver(node);
                }
            }
        }
    });
}
/**
 * Resume observer
 */
function resumeObserver(root) {
    if (root) {
        const node = findRootNode(root);
        if (node) {
            resumeObservingNode(node);
        }
    }
    else {
        resumeObservingNode();
    }
}
/**
 * Observe node
 */
function observe(root, autoRemove = false) {
    const node = addRootNode(root, autoRemove);
    startObserver(node);
    return node;
}
/**
 * Remove observed node
 */
function stopObserving(root) {
    const node = findRootNode(root);
    if (node) {
        stopObserver(node);
        removeRootNode(root);
    }
}

/**
 * List of modules
 */
const finders = [];
/**
 * Add module
 */
function addFinder(finder) {
    if (finders.indexOf(finder) === -1) {
        finders.push(finder);
    }
}
/**
 * Clean icon name: convert from string if needed and validate
 */
function cleanIconName(name) {
    if (typeof name === 'string') {
        name = stringToIcon(name);
    }
    return name === null || !validateIcon(name) ? null : name;
}
/**
 * Compare customisations. Returns true if identical
 */
function compareCustomisations(list1, list2) {
    const keys1 = Object.keys(list1);
    const keys2 = Object.keys(list2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (list2[key] !== list1[key]) {
            return false;
        }
    }
    return true;
}
/**
 * Find all placeholders
 */
function findPlaceholders(root) {
    const results = [];
    finders.forEach((finder) => {
        const elements = finder.find(root);
        Array.prototype.forEach.call(elements, (item) => {
            const element = item;
            if (element[elementFinderProperty] !== void 0 &&
                element[elementFinderProperty] !== finder) {
                // Element is assigned to a different finder
                return;
            }
            // Get icon name
            const name = cleanIconName(finder.name(element));
            if (name === null) {
                // Invalid name - do not assign this finder to element
                return;
            }
            // Assign finder to element and add it to results
            element[elementFinderProperty] = finder;
            const placeholder = {
                element,
                finder,
                name,
            };
            results.push(placeholder);
        });
    });
    // Find all modified SVG
    const elements = root.querySelectorAll('svg.iconify');
    Array.prototype.forEach.call(elements, (item) => {
        const element = item;
        const finder = element[elementFinderProperty];
        const data = element[elementDataProperty];
        if (!finder || !data) {
            return;
        }
        // Get icon name
        const name = cleanIconName(finder.name(element));
        if (name === null) {
            // Invalid name
            return;
        }
        let updated = false;
        let customisations;
        if (name.prefix !== data.name.prefix || name.name !== data.name.name) {
            updated = true;
        }
        else {
            customisations = finder.customisations(element);
            if (!compareCustomisations(data.customisations, customisations)) {
                updated = true;
            }
        }
        // Add item to results
        if (updated) {
            const placeholder = {
                element,
                finder,
                name,
                customisations,
            };
            results.push(placeholder);
        }
    });
    return results;
}

/**
 * Flag to avoid scanning DOM too often
 */
let scanQueued = false;
/**
 * Icons have been loaded
 */
function checkPendingIcons() {
    if (!scanQueued) {
        scanQueued = true;
        setTimeout(() => {
            if (scanQueued) {
                scanQueued = false;
                scanDOM();
            }
        });
    }
}
/**
 * Compare Icon objects. Returns true if icons are identical.
 *
 * Note: null means icon is invalid, so null to null comparison = false.
 */
const compareIcons = (icon1, icon2) => {
    return (icon1 !== null &&
        icon2 !== null &&
        icon1.name === icon2.name &&
        icon1.prefix === icon2.prefix);
};
/**
 * Scan node for placeholders
 */
function scanElement(root) {
    // Add temporary node
    const node = findRootNode(root);
    if (!node) {
        scanDOM({
            node: root,
            temporary: true,
        }, true);
    }
    else {
        scanDOM(node);
    }
}
/**
 * Scan DOM for placeholders
 */
function scanDOM(node, addTempNode = false) {
    scanQueued = false;
    // List of icons to load: [provider][prefix][name] = boolean
    const iconsToLoad = Object.create(null);
    // Get placeholders
    (node ? [node] : listRootNodes()).forEach((node) => {
        const root = typeof node.node === 'function' ? node.node() : node.node;
        if (!root || !root.querySelectorAll) {
            return;
        }
        // Track placeholders
        let hasPlaceholders = false;
        // Observer
        let paused = false;
        // Find placeholders
        findPlaceholders(root).forEach((item) => {
            const element = item.element;
            const iconName = item.name;
            const provider = iconName.provider;
            const prefix = iconName.prefix;
            const name = iconName.name;
            let data = element[elementDataProperty];
            // Icon has not been updated since last scan
            if (data !== void 0 && compareIcons(data.name, iconName)) {
                // Icon name was not changed and data is set - quickly return if icon is missing or still loading
                switch (data.status) {
                    case 'missing':
                        return;
                    case 'loading':
                        if (isPending({
                            provider,
                            prefix,
                            name,
                        })) {
                            // Pending
                            hasPlaceholders = true;
                            return;
                        }
                }
            }
            // Check icon
            const storage = getStorage(provider, prefix);
            if (storage.icons[name] !== void 0) {
                // Icon exists - pause observer before replacing placeholder
                if (!paused && node.observer) {
                    pauseObservingNode(node);
                    paused = true;
                }
                // Get customisations
                const customisations = item.customisations !== void 0
                    ? item.customisations
                    : item.finder.customisations(element);
                // Render icon
                renderIconInPlaceholder(item, customisations, getIconFromStorage(storage, name));
                return;
            }
            if (storage.missing[name]) {
                // Mark as missing
                data = {
                    name: iconName,
                    status: 'missing',
                    customisations: {},
                };
                element[elementDataProperty] = data;
                return;
            }
            if (!isPending({ provider, prefix, name })) {
                // Add icon to loading queue
                if (iconsToLoad[provider] === void 0) {
                    iconsToLoad[provider] = Object.create(null);
                }
                const providerIconsToLoad = iconsToLoad[provider];
                if (providerIconsToLoad[prefix] === void 0) {
                    providerIconsToLoad[prefix] = Object.create(null);
                }
                providerIconsToLoad[prefix][name] = true;
            }
            // Mark as loading
            data = {
                name: iconName,
                status: 'loading',
                customisations: {},
            };
            element[elementDataProperty] = data;
            hasPlaceholders = true;
        });
        // Node stuff
        if (node.temporary && !hasPlaceholders) {
            // Remove temporary node
            stopObserving(root);
        }
        else if (addTempNode && hasPlaceholders) {
            // Add new temporary node
            observe(root, true);
        }
        else if (paused && node.observer) {
            // Resume observer
            resumeObservingNode(node);
        }
    });
    // Load icons
    Object.keys(iconsToLoad).forEach((provider) => {
        const providerIconsToLoad = iconsToLoad[provider];
        Object.keys(providerIconsToLoad).forEach((prefix) => {
            loadIcons(Object.keys(providerIconsToLoad[prefix]).map((name) => {
                const icon = {
                    provider,
                    prefix,
                    name,
                };
                return icon;
            }), checkPendingIcons);
        });
    });
}

function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}

const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function alignmentFromString(custom, align) {
  align.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "left":
      case "center":
      case "right":
        custom.hAlign = value;
        break;
      case "top":
      case "middle":
      case "bottom":
        custom.vAlign = value;
        break;
      case "slice":
      case "crop":
        custom.slice = true;
        break;
      case "meet":
        custom.slice = false;
    }
  });
}

/**
 * Check if attribute exists
 */
function hasAttribute(element, key) {
    return element.hasAttribute(key);
}
/**
 * Get attribute value
 */
function getAttribute(element, key) {
    return element.getAttribute(key);
}
/**
 * Get attribute value
 */
function getBooleanAttribute(element, key) {
    const value = element.getAttribute(key);
    if (value === key || value === 'true') {
        return true;
    }
    if (value === '' || value === 'false') {
        return false;
    }
    return null;
}
/**
 * Boolean attributes
 */
const booleanAttributes = [
    'inline',
    'hFlip',
    'vFlip',
];
/**
 * String attributes
 */
const stringAttributes = [
    'width',
    'height',
];
/**
 * Class names
 */
const mainClass = 'iconify';
const inlineClass = 'iconify-inline';
/**
 * Selector combining class names and tags
 */
const selector = 'i.' +
    mainClass +
    ', span.' +
    mainClass +
    ', i.' +
    inlineClass +
    ', span.' +
    inlineClass;
/**
 * Export finder for:
 *  <span class="iconify" />
 *  <i class="iconify" />
 *  <span class="iconify-inline" />
 *  <i class="iconify-inline" />
 */
const finder = {
    /**
     * Find all elements
     */
    find: (root) => root.querySelectorAll(selector),
    /**
     * Get icon name from element
     */
    name: (element) => {
        if (hasAttribute(element, 'data-icon')) {
            return getAttribute(element, 'data-icon');
        }
        return null;
    },
    /**
     * Get customisations list from element
     */
    customisations: (element, defaultValues = {
        inline: false,
    }) => {
        const result = defaultValues;
        // Check class list for inline class
        const className = element.getAttribute('class');
        const classList = className ? className.split(/\s+/) : [];
        if (classList.indexOf(inlineClass) !== -1) {
            result.inline = true;
        }
        // Rotation
        if (hasAttribute(element, 'data-rotate')) {
            const value = rotateFromString(getAttribute(element, 'data-rotate'));
            if (value) {
                result.rotate = value;
            }
        }
        // Shorthand attributes
        if (hasAttribute(element, 'data-flip')) {
            flipFromString(result, getAttribute(element, 'data-flip'));
        }
        if (hasAttribute(element, 'data-align')) {
            alignmentFromString(result, getAttribute(element, 'data-align'));
        }
        // Boolean attributes
        booleanAttributes.forEach((attr) => {
            if (hasAttribute(element, 'data-' + attr)) {
                const value = getBooleanAttribute(element, 'data-' + attr);
                if (typeof value === 'boolean') {
                    result[attr] = value;
                }
            }
        });
        // String attributes
        stringAttributes.forEach((attr) => {
            if (hasAttribute(element, 'data-' + attr)) {
                const value = getAttribute(element, 'data-' + attr);
                if (value !== '') {
                    result[attr] = value;
                }
            }
        });
        return result;
    },
    /**
     * Filter classes
     */
    classFilter: (classList) => {
        const result = [];
        classList.forEach((className) => {
            if (className !== 'iconify' &&
                className !== '' &&
                className.slice(0, 9) !== 'iconify--') {
                result.push(className);
            }
        });
        return result;
    },
};

// import { finder as iconifyIconFinder } from './finders/iconify-icon';
/**
 * Generate icon
 */
function generateIcon(name, customisations, returnString) {
    // Get icon data
    const iconData = getIconData(name);
    if (!iconData) {
        return null;
    }
    // Split name
    const iconName = stringToIcon(name);
    // Clean up customisations
    const changes = mergeCustomisations(defaults, typeof customisations === 'object' ? customisations : {});
    // Get data
    return renderIconInPlaceholder({
        name: iconName,
    }, changes, iconData, returnString);
}
/**
 * Get version
 */
function getVersion() {
    return '2.2.1';
}
/**
 * Generate SVG element
 */
function renderSVG(name, customisations) {
    return generateIcon(name, customisations, false);
}
/**
 * Generate SVG as string
 */
function renderHTML(name, customisations) {
    return generateIcon(name, customisations, true);
}
/**
 * Get rendered icon as object that can be used to create SVG (use replaceIDs on body)
 */
function renderIcon(name, customisations) {
    // Get icon data
    const iconData = getIconData(name);
    if (!iconData) {
        return null;
    }
    // Clean up customisations
    const changes = mergeCustomisations(defaults, typeof customisations === 'object' ? customisations : {});
    // Get data
    return iconToSVG(iconData, changes);
}
/**
 * Scan DOM
 */
function scan(root) {
    if (root) {
        scanElement(root);
    }
    else {
        scanDOM();
    }
}
/**
 * Initialise stuff
 */
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    // Add document.body node
    addBodyNode();
    // Add finder modules
    // addFinder(iconifyIconFinder);
    addFinder(finder);
    const _window = window;
    // Load icons from global "IconifyPreload"
    if (_window.IconifyPreload !== void 0) {
        const preload = _window.IconifyPreload;
        const err = 'Invalid IconifyPreload syntax.';
        if (typeof preload === 'object' && preload !== null) {
            (preload instanceof Array ? preload : [preload]).forEach((item) => {
                try {
                    if (
                    // Check if item is an object and not null/array
                    typeof item !== 'object' ||
                        item === null ||
                        item instanceof Array ||
                        // Check for 'icons' and 'prefix'
                        typeof item.icons !== 'object' ||
                        typeof item.prefix !== 'string' ||
                        // Add icon set
                        !addCollection(item)) {
                        console.error(err);
                    }
                }
                catch (e) {
                    console.error(err);
                }
            });
        }
    }
    // Load observer and scan DOM on next tick
    setTimeout(() => {
        initObserver(scanDOM);
        scanDOM();
    });
}

/**
 * Enable cache
 */
function enableCache(storage, enable) {
    toggleBrowserCache(storage, enable !== false);
}
/**
 * Disable cache
 */
function disableCache(storage) {
    toggleBrowserCache(storage, true);
}
/**
 * Initialise stuff
 */
// Set API module
setAPIModule('', fetchAPIModule);
/**
 * Browser stuff
 */
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    // Set cache and load existing cache
    cache.store = storeCache;
    loadCache();
    const _window = window;
    // Set API from global "IconifyProviders"
    if (_window.IconifyProviders !== void 0) {
        const providers = _window.IconifyProviders;
        if (typeof providers === 'object' && providers !== null) {
            for (const key in providers) {
                const err = 'IconifyProviders[' + key + '] is invalid.';
                try {
                    const value = providers[key];
                    if (typeof value !== 'object' ||
                        !value ||
                        value.resources === void 0) {
                        continue;
                    }
                    if (!addAPIProvider(key, value)) {
                        console.error(err);
                    }
                }
                catch (e) {
                    console.error(err);
                }
            }
        }
    }
}
/**
 * Internal API
 */
const _api = {
    getAPIConfig,
    setAPIModule,
    sendAPIQuery,
    setFetch,
    getFetch,
    listAPIProviders,
    mergeParams,
};
/**
 * Global variable
 */
const Iconify = {
    // IconifyAPIInternalFunctions
    _api,
    // IconifyAPIFunctions
    addAPIProvider,
    loadIcons,
    loadIcon,
    // IconifyStorageFunctions
    iconExists,
    getIcon,
    listIcons,
    addIcon,
    addCollection,
    shareStorage,
    // IconifyBuilderFunctions
    replaceIDs,
    calculateSize,
    buildIcon,
    // IconifyCommonFunctions
    getVersion,
    renderSVG,
    renderHTML,
    renderIcon,
    scan,
    observe,
    stopObserving,
    pauseObserver,
    resumeObserver,
    // IconifyBrowserCacheFunctions
    enableCache,
    disableCache,
};



// Export to window or web worker
try {
	if (self.Iconify === void 0) {
		self.Iconify = Iconify;
	}
} catch (err) {
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _iconify_iconify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @iconify/iconify */ "./node_modules/@iconify/iconify/dist/iconify.mjs");
/* harmony import */ var _homePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./homePage */ "./src/homePage.js");


const contentContainer = document.querySelector('.content');
console.log(contentContainer);
(0,_homePage__WEBPACK_IMPORTED_MODULE_1__["default"])(contentContainer);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45MzMxNTI1NWVjOThmOTU0ZWM2YS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0Msd0NBQXdDO0FBQ3hDLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtDQUFrQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDZCQUE2QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdCQUF3QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFQSxZQUFZLDhCQUE4QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwR0FBMEc7QUFDMUc7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwR0FBMEc7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU0VDs7QUFFNVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7OztVQ250RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOdUM7QUFDQTtBQUN2QztBQUNBO0FBQ0EscURBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXJlc3RhdXJhbnQtcGFnZS8uL3NyYy9ob21lUGFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXJlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9AaWNvbmlmeS9pY29uaWZ5L2Rpc3QvaWNvbmlmeS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi1yZXN0YXVyYW50LXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1yZXN0YXVyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1yZXN0YXVyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXJlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb250ZW50KGNvbnRhaW5lcikge1xyXG5cdGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHRsb2dvLmNsYXNzTGlzdC5hZGQoJ2xvZ28nKTtcclxuXHRsb2dvLnNyYyA9ICdodHRwczovL3NvdXJjZS51bnNwbGFzaC5jb20vMTYwMHgzMDAvP2Zvb2QnO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2dvKTtcclxuXHJcblx0Y29uc3QgaGVhZGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG5cdGhlYWRsaW5lLmNsYXNzTGlzdC5hZGQoJ2hlYWRsaW5lJyk7XHJcblx0aGVhZGxpbmUudGV4dENvbnRlbnQgPVxyXG5cdFx0J0xvcmVtIGlwc3VtIGRvbG9yLCBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFeCBpc3RlISc7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRsaW5lKTtcclxuXHJcblx0Y29uc3QgZGVzY3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcblx0ZGVzY3IuY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nKTtcclxuXHRkZXNjci50ZXh0Q29udGVudCA9XHJcblx0XHQnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIsIGFkaXBpc2ljaW5nIGVsaXQuICBOb3N0cnVtIG1heGltZSBudW1xdWFtIG5vYmlzIHF1YWUgc2VkIGFtZXQgdml0YWUgdGVuZXR1ciAgIHByb3ZpZGVudCBpc3RlIHJlcHVkaWFuZGFlLic7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyKTtcclxufVxyXG4iLCIvKipcbiogKGMpIEljb25pZnlcbipcbiogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlIGxpY2Vuc2UudHh0IG9yIGxpY2Vuc2UuZ3BsLnR4dFxuKiBmaWxlcyBhdCBodHRwczovL2dpdGh1Yi5jb20vaWNvbmlmeS9pY29uaWZ5XG4qXG4qIExpY2Vuc2VkIHVuZGVyIEFwYWNoZSAyLjAgb3IgR1BMIDIuMCBhdCB5b3VyIG9wdGlvbi5cbiogSWYgZGVyaXZhdGl2ZSBwcm9kdWN0IGlzIG5vdCBjb21wYXRpYmxlIHdpdGggb25lIG9mIGxpY2Vuc2VzLCB5b3UgY2FuIHBpY2sgb25lIG9mIGxpY2Vuc2VzLlxuKlxuKiBAbGljZW5zZSBBcGFjaGUgMi4wXG4qIEBsaWNlbnNlIEdQTCAyLjBcbiogQHZlcnNpb24gMi4yLjFcbiovXG5jb25zdCBtYXRjaE5hbWUgPSAvXlthLXowLTldKygtW2EtejAtOV0rKSokLztcbmNvbnN0IGljb25EZWZhdWx0cyA9IE9iamVjdC5mcmVlemUoe1xuICBsZWZ0OiAwLFxuICB0b3A6IDAsXG4gIHdpZHRoOiAxNixcbiAgaGVpZ2h0OiAxNixcbiAgcm90YXRlOiAwLFxuICB2RmxpcDogZmFsc2UsXG4gIGhGbGlwOiBmYWxzZVxufSk7XG5mdW5jdGlvbiBmdWxsSWNvbihkYXRhKSB7XG4gIHJldHVybiB7IC4uLmljb25EZWZhdWx0cywgLi4uZGF0YSB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZUljb25EYXRhKGljb24sIGFsaWFzKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHsgLi4uaWNvbiB9O1xuICBmb3IgKGNvbnN0IGtleSBpbiBpY29uRGVmYXVsdHMpIHtcbiAgICBjb25zdCBwcm9wID0ga2V5O1xuICAgIGlmIChhbGlhc1twcm9wXSAhPT0gdm9pZCAwKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGFsaWFzW3Byb3BdO1xuICAgICAgaWYgKHJlc3VsdFtwcm9wXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAocHJvcCkge1xuICAgICAgICBjYXNlIFwicm90YXRlXCI6XG4gICAgICAgICAgcmVzdWx0W3Byb3BdID0gKHJlc3VsdFtwcm9wXSArIHZhbHVlKSAlIDQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJoRmxpcFwiOlxuICAgICAgICBjYXNlIFwidkZsaXBcIjpcbiAgICAgICAgICByZXN1bHRbcHJvcF0gPSB2YWx1ZSAhPT0gcmVzdWx0W3Byb3BdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBnZXRJY29uRGF0YSQxKGRhdGEsIG5hbWUsIGZ1bGwgPSBmYWxzZSkge1xuICBmdW5jdGlvbiBnZXRJY29uKG5hbWUyLCBpdGVyYXRpb24pIHtcbiAgICBpZiAoZGF0YS5pY29uc1tuYW1lMl0gIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRhdGEuaWNvbnNbbmFtZTJdKTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGlvbiA+IDUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBhbGlhc2VzID0gZGF0YS5hbGlhc2VzO1xuICAgIGlmIChhbGlhc2VzICYmIGFsaWFzZXNbbmFtZTJdICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhbGlhc2VzW25hbWUyXTtcbiAgICAgIGNvbnN0IHJlc3VsdDIgPSBnZXRJY29uKGl0ZW0ucGFyZW50LCBpdGVyYXRpb24gKyAxKTtcbiAgICAgIGlmIChyZXN1bHQyKSB7XG4gICAgICAgIHJldHVybiBtZXJnZUljb25EYXRhKHJlc3VsdDIsIGl0ZW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDI7XG4gICAgfVxuICAgIGNvbnN0IGNoYXJzID0gZGF0YS5jaGFycztcbiAgICBpZiAoIWl0ZXJhdGlvbiAmJiBjaGFycyAmJiBjaGFyc1tuYW1lMl0gIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIGdldEljb24oY2hhcnNbbmFtZTJdLCBpdGVyYXRpb24gKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gZ2V0SWNvbihuYW1lLCAwKTtcbiAgaWYgKHJlc3VsdCkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGljb25EZWZhdWx0cykge1xuICAgICAgaWYgKHJlc3VsdFtrZXldID09PSB2b2lkIDAgJiYgZGF0YVtrZXldICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQgJiYgZnVsbCA/IGZ1bGxJY29uKHJlc3VsdCkgOiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzVmFyaWF0aW9uKGl0ZW0pIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gaWNvbkRlZmF1bHRzKSB7XG4gICAgaWYgKGl0ZW1ba2V5XSAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gcGFyc2VJY29uU2V0KGRhdGEsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBuYW1lcyA9IFtdO1xuICBpZiAodHlwZW9mIGRhdGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGRhdGEuaWNvbnMgIT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gbmFtZXM7XG4gIH1cbiAgaWYgKGRhdGEubm90X2ZvdW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBkYXRhLm5vdF9mb3VuZC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjYWxsYmFjayhuYW1lLCBudWxsKTtcbiAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgfSk7XG4gIH1cbiAgY29uc3QgaWNvbnMgPSBkYXRhLmljb25zO1xuICBPYmplY3Qua2V5cyhpY29ucykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgIGNvbnN0IGljb25EYXRhID0gZ2V0SWNvbkRhdGEkMShkYXRhLCBuYW1lLCB0cnVlKTtcbiAgICBpZiAoaWNvbkRhdGEpIHtcbiAgICAgIGNhbGxiYWNrKG5hbWUsIGljb25EYXRhKTtcbiAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgcGFyc2VBbGlhc2VzID0gb3B0aW9ucy5hbGlhc2VzIHx8IFwiYWxsXCI7XG4gIGlmIChwYXJzZUFsaWFzZXMgIT09IFwibm9uZVwiICYmIHR5cGVvZiBkYXRhLmFsaWFzZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCBhbGlhc2VzID0gZGF0YS5hbGlhc2VzO1xuICAgIE9iamVjdC5rZXlzKGFsaWFzZXMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGlmIChwYXJzZUFsaWFzZXMgPT09IFwidmFyaWF0aW9uc1wiICYmIGlzVmFyaWF0aW9uKGFsaWFzZXNbbmFtZV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGljb25EYXRhID0gZ2V0SWNvbkRhdGEkMShkYXRhLCBuYW1lLCB0cnVlKTtcbiAgICAgIGlmIChpY29uRGF0YSkge1xuICAgICAgICBjYWxsYmFjayhuYW1lLCBpY29uRGF0YSk7XG4gICAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG5hbWVzO1xufVxuXG5jb25zdCBvcHRpb25hbFByb3BlcnRpZXMgPSB7XG4gIHByb3ZpZGVyOiBcInN0cmluZ1wiLFxuICBhbGlhc2VzOiBcIm9iamVjdFwiLFxuICBub3RfZm91bmQ6IFwib2JqZWN0XCJcbn07XG5mb3IgKGNvbnN0IHByb3AgaW4gaWNvbkRlZmF1bHRzKSB7XG4gIG9wdGlvbmFsUHJvcGVydGllc1twcm9wXSA9IHR5cGVvZiBpY29uRGVmYXVsdHNbcHJvcF07XG59XG5mdW5jdGlvbiBxdWlja2x5VmFsaWRhdGVJY29uU2V0KG9iaikge1xuICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBkYXRhID0gb2JqO1xuICBpZiAodHlwZW9mIGRhdGEucHJlZml4ICE9PSBcInN0cmluZ1wiIHx8ICFvYmouaWNvbnMgfHwgdHlwZW9mIG9iai5pY29ucyAhPT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAoY29uc3QgcHJvcCBpbiBvcHRpb25hbFByb3BlcnRpZXMpIHtcbiAgICBpZiAob2JqW3Byb3BdICE9PSB2b2lkIDAgJiYgdHlwZW9mIG9ialtwcm9wXSAhPT0gb3B0aW9uYWxQcm9wZXJ0aWVzW3Byb3BdKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgY29uc3QgaWNvbnMgPSBkYXRhLmljb25zO1xuICBmb3IgKGNvbnN0IG5hbWUgaW4gaWNvbnMpIHtcbiAgICBjb25zdCBpY29uID0gaWNvbnNbbmFtZV07XG4gICAgaWYgKCFuYW1lLm1hdGNoKG1hdGNoTmFtZSkgfHwgdHlwZW9mIGljb24uYm9keSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBpY29uRGVmYXVsdHMpIHtcbiAgICAgIGlmIChpY29uW3Byb3BdICE9PSB2b2lkIDAgJiYgdHlwZW9mIGljb25bcHJvcF0gIT09IHR5cGVvZiBpY29uRGVmYXVsdHNbcHJvcF0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IGFsaWFzZXMgPSBkYXRhLmFsaWFzZXM7XG4gIGlmIChhbGlhc2VzKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIGluIGFsaWFzZXMpIHtcbiAgICAgIGNvbnN0IGljb24gPSBhbGlhc2VzW25hbWVdO1xuICAgICAgY29uc3QgcGFyZW50ID0gaWNvbi5wYXJlbnQ7XG4gICAgICBpZiAoIW5hbWUubWF0Y2gobWF0Y2hOYW1lKSB8fCB0eXBlb2YgcGFyZW50ICE9PSBcInN0cmluZ1wiIHx8ICFpY29uc1twYXJlbnRdICYmICFhbGlhc2VzW3BhcmVudF0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gaWNvbkRlZmF1bHRzKSB7XG4gICAgICAgIGlmIChpY29uW3Byb3BdICE9PSB2b2lkIDAgJiYgdHlwZW9mIGljb25bcHJvcF0gIT09IHR5cGVvZiBpY29uRGVmYXVsdHNbcHJvcF0pIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuY29uc3Qgc3RyaW5nVG9JY29uID0gKHZhbHVlLCB2YWxpZGF0ZSwgYWxsb3dTaW1wbGVOYW1lLCBwcm92aWRlciA9IFwiXCIpID0+IHtcbiAgY29uc3QgY29sb25TZXBhcmF0ZWQgPSB2YWx1ZS5zcGxpdChcIjpcIik7XG4gIGlmICh2YWx1ZS5zbGljZSgwLCAxKSA9PT0gXCJAXCIpIHtcbiAgICBpZiAoY29sb25TZXBhcmF0ZWQubGVuZ3RoIDwgMiB8fCBjb2xvblNlcGFyYXRlZC5sZW5ndGggPiAzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcHJvdmlkZXIgPSBjb2xvblNlcGFyYXRlZC5zaGlmdCgpLnNsaWNlKDEpO1xuICB9XG4gIGlmIChjb2xvblNlcGFyYXRlZC5sZW5ndGggPiAzIHx8ICFjb2xvblNlcGFyYXRlZC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29sb25TZXBhcmF0ZWQubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IG5hbWUyID0gY29sb25TZXBhcmF0ZWQucG9wKCk7XG4gICAgY29uc3QgcHJlZml4ID0gY29sb25TZXBhcmF0ZWQucG9wKCk7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgcHJvdmlkZXI6IGNvbG9uU2VwYXJhdGVkLmxlbmd0aCA+IDAgPyBjb2xvblNlcGFyYXRlZFswXSA6IHByb3ZpZGVyLFxuICAgICAgcHJlZml4LFxuICAgICAgbmFtZTogbmFtZTJcbiAgICB9O1xuICAgIHJldHVybiB2YWxpZGF0ZSAmJiAhdmFsaWRhdGVJY29uKHJlc3VsdCkgPyBudWxsIDogcmVzdWx0O1xuICB9XG4gIGNvbnN0IG5hbWUgPSBjb2xvblNlcGFyYXRlZFswXTtcbiAgY29uc3QgZGFzaFNlcGFyYXRlZCA9IG5hbWUuc3BsaXQoXCItXCIpO1xuICBpZiAoZGFzaFNlcGFyYXRlZC5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgcHJvdmlkZXIsXG4gICAgICBwcmVmaXg6IGRhc2hTZXBhcmF0ZWQuc2hpZnQoKSxcbiAgICAgIG5hbWU6IGRhc2hTZXBhcmF0ZWQuam9pbihcIi1cIilcbiAgICB9O1xuICAgIHJldHVybiB2YWxpZGF0ZSAmJiAhdmFsaWRhdGVJY29uKHJlc3VsdCkgPyBudWxsIDogcmVzdWx0O1xuICB9XG4gIGlmIChhbGxvd1NpbXBsZU5hbWUgJiYgcHJvdmlkZXIgPT09IFwiXCIpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBwcm92aWRlcixcbiAgICAgIHByZWZpeDogXCJcIixcbiAgICAgIG5hbWVcbiAgICB9O1xuICAgIHJldHVybiB2YWxpZGF0ZSAmJiAhdmFsaWRhdGVJY29uKHJlc3VsdCwgYWxsb3dTaW1wbGVOYW1lKSA/IG51bGwgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuY29uc3QgdmFsaWRhdGVJY29uID0gKGljb24sIGFsbG93U2ltcGxlTmFtZSkgPT4ge1xuICBpZiAoIWljb24pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuICEhKChpY29uLnByb3ZpZGVyID09PSBcIlwiIHx8IGljb24ucHJvdmlkZXIubWF0Y2gobWF0Y2hOYW1lKSkgJiYgKGFsbG93U2ltcGxlTmFtZSAmJiBpY29uLnByZWZpeCA9PT0gXCJcIiB8fCBpY29uLnByZWZpeC5tYXRjaChtYXRjaE5hbWUpKSAmJiBpY29uLm5hbWUubWF0Y2gobWF0Y2hOYW1lKSk7XG59O1xuXG5jb25zdCBzdG9yYWdlVmVyc2lvbiA9IDE7XG5sZXQgc3RvcmFnZSQxID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG50cnkge1xuICBjb25zdCB3ID0gd2luZG93IHx8IHNlbGY7XG4gIGlmICh3ICYmIHcuX2ljb25pZnlTdG9yYWdlLnZlcnNpb24gPT09IHN0b3JhZ2VWZXJzaW9uKSB7XG4gICAgc3RvcmFnZSQxID0gdy5faWNvbmlmeVN0b3JhZ2Uuc3RvcmFnZTtcbiAgfVxufSBjYXRjaCAoZXJyKSB7XG59XG5mdW5jdGlvbiBzaGFyZVN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdyA9IHdpbmRvdyB8fCBzZWxmO1xuICAgIGlmICh3ICYmICF3Ll9pY29uaWZ5U3RvcmFnZSkge1xuICAgICAgdy5faWNvbmlmeVN0b3JhZ2UgPSB7XG4gICAgICAgIHZlcnNpb246IHN0b3JhZ2VWZXJzaW9uLFxuICAgICAgICBzdG9yYWdlOiBzdG9yYWdlJDFcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgfVxufVxuZnVuY3Rpb24gbmV3U3RvcmFnZShwcm92aWRlciwgcHJlZml4KSB7XG4gIHJldHVybiB7XG4gICAgcHJvdmlkZXIsXG4gICAgcHJlZml4LFxuICAgIGljb25zOiAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBtaXNzaW5nOiAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0U3RvcmFnZShwcm92aWRlciwgcHJlZml4KSB7XG4gIGlmIChzdG9yYWdlJDFbcHJvdmlkZXJdID09PSB2b2lkIDApIHtcbiAgICBzdG9yYWdlJDFbcHJvdmlkZXJdID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cbiAgY29uc3QgcHJvdmlkZXJTdG9yYWdlID0gc3RvcmFnZSQxW3Byb3ZpZGVyXTtcbiAgaWYgKHByb3ZpZGVyU3RvcmFnZVtwcmVmaXhdID09PSB2b2lkIDApIHtcbiAgICBwcm92aWRlclN0b3JhZ2VbcHJlZml4XSA9IG5ld1N0b3JhZ2UocHJvdmlkZXIsIHByZWZpeCk7XG4gIH1cbiAgcmV0dXJuIHByb3ZpZGVyU3RvcmFnZVtwcmVmaXhdO1xufVxuZnVuY3Rpb24gYWRkSWNvblNldChzdG9yYWdlMiwgZGF0YSkge1xuICBpZiAoIXF1aWNrbHlWYWxpZGF0ZUljb25TZXQoZGF0YSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY29uc3QgdCA9IERhdGUubm93KCk7XG4gIHJldHVybiBwYXJzZUljb25TZXQoZGF0YSwgKG5hbWUsIGljb24pID0+IHtcbiAgICBpZiAoaWNvbikge1xuICAgICAgc3RvcmFnZTIuaWNvbnNbbmFtZV0gPSBpY29uO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdG9yYWdlMi5taXNzaW5nW25hbWVdID0gdDtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gYWRkSWNvblRvU3RvcmFnZShzdG9yYWdlMiwgbmFtZSwgaWNvbikge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgaWNvbi5ib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBzdG9yYWdlMi5pY29uc1tuYW1lXSA9IE9iamVjdC5mcmVlemUoZnVsbEljb24oaWNvbikpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBnZXRJY29uRnJvbVN0b3JhZ2Uoc3RvcmFnZTIsIG5hbWUpIHtcbiAgY29uc3QgdmFsdWUgPSBzdG9yYWdlMi5pY29uc1tuYW1lXTtcbiAgcmV0dXJuIHZhbHVlID09PSB2b2lkIDAgPyBudWxsIDogdmFsdWU7XG59XG5mdW5jdGlvbiBsaXN0SWNvbnMocHJvdmlkZXIsIHByZWZpeCkge1xuICBsZXQgYWxsSWNvbnMgPSBbXTtcbiAgbGV0IHByb3ZpZGVycztcbiAgaWYgKHR5cGVvZiBwcm92aWRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgIHByb3ZpZGVycyA9IFtwcm92aWRlcl07XG4gIH0gZWxzZSB7XG4gICAgcHJvdmlkZXJzID0gT2JqZWN0LmtleXMoc3RvcmFnZSQxKTtcbiAgfVxuICBwcm92aWRlcnMuZm9yRWFjaCgocHJvdmlkZXIyKSA9PiB7XG4gICAgbGV0IHByZWZpeGVzO1xuICAgIGlmICh0eXBlb2YgcHJvdmlkZXIyID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBwcmVmaXggPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHByZWZpeGVzID0gW3ByZWZpeF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeGVzID0gc3RvcmFnZSQxW3Byb3ZpZGVyMl0gPT09IHZvaWQgMCA/IFtdIDogT2JqZWN0LmtleXMoc3RvcmFnZSQxW3Byb3ZpZGVyMl0pO1xuICAgIH1cbiAgICBwcmVmaXhlcy5mb3JFYWNoKChwcmVmaXgyKSA9PiB7XG4gICAgICBjb25zdCBzdG9yYWdlMiA9IGdldFN0b3JhZ2UocHJvdmlkZXIyLCBwcmVmaXgyKTtcbiAgICAgIGNvbnN0IGljb25zID0gT2JqZWN0LmtleXMoc3RvcmFnZTIuaWNvbnMpLm1hcCgobmFtZSkgPT4gKHByb3ZpZGVyMiAhPT0gXCJcIiA/IFwiQFwiICsgcHJvdmlkZXIyICsgXCI6XCIgOiBcIlwiKSArIHByZWZpeDIgKyBcIjpcIiArIG5hbWUpO1xuICAgICAgYWxsSWNvbnMgPSBhbGxJY29ucy5jb25jYXQoaWNvbnMpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEljb25zO1xufVxuXG5sZXQgc2ltcGxlTmFtZXMgPSBmYWxzZTtcbmZ1bmN0aW9uIGFsbG93U2ltcGxlTmFtZXMoYWxsb3cpIHtcbiAgaWYgKHR5cGVvZiBhbGxvdyA9PT0gXCJib29sZWFuXCIpIHtcbiAgICBzaW1wbGVOYW1lcyA9IGFsbG93O1xuICB9XG4gIHJldHVybiBzaW1wbGVOYW1lcztcbn1cbmZ1bmN0aW9uIGdldEljb25EYXRhKG5hbWUpIHtcbiAgY29uc3QgaWNvbiA9IHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiID8gc3RyaW5nVG9JY29uKG5hbWUsIHRydWUsIHNpbXBsZU5hbWVzKSA6IG5hbWU7XG4gIHJldHVybiBpY29uID8gZ2V0SWNvbkZyb21TdG9yYWdlKGdldFN0b3JhZ2UoaWNvbi5wcm92aWRlciwgaWNvbi5wcmVmaXgpLCBpY29uLm5hbWUpIDogbnVsbDtcbn1cbmZ1bmN0aW9uIGFkZEljb24obmFtZSwgZGF0YSkge1xuICBjb25zdCBpY29uID0gc3RyaW5nVG9JY29uKG5hbWUsIHRydWUsIHNpbXBsZU5hbWVzKTtcbiAgaWYgKCFpY29uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKGljb24ucHJvdmlkZXIsIGljb24ucHJlZml4KTtcbiAgcmV0dXJuIGFkZEljb25Ub1N0b3JhZ2Uoc3RvcmFnZSwgaWNvbi5uYW1lLCBkYXRhKTtcbn1cbmZ1bmN0aW9uIGFkZENvbGxlY3Rpb24oZGF0YSwgcHJvdmlkZXIpIHtcbiAgaWYgKHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgcHJvdmlkZXIgIT09IFwic3RyaW5nXCIpIHtcbiAgICBwcm92aWRlciA9IHR5cGVvZiBkYXRhLnByb3ZpZGVyID09PSBcInN0cmluZ1wiID8gZGF0YS5wcm92aWRlciA6IFwiXCI7XG4gIH1cbiAgaWYgKHNpbXBsZU5hbWVzICYmIHByb3ZpZGVyID09PSBcIlwiICYmICh0eXBlb2YgZGF0YS5wcmVmaXggIT09IFwic3RyaW5nXCIgfHwgZGF0YS5wcmVmaXggPT09IFwiXCIpKSB7XG4gICAgbGV0IGFkZGVkID0gZmFsc2U7XG4gICAgaWYgKHF1aWNrbHlWYWxpZGF0ZUljb25TZXQoZGF0YSkpIHtcbiAgICAgIGRhdGEucHJlZml4ID0gXCJcIjtcbiAgICAgIHBhcnNlSWNvblNldChkYXRhLCAobmFtZSwgaWNvbikgPT4ge1xuICAgICAgICBpZiAoaWNvbiAmJiBhZGRJY29uKG5hbWUsIGljb24pKSB7XG4gICAgICAgICAgYWRkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZGVkO1xuICB9XG4gIGlmICh0eXBlb2YgZGF0YS5wcmVmaXggIT09IFwic3RyaW5nXCIgfHwgIXZhbGlkYXRlSWNvbih7XG4gICAgcHJvdmlkZXIsXG4gICAgcHJlZml4OiBkYXRhLnByZWZpeCxcbiAgICBuYW1lOiBcImFcIlxuICB9KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBzdG9yYWdlID0gZ2V0U3RvcmFnZShwcm92aWRlciwgZGF0YS5wcmVmaXgpO1xuICByZXR1cm4gISFhZGRJY29uU2V0KHN0b3JhZ2UsIGRhdGEpO1xufVxuZnVuY3Rpb24gaWNvbkV4aXN0cyhuYW1lKSB7XG4gIHJldHVybiBnZXRJY29uRGF0YShuYW1lKSAhPT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldEljb24obmFtZSkge1xuICBjb25zdCByZXN1bHQgPSBnZXRJY29uRGF0YShuYW1lKTtcbiAgcmV0dXJuIHJlc3VsdCA/IHsgLi4ucmVzdWx0IH0gOiBudWxsO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IE9iamVjdC5mcmVlemUoe1xuICBpbmxpbmU6IGZhbHNlLFxuICB3aWR0aDogbnVsbCxcbiAgaGVpZ2h0OiBudWxsLFxuICBoQWxpZ246IFwiY2VudGVyXCIsXG4gIHZBbGlnbjogXCJtaWRkbGVcIixcbiAgc2xpY2U6IGZhbHNlLFxuICBoRmxpcDogZmFsc2UsXG4gIHZGbGlwOiBmYWxzZSxcbiAgcm90YXRlOiAwXG59KTtcbmZ1bmN0aW9uIG1lcmdlQ3VzdG9taXNhdGlvbnMoZGVmYXVsdHMyLCBpdGVtKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiBkZWZhdWx0czIpIHtcbiAgICBjb25zdCBhdHRyID0ga2V5O1xuICAgIHJlc3VsdFthdHRyXSA9IGRlZmF1bHRzMlthdHRyXTtcbiAgICBpZiAoaXRlbVthdHRyXSA9PT0gdm9pZCAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBpdGVtW2F0dHJdO1xuICAgIHN3aXRjaCAoYXR0cikge1xuICAgICAgY2FzZSBcImlubGluZVwiOlxuICAgICAgY2FzZSBcInNsaWNlXCI6XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgcmVzdWx0W2F0dHJdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaEZsaXBcIjpcbiAgICAgIGNhc2UgXCJ2RmxpcFwiOlxuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICByZXN1bHRbYXR0cl0gPSAhcmVzdWx0W2F0dHJdO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImhBbGlnblwiOlxuICAgICAgY2FzZSBcInZBbGlnblwiOlxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgcmVzdWx0W2F0dHJdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwid2lkdGhcIjpcbiAgICAgIGNhc2UgXCJoZWlnaHRcIjpcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSAhPT0gXCJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgdmFsdWUgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXN1bHRbYXR0cl0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyb3RhdGVcIjpcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIHJlc3VsdFthdHRyXSArPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuY29uc3QgdW5pdHNTcGxpdCA9IC8oLT9bMC05Ll0qWzAtOV0rWzAtOS5dKikvZztcbmNvbnN0IHVuaXRzVGVzdCA9IC9eLT9bMC05Ll0qWzAtOV0rWzAtOS5dKiQvZztcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpemUoc2l6ZSwgcmF0aW8sIHByZWNpc2lvbikge1xuICBpZiAocmF0aW8gPT09IDEpIHtcbiAgICByZXR1cm4gc2l6ZTtcbiAgfVxuICBwcmVjaXNpb24gPSBwcmVjaXNpb24gPT09IHZvaWQgMCA/IDEwMCA6IHByZWNpc2lvbjtcbiAgaWYgKHR5cGVvZiBzaXplID09PSBcIm51bWJlclwiKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbChzaXplICogcmF0aW8gKiBwcmVjaXNpb24pIC8gcHJlY2lzaW9uO1xuICB9XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBzaXplO1xuICB9XG4gIGNvbnN0IG9sZFBhcnRzID0gc2l6ZS5zcGxpdCh1bml0c1NwbGl0KTtcbiAgaWYgKG9sZFBhcnRzID09PSBudWxsIHx8ICFvbGRQYXJ0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gc2l6ZTtcbiAgfVxuICBjb25zdCBuZXdQYXJ0cyA9IFtdO1xuICBsZXQgY29kZSA9IG9sZFBhcnRzLnNoaWZ0KCk7XG4gIGxldCBpc051bWJlciA9IHVuaXRzVGVzdC50ZXN0KGNvZGUpO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChpc051bWJlcikge1xuICAgICAgY29uc3QgbnVtID0gcGFyc2VGbG9hdChjb2RlKTtcbiAgICAgIGlmIChpc05hTihudW0pKSB7XG4gICAgICAgIG5ld1BhcnRzLnB1c2goY29kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdQYXJ0cy5wdXNoKE1hdGguY2VpbChudW0gKiByYXRpbyAqIHByZWNpc2lvbikgLyBwcmVjaXNpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdQYXJ0cy5wdXNoKGNvZGUpO1xuICAgIH1cbiAgICBjb2RlID0gb2xkUGFydHMuc2hpZnQoKTtcbiAgICBpZiAoY29kZSA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbmV3UGFydHMuam9pbihcIlwiKTtcbiAgICB9XG4gICAgaXNOdW1iZXIgPSAhaXNOdW1iZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJlc2VydmVBc3BlY3RSYXRpbyhwcm9wcykge1xuICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgc3dpdGNoIChwcm9wcy5oQWxpZ24pIHtcbiAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgcmVzdWx0ICs9IFwieE1pblwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICByZXN1bHQgKz0gXCJ4TWF4XCI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmVzdWx0ICs9IFwieE1pZFwiO1xuICB9XG4gIHN3aXRjaCAocHJvcHMudkFsaWduKSB7XG4gICAgY2FzZSBcInRvcFwiOlxuICAgICAgcmVzdWx0ICs9IFwiWU1pblwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgcmVzdWx0ICs9IFwiWU1heFwiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlc3VsdCArPSBcIllNaWRcIjtcbiAgfVxuICByZXN1bHQgKz0gcHJvcHMuc2xpY2UgPyBcIiBzbGljZVwiIDogXCIgbWVldFwiO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gaWNvblRvU1ZHKGljb24sIGN1c3RvbWlzYXRpb25zKSB7XG4gIGNvbnN0IGJveCA9IHtcbiAgICBsZWZ0OiBpY29uLmxlZnQsXG4gICAgdG9wOiBpY29uLnRvcCxcbiAgICB3aWR0aDogaWNvbi53aWR0aCxcbiAgICBoZWlnaHQ6IGljb24uaGVpZ2h0XG4gIH07XG4gIGxldCBib2R5ID0gaWNvbi5ib2R5O1xuICBbaWNvbiwgY3VzdG9taXNhdGlvbnNdLmZvckVhY2goKHByb3BzKSA9PiB7XG4gICAgY29uc3QgdHJhbnNmb3JtYXRpb25zID0gW107XG4gICAgY29uc3QgaEZsaXAgPSBwcm9wcy5oRmxpcDtcbiAgICBjb25zdCB2RmxpcCA9IHByb3BzLnZGbGlwO1xuICAgIGxldCByb3RhdGlvbiA9IHByb3BzLnJvdGF0ZTtcbiAgICBpZiAoaEZsaXApIHtcbiAgICAgIGlmICh2RmxpcCkge1xuICAgICAgICByb3RhdGlvbiArPSAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNmb3JtYXRpb25zLnB1c2goXCJ0cmFuc2xhdGUoXCIgKyAoYm94LndpZHRoICsgYm94LmxlZnQpLnRvU3RyaW5nKCkgKyBcIiBcIiArICgwIC0gYm94LnRvcCkudG9TdHJpbmcoKSArIFwiKVwiKTtcbiAgICAgICAgdHJhbnNmb3JtYXRpb25zLnB1c2goXCJzY2FsZSgtMSAxKVwiKTtcbiAgICAgICAgYm94LnRvcCA9IGJveC5sZWZ0ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZGbGlwKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbnMucHVzaChcInRyYW5zbGF0ZShcIiArICgwIC0gYm94LmxlZnQpLnRvU3RyaW5nKCkgKyBcIiBcIiArIChib3guaGVpZ2h0ICsgYm94LnRvcCkudG9TdHJpbmcoKSArIFwiKVwiKTtcbiAgICAgIHRyYW5zZm9ybWF0aW9ucy5wdXNoKFwic2NhbGUoMSAtMSlcIik7XG4gICAgICBib3gudG9wID0gYm94LmxlZnQgPSAwO1xuICAgIH1cbiAgICBsZXQgdGVtcFZhbHVlO1xuICAgIGlmIChyb3RhdGlvbiA8IDApIHtcbiAgICAgIHJvdGF0aW9uIC09IE1hdGguZmxvb3Iocm90YXRpb24gLyA0KSAqIDQ7XG4gICAgfVxuICAgIHJvdGF0aW9uID0gcm90YXRpb24gJSA0O1xuICAgIHN3aXRjaCAocm90YXRpb24pIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGVtcFZhbHVlID0gYm94LmhlaWdodCAvIDIgKyBib3gudG9wO1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbnMudW5zaGlmdChcInJvdGF0ZSg5MCBcIiArIHRlbXBWYWx1ZS50b1N0cmluZygpICsgXCIgXCIgKyB0ZW1wVmFsdWUudG9TdHJpbmcoKSArIFwiKVwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRyYW5zZm9ybWF0aW9ucy51bnNoaWZ0KFwicm90YXRlKDE4MCBcIiArIChib3gud2lkdGggLyAyICsgYm94LmxlZnQpLnRvU3RyaW5nKCkgKyBcIiBcIiArIChib3guaGVpZ2h0IC8gMiArIGJveC50b3ApLnRvU3RyaW5nKCkgKyBcIilcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0ZW1wVmFsdWUgPSBib3gud2lkdGggLyAyICsgYm94LmxlZnQ7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9ucy51bnNoaWZ0KFwicm90YXRlKC05MCBcIiArIHRlbXBWYWx1ZS50b1N0cmluZygpICsgXCIgXCIgKyB0ZW1wVmFsdWUudG9TdHJpbmcoKSArIFwiKVwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChyb3RhdGlvbiAlIDIgPT09IDEpIHtcbiAgICAgIGlmIChib3gubGVmdCAhPT0gMCB8fCBib3gudG9wICE9PSAwKSB7XG4gICAgICAgIHRlbXBWYWx1ZSA9IGJveC5sZWZ0O1xuICAgICAgICBib3gubGVmdCA9IGJveC50b3A7XG4gICAgICAgIGJveC50b3AgPSB0ZW1wVmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoYm94LndpZHRoICE9PSBib3guaGVpZ2h0KSB7XG4gICAgICAgIHRlbXBWYWx1ZSA9IGJveC53aWR0aDtcbiAgICAgICAgYm94LndpZHRoID0gYm94LmhlaWdodDtcbiAgICAgICAgYm94LmhlaWdodCA9IHRlbXBWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRyYW5zZm9ybWF0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGJvZHkgPSAnPGcgdHJhbnNmb3JtPVwiJyArIHRyYW5zZm9ybWF0aW9ucy5qb2luKFwiIFwiKSArICdcIj4nICsgYm9keSArIFwiPC9nPlwiO1xuICAgIH1cbiAgfSk7XG4gIGxldCB3aWR0aCwgaGVpZ2h0O1xuICBpZiAoY3VzdG9taXNhdGlvbnMud2lkdGggPT09IG51bGwgJiYgY3VzdG9taXNhdGlvbnMuaGVpZ2h0ID09PSBudWxsKSB7XG4gICAgaGVpZ2h0ID0gXCIxZW1cIjtcbiAgICB3aWR0aCA9IGNhbGN1bGF0ZVNpemUoaGVpZ2h0LCBib3gud2lkdGggLyBib3guaGVpZ2h0KTtcbiAgfSBlbHNlIGlmIChjdXN0b21pc2F0aW9ucy53aWR0aCAhPT0gbnVsbCAmJiBjdXN0b21pc2F0aW9ucy5oZWlnaHQgIT09IG51bGwpIHtcbiAgICB3aWR0aCA9IGN1c3RvbWlzYXRpb25zLndpZHRoO1xuICAgIGhlaWdodCA9IGN1c3RvbWlzYXRpb25zLmhlaWdodDtcbiAgfSBlbHNlIGlmIChjdXN0b21pc2F0aW9ucy5oZWlnaHQgIT09IG51bGwpIHtcbiAgICBoZWlnaHQgPSBjdXN0b21pc2F0aW9ucy5oZWlnaHQ7XG4gICAgd2lkdGggPSBjYWxjdWxhdGVTaXplKGhlaWdodCwgYm94LndpZHRoIC8gYm94LmhlaWdodCk7XG4gIH0gZWxzZSB7XG4gICAgd2lkdGggPSBjdXN0b21pc2F0aW9ucy53aWR0aDtcbiAgICBoZWlnaHQgPSBjYWxjdWxhdGVTaXplKHdpZHRoLCBib3guaGVpZ2h0IC8gYm94LndpZHRoKTtcbiAgfVxuICBpZiAod2lkdGggPT09IFwiYXV0b1wiKSB7XG4gICAgd2lkdGggPSBib3gud2lkdGg7XG4gIH1cbiAgaWYgKGhlaWdodCA9PT0gXCJhdXRvXCIpIHtcbiAgICBoZWlnaHQgPSBib3guaGVpZ2h0O1xuICB9XG4gIHdpZHRoID0gdHlwZW9mIHdpZHRoID09PSBcInN0cmluZ1wiID8gd2lkdGggOiB3aWR0aC50b1N0cmluZygpICsgXCJcIjtcbiAgaGVpZ2h0ID0gdHlwZW9mIGhlaWdodCA9PT0gXCJzdHJpbmdcIiA/IGhlaWdodCA6IGhlaWdodC50b1N0cmluZygpICsgXCJcIjtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogcHJlc2VydmVBc3BlY3RSYXRpbyhjdXN0b21pc2F0aW9ucyksXG4gICAgICB2aWV3Qm94OiBib3gubGVmdC50b1N0cmluZygpICsgXCIgXCIgKyBib3gudG9wLnRvU3RyaW5nKCkgKyBcIiBcIiArIGJveC53aWR0aC50b1N0cmluZygpICsgXCIgXCIgKyBib3guaGVpZ2h0LnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGJvZHlcbiAgfTtcbiAgaWYgKGN1c3RvbWlzYXRpb25zLmlubGluZSkge1xuICAgIHJlc3VsdC5pbmxpbmUgPSB0cnVlO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSWNvbihpY29uLCBjdXN0b21pc2F0aW9ucykge1xuICByZXR1cm4gaWNvblRvU1ZHKGZ1bGxJY29uKGljb24pLCBjdXN0b21pc2F0aW9ucyA/IG1lcmdlQ3VzdG9taXNhdGlvbnMoZGVmYXVsdHMsIGN1c3RvbWlzYXRpb25zKSA6IGRlZmF1bHRzKTtcbn1cblxuY29uc3QgcmVnZXggPSAvXFxzaWQ9XCIoXFxTKylcIi9nO1xuY29uc3QgcmFuZG9tUHJlZml4ID0gXCJJY29uaWZ5SWRcIiArIERhdGUubm93KCkudG9TdHJpbmcoMTYpICsgKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNiB8IDApLnRvU3RyaW5nKDE2KTtcbmxldCBjb3VudGVyID0gMDtcbmZ1bmN0aW9uIHJlcGxhY2VJRHMoYm9keSwgcHJlZml4ID0gcmFuZG9tUHJlZml4KSB7XG4gIGNvbnN0IGlkcyA9IFtdO1xuICBsZXQgbWF0Y2g7XG4gIHdoaWxlIChtYXRjaCA9IHJlZ2V4LmV4ZWMoYm9keSkpIHtcbiAgICBpZHMucHVzaChtYXRjaFsxXSk7XG4gIH1cbiAgaWYgKCFpZHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cbiAgaWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgY29uc3QgbmV3SUQgPSB0eXBlb2YgcHJlZml4ID09PSBcImZ1bmN0aW9uXCIgPyBwcmVmaXgoaWQpIDogcHJlZml4ICsgKGNvdW50ZXIrKykudG9TdHJpbmcoKTtcbiAgICBjb25zdCBlc2NhcGVkSUQgPSBpZC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgXCJcXFxcJCZcIik7XG4gICAgYm9keSA9IGJvZHkucmVwbGFjZShuZXcgUmVnRXhwKCcoWyM7XCJdKSgnICsgZXNjYXBlZElEICsgJykoW1wiKV18XFxcXC5bYS16XSknLCBcImdcIiksIFwiJDFcIiArIG5ld0lEICsgXCIkM1wiKTtcbiAgfSk7XG4gIHJldHVybiBib2R5O1xufVxuXG5jb25zdCBjYWNoZVZlcnNpb24gPSBcImljb25pZnkyXCI7XG5jb25zdCBjYWNoZVByZWZpeCA9IFwiaWNvbmlmeVwiO1xuY29uc3QgY291bnRLZXkgPSBjYWNoZVByZWZpeCArIFwiLWNvdW50XCI7XG5jb25zdCB2ZXJzaW9uS2V5ID0gY2FjaGVQcmVmaXggKyBcIi12ZXJzaW9uXCI7XG5jb25zdCBob3VyID0gMzZlNTtcbmNvbnN0IGNhY2hlRXhwaXJhdGlvbiA9IDE2ODtcbmNvbnN0IGNvbmZpZyA9IHtcbiAgbG9jYWw6IHRydWUsXG4gIHNlc3Npb246IHRydWVcbn07XG5sZXQgbG9hZGVkID0gZmFsc2U7XG5jb25zdCBjb3VudCA9IHtcbiAgbG9jYWw6IDAsXG4gIHNlc3Npb246IDBcbn07XG5jb25zdCBlbXB0eUxpc3QgPSB7XG4gIGxvY2FsOiBbXSxcbiAgc2Vzc2lvbjogW11cbn07XG5sZXQgX3dpbmRvdyA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyB7fSA6IHdpbmRvdztcbmZ1bmN0aW9uIGdldEdsb2JhbChrZXkpIHtcbiAgY29uc3QgYXR0ciA9IGtleSArIFwiU3RvcmFnZVwiO1xuICB0cnkge1xuICAgIGlmIChfd2luZG93ICYmIF93aW5kb3dbYXR0cl0gJiYgdHlwZW9mIF93aW5kb3dbYXR0cl0ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gX3dpbmRvd1thdHRyXTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICB9XG4gIGNvbmZpZ1trZXldID0gZmFsc2U7XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gc2V0Q291bnQoc3RvcmFnZSwga2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIHN0b3JhZ2Uuc2V0SXRlbShjb3VudEtleSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgY291bnRba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldENvdW50KHN0b3JhZ2UpIHtcbiAgY29uc3QgY291bnQyID0gc3RvcmFnZS5nZXRJdGVtKGNvdW50S2V5KTtcbiAgaWYgKGNvdW50Mikge1xuICAgIGNvbnN0IHRvdGFsID0gcGFyc2VJbnQoY291bnQyKTtcbiAgICByZXR1cm4gdG90YWwgPyB0b3RhbCA6IDA7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5mdW5jdGlvbiBpbml0Q2FjaGUoc3RvcmFnZSwga2V5KSB7XG4gIHRyeSB7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHZlcnNpb25LZXksIGNhY2hlVmVyc2lvbik7XG4gIH0gY2F0Y2ggKGVycikge1xuICB9XG4gIHNldENvdW50KHN0b3JhZ2UsIGtleSwgMCk7XG59XG5mdW5jdGlvbiBkZXN0cm95Q2FjaGUoc3RvcmFnZSkge1xuICB0cnkge1xuICAgIGNvbnN0IHRvdGFsID0gZ2V0Q291bnQoc3RvcmFnZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKSB7XG4gICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oY2FjaGVQcmVmaXggKyBpLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gIH1cbn1cbmNvbnN0IGxvYWRDYWNoZSA9ICgpID0+IHtcbiAgaWYgKGxvYWRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBsb2FkZWQgPSB0cnVlO1xuICBjb25zdCBtaW5UaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gaG91cikgLSBjYWNoZUV4cGlyYXRpb247XG4gIGZ1bmN0aW9uIGxvYWQoa2V5KSB7XG4gICAgY29uc3QgZnVuYyA9IGdldEdsb2JhbChrZXkpO1xuICAgIGlmICghZnVuYykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBnZXRJdGVtID0gKGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gY2FjaGVQcmVmaXggKyBpbmRleC50b1N0cmluZygpO1xuICAgICAgY29uc3QgaXRlbSA9IGZ1bmMuZ2V0SXRlbShuYW1lKTtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoaXRlbSk7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZGF0YS5jYWNoZWQgIT09IFwibnVtYmVyXCIgfHwgZGF0YS5jYWNoZWQgPCBtaW5UaW1lIHx8IHR5cGVvZiBkYXRhLnByb3ZpZGVyICE9PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBkYXRhLmRhdGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGRhdGEuZGF0YS5wcmVmaXggIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gZGF0YS5wcm92aWRlcjtcbiAgICAgICAgICBjb25zdCBwcmVmaXggPSBkYXRhLmRhdGEucHJlZml4O1xuICAgICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKHByb3ZpZGVyLCBwcmVmaXgpO1xuICAgICAgICAgIHZhbGlkID0gYWRkSWNvblNldChzdG9yYWdlLCBkYXRhLmRhdGEpLmxlbmd0aCA+IDA7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICBmdW5jLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmVyc2lvbiA9IGZ1bmMuZ2V0SXRlbSh2ZXJzaW9uS2V5KTtcbiAgICAgIGlmICh2ZXJzaW9uICE9PSBjYWNoZVZlcnNpb24pIHtcbiAgICAgICAgaWYgKHZlcnNpb24pIHtcbiAgICAgICAgICBkZXN0cm95Q2FjaGUoZnVuYyk7XG4gICAgICAgIH1cbiAgICAgICAgaW5pdENhY2hlKGZ1bmMsIGtleSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCB0b3RhbCA9IGdldENvdW50KGZ1bmMpO1xuICAgICAgZm9yIChsZXQgaSA9IHRvdGFsIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKCFnZXRJdGVtKGkpKSB7XG4gICAgICAgICAgaWYgKGkgPT09IHRvdGFsIC0gMSkge1xuICAgICAgICAgICAgdG90YWwtLTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW1wdHlMaXN0W2tleV0ucHVzaChpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldENvdW50KGZ1bmMsIGtleSwgdG90YWwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWcpIHtcbiAgICBsb2FkKGtleSk7XG4gIH1cbn07XG5jb25zdCBzdG9yZUNhY2hlID0gKHByb3ZpZGVyLCBkYXRhKSA9PiB7XG4gIGlmICghbG9hZGVkKSB7XG4gICAgbG9hZENhY2hlKCk7XG4gIH1cbiAgZnVuY3Rpb24gc3RvcmUoa2V5KSB7XG4gICAgaWYgKCFjb25maWdba2V5XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBmdW5jID0gZ2V0R2xvYmFsKGtleSk7XG4gICAgaWYgKCFmdW5jKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpbmRleCA9IGVtcHR5TGlzdFtrZXldLnNoaWZ0KCk7XG4gICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHtcbiAgICAgIGluZGV4ID0gY291bnRba2V5XTtcbiAgICAgIGlmICghc2V0Q291bnQoZnVuYywga2V5LCBpbmRleCArIDEpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIGNhY2hlZDogTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gaG91ciksXG4gICAgICAgIHByb3ZpZGVyLFxuICAgICAgICBkYXRhXG4gICAgICB9O1xuICAgICAgZnVuYy5zZXRJdGVtKGNhY2hlUHJlZml4ICsgaW5kZXgudG9TdHJpbmcoKSwgSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoIU9iamVjdC5rZXlzKGRhdGEuaWNvbnMpLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZGF0YS5ub3RfZm91bmQpIHtcbiAgICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgZGVsZXRlIGRhdGEubm90X2ZvdW5kO1xuICB9XG4gIGlmICghc3RvcmUoXCJsb2NhbFwiKSkge1xuICAgIHN0b3JlKFwic2Vzc2lvblwiKTtcbiAgfVxufTtcblxuY29uc3QgY2FjaGUgPSB7fTtcblxuZnVuY3Rpb24gdG9nZ2xlQnJvd3NlckNhY2hlKHN0b3JhZ2UsIHZhbHVlKSB7XG4gIHN3aXRjaCAoc3RvcmFnZSkge1xuICAgIGNhc2UgXCJsb2NhbFwiOlxuICAgIGNhc2UgXCJzZXNzaW9uXCI6XG4gICAgICBjb25maWdbc3RvcmFnZV0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJhbGxcIjpcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZykge1xuICAgICAgICBjb25maWdba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuY29uc3Qgc3RvcmFnZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuZnVuY3Rpb24gc2V0QVBJTW9kdWxlKHByb3ZpZGVyLCBpdGVtKSB7XG4gIHN0b3JhZ2VbcHJvdmlkZXJdID0gaXRlbTtcbn1cbmZ1bmN0aW9uIGdldEFQSU1vZHVsZShwcm92aWRlcikge1xuICByZXR1cm4gc3RvcmFnZVtwcm92aWRlcl0gfHwgc3RvcmFnZVtcIlwiXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQVBJQ29uZmlnKHNvdXJjZSkge1xuICBsZXQgcmVzb3VyY2VzO1xuICBpZiAodHlwZW9mIHNvdXJjZS5yZXNvdXJjZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXNvdXJjZXMgPSBbc291cmNlLnJlc291cmNlc107XG4gIH0gZWxzZSB7XG4gICAgcmVzb3VyY2VzID0gc291cmNlLnJlc291cmNlcztcbiAgICBpZiAoIShyZXNvdXJjZXMgaW5zdGFuY2VvZiBBcnJheSkgfHwgIXJlc291cmNlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgcmVzb3VyY2VzLFxuICAgIHBhdGg6IHNvdXJjZS5wYXRoID09PSB2b2lkIDAgPyBcIi9cIiA6IHNvdXJjZS5wYXRoLFxuICAgIG1heFVSTDogc291cmNlLm1heFVSTCA/IHNvdXJjZS5tYXhVUkwgOiA1MDAsXG4gICAgcm90YXRlOiBzb3VyY2Uucm90YXRlID8gc291cmNlLnJvdGF0ZSA6IDc1MCxcbiAgICB0aW1lb3V0OiBzb3VyY2UudGltZW91dCA/IHNvdXJjZS50aW1lb3V0IDogNWUzLFxuICAgIHJhbmRvbTogc291cmNlLnJhbmRvbSA9PT0gdHJ1ZSxcbiAgICBpbmRleDogc291cmNlLmluZGV4ID8gc291cmNlLmluZGV4IDogMCxcbiAgICBkYXRhQWZ0ZXJUaW1lb3V0OiBzb3VyY2UuZGF0YUFmdGVyVGltZW91dCAhPT0gZmFsc2VcbiAgfTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmNvbnN0IGZhbGxCYWNrQVBJU291cmNlcyA9IFtcbiAgXCJodHRwczovL2FwaS5zaW1wbGVzdmcuY29tXCIsXG4gIFwiaHR0cHM6Ly9hcGkudW5pc3ZnLmNvbVwiXG5dO1xuY29uc3QgZmFsbEJhY2tBUEkgPSBbXTtcbndoaWxlIChmYWxsQmFja0FQSVNvdXJjZXMubGVuZ3RoID4gMCkge1xuICBpZiAoZmFsbEJhY2tBUElTb3VyY2VzLmxlbmd0aCA9PT0gMSkge1xuICAgIGZhbGxCYWNrQVBJLnB1c2goZmFsbEJhY2tBUElTb3VyY2VzLnNoaWZ0KCkpO1xuICB9IGVsc2Uge1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBmYWxsQmFja0FQSS5wdXNoKGZhbGxCYWNrQVBJU291cmNlcy5zaGlmdCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFsbEJhY2tBUEkucHVzaChmYWxsQmFja0FQSVNvdXJjZXMucG9wKCkpO1xuICAgIH1cbiAgfVxufVxuY29uZmlnU3RvcmFnZVtcIlwiXSA9IGNyZWF0ZUFQSUNvbmZpZyh7XG4gIHJlc291cmNlczogW1wiaHR0cHM6Ly9hcGkuaWNvbmlmeS5kZXNpZ25cIl0uY29uY2F0KGZhbGxCYWNrQVBJKVxufSk7XG5mdW5jdGlvbiBhZGRBUElQcm92aWRlcihwcm92aWRlciwgY3VzdG9tQ29uZmlnKSB7XG4gIGNvbnN0IGNvbmZpZyA9IGNyZWF0ZUFQSUNvbmZpZyhjdXN0b21Db25maWcpO1xuICBpZiAoY29uZmlnID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbmZpZ1N0b3JhZ2VbcHJvdmlkZXJdID0gY29uZmlnO1xuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldEFQSUNvbmZpZyhwcm92aWRlcikge1xuICByZXR1cm4gY29uZmlnU3RvcmFnZVtwcm92aWRlcl07XG59XG5mdW5jdGlvbiBsaXN0QVBJUHJvdmlkZXJzKCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoY29uZmlnU3RvcmFnZSk7XG59XG5cbmNvbnN0IG1lcmdlUGFyYW1zID0gKGJhc2UsIHBhcmFtcykgPT4ge1xuICBsZXQgcmVzdWx0ID0gYmFzZSwgaGFzUGFyYW1zID0gcmVzdWx0LmluZGV4T2YoXCI/XCIpICE9PSAtMTtcbiAgZnVuY3Rpb24gcGFyYW1Ub1N0cmluZyh2YWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICByZXR1cm4gdmFsdWUgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcbiAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXJhbWV0ZXJcIik7XG4gICAgfVxuICB9XG4gIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgbGV0IHZhbHVlO1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IHBhcmFtVG9TdHJpbmcocGFyYW1zW2tleV0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXN1bHQgKz0gKGhhc1BhcmFtcyA/IFwiJlwiIDogXCI/XCIpICsgZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArIHZhbHVlO1xuICAgIGhhc1BhcmFtcyA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgbWF4TGVuZ3RoQ2FjaGUgPSB7fTtcbmNvbnN0IHBhdGhDYWNoZSA9IHt9O1xuY29uc3QgZGV0ZWN0RmV0Y2ggPSAoKSA9PiB7XG4gIGxldCBjYWxsYmFjaztcbiAgdHJ5IHtcbiAgICBjYWxsYmFjayA9IGZldGNoO1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xubGV0IGZldGNoTW9kdWxlID0gZGV0ZWN0RmV0Y2goKTtcbmZ1bmN0aW9uIHNldEZldGNoKGZldGNoMikge1xuICBmZXRjaE1vZHVsZSA9IGZldGNoMjtcbn1cbmZ1bmN0aW9uIGdldEZldGNoKCkge1xuICByZXR1cm4gZmV0Y2hNb2R1bGU7XG59XG5mdW5jdGlvbiBjYWxjdWxhdGVNYXhMZW5ndGgocHJvdmlkZXIsIHByZWZpeCkge1xuICBjb25zdCBjb25maWcgPSBnZXRBUElDb25maWcocHJvdmlkZXIpO1xuICBpZiAoIWNvbmZpZykge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGxldCByZXN1bHQ7XG4gIGlmICghY29uZmlnLm1heFVSTCkge1xuICAgIHJlc3VsdCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbGV0IG1heEhvc3RMZW5ndGggPSAwO1xuICAgIGNvbmZpZy5yZXNvdXJjZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgaG9zdCA9IGl0ZW07XG4gICAgICBtYXhIb3N0TGVuZ3RoID0gTWF0aC5tYXgobWF4SG9zdExlbmd0aCwgaG9zdC5sZW5ndGgpO1xuICAgIH0pO1xuICAgIGNvbnN0IHVybCA9IG1lcmdlUGFyYW1zKHByZWZpeCArIFwiLmpzb25cIiwge1xuICAgICAgaWNvbnM6IFwiXCJcbiAgICB9KTtcbiAgICByZXN1bHQgPSBjb25maWcubWF4VVJMIC0gbWF4SG9zdExlbmd0aCAtIGNvbmZpZy5wYXRoLmxlbmd0aCAtIHVybC5sZW5ndGg7XG4gIH1cbiAgY29uc3QgY2FjaGVLZXkgPSBwcm92aWRlciArIFwiOlwiICsgcHJlZml4O1xuICBwYXRoQ2FjaGVbcHJvdmlkZXJdID0gY29uZmlnLnBhdGg7XG4gIG1heExlbmd0aENhY2hlW2NhY2hlS2V5XSA9IHJlc3VsdDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHNob3VsZEFib3J0KHN0YXR1cykge1xuICByZXR1cm4gc3RhdHVzID09PSA0MDQ7XG59XG5jb25zdCBwcmVwYXJlID0gKHByb3ZpZGVyLCBwcmVmaXgsIGljb25zKSA9PiB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgbGV0IG1heExlbmd0aCA9IG1heExlbmd0aENhY2hlW3ByZWZpeF07XG4gIGlmIChtYXhMZW5ndGggPT09IHZvaWQgMCkge1xuICAgIG1heExlbmd0aCA9IGNhbGN1bGF0ZU1heExlbmd0aChwcm92aWRlciwgcHJlZml4KTtcbiAgfVxuICBjb25zdCB0eXBlID0gXCJpY29uc1wiO1xuICBsZXQgaXRlbSA9IHtcbiAgICB0eXBlLFxuICAgIHByb3ZpZGVyLFxuICAgIHByZWZpeCxcbiAgICBpY29uczogW11cbiAgfTtcbiAgbGV0IGxlbmd0aCA9IDA7XG4gIGljb25zLmZvckVhY2goKG5hbWUsIGluZGV4KSA9PiB7XG4gICAgbGVuZ3RoICs9IG5hbWUubGVuZ3RoICsgMTtcbiAgICBpZiAobGVuZ3RoID49IG1heExlbmd0aCAmJiBpbmRleCA+IDApIHtcbiAgICAgIHJlc3VsdHMucHVzaChpdGVtKTtcbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHByb3ZpZGVyLFxuICAgICAgICBwcmVmaXgsXG4gICAgICAgIGljb25zOiBbXVxuICAgICAgfTtcbiAgICAgIGxlbmd0aCA9IG5hbWUubGVuZ3RoO1xuICAgIH1cbiAgICBpdGVtLmljb25zLnB1c2gobmFtZSk7XG4gIH0pO1xuICByZXN1bHRzLnB1c2goaXRlbSk7XG4gIHJldHVybiByZXN1bHRzO1xufTtcbmZ1bmN0aW9uIGdldFBhdGgocHJvdmlkZXIpIHtcbiAgaWYgKHR5cGVvZiBwcm92aWRlciA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmIChwYXRoQ2FjaGVbcHJvdmlkZXJdID09PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGdldEFQSUNvbmZpZyhwcm92aWRlcik7XG4gICAgICBpZiAoIWNvbmZpZykge1xuICAgICAgICByZXR1cm4gXCIvXCI7XG4gICAgICB9XG4gICAgICBwYXRoQ2FjaGVbcHJvdmlkZXJdID0gY29uZmlnLnBhdGg7XG4gICAgfVxuICAgIHJldHVybiBwYXRoQ2FjaGVbcHJvdmlkZXJdO1xuICB9XG4gIHJldHVybiBcIi9cIjtcbn1cbmNvbnN0IHNlbmQgPSAoaG9zdCwgcGFyYW1zLCBjYWxsYmFjaykgPT4ge1xuICBpZiAoIWZldGNoTW9kdWxlKSB7XG4gICAgY2FsbGJhY2soXCJhYm9ydFwiLCA0MjQpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgcGF0aCA9IGdldFBhdGgocGFyYW1zLnByb3ZpZGVyKTtcbiAgc3dpdGNoIChwYXJhbXMudHlwZSkge1xuICAgIGNhc2UgXCJpY29uc1wiOiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBwYXJhbXMucHJlZml4O1xuICAgICAgY29uc3QgaWNvbnMgPSBwYXJhbXMuaWNvbnM7XG4gICAgICBjb25zdCBpY29uc0xpc3QgPSBpY29ucy5qb2luKFwiLFwiKTtcbiAgICAgIHBhdGggKz0gbWVyZ2VQYXJhbXMocHJlZml4ICsgXCIuanNvblwiLCB7XG4gICAgICAgIGljb25zOiBpY29uc0xpc3RcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJjdXN0b21cIjoge1xuICAgICAgY29uc3QgdXJpID0gcGFyYW1zLnVyaTtcbiAgICAgIHBhdGggKz0gdXJpLnNsaWNlKDAsIDEpID09PSBcIi9cIiA/IHVyaS5zbGljZSgxKSA6IHVyaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgY2FsbGJhY2soXCJhYm9ydFwiLCA0MDApO1xuICAgICAgcmV0dXJuO1xuICB9XG4gIGxldCBkZWZhdWx0RXJyb3IgPSA1MDM7XG4gIGZldGNoTW9kdWxlKGhvc3QgKyBwYXRoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBpZiAoc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjYWxsYmFjayhzaG91bGRBYm9ydChzdGF0dXMpID8gXCJhYm9ydFwiIDogXCJuZXh0XCIsIHN0YXR1cyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVmYXVsdEVycm9yID0gNTAxO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwib2JqZWN0XCIgfHwgZGF0YSA9PT0gbnVsbCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKFwibmV4dFwiLCBkZWZhdWx0RXJyb3IpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2FsbGJhY2soXCJzdWNjZXNzXCIsIGRhdGEpO1xuICAgIH0pO1xuICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgY2FsbGJhY2soXCJuZXh0XCIsIGRlZmF1bHRFcnJvcik7XG4gIH0pO1xufTtcbmNvbnN0IGZldGNoQVBJTW9kdWxlID0ge1xuICBwcmVwYXJlLFxuICBzZW5kXG59O1xuXG5mdW5jdGlvbiBzb3J0SWNvbnMoaWNvbnMpIHtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIGxvYWRlZDogW10sXG4gICAgbWlzc2luZzogW10sXG4gICAgcGVuZGluZzogW11cbiAgfTtcbiAgY29uc3Qgc3RvcmFnZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBpY29ucy5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEucHJvdmlkZXIgIT09IGIucHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiBhLnByb3ZpZGVyLmxvY2FsZUNvbXBhcmUoYi5wcm92aWRlcik7XG4gICAgfVxuICAgIGlmIChhLnByZWZpeCAhPT0gYi5wcmVmaXgpIHtcbiAgICAgIHJldHVybiBhLnByZWZpeC5sb2NhbGVDb21wYXJlKGIucHJlZml4KTtcbiAgICB9XG4gICAgcmV0dXJuIGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSk7XG4gIH0pO1xuICBsZXQgbGFzdEljb24gPSB7XG4gICAgcHJvdmlkZXI6IFwiXCIsXG4gICAgcHJlZml4OiBcIlwiLFxuICAgIG5hbWU6IFwiXCJcbiAgfTtcbiAgaWNvbnMuZm9yRWFjaCgoaWNvbikgPT4ge1xuICAgIGlmIChsYXN0SWNvbi5uYW1lID09PSBpY29uLm5hbWUgJiYgbGFzdEljb24ucHJlZml4ID09PSBpY29uLnByZWZpeCAmJiBsYXN0SWNvbi5wcm92aWRlciA9PT0gaWNvbi5wcm92aWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsYXN0SWNvbiA9IGljb247XG4gICAgY29uc3QgcHJvdmlkZXIgPSBpY29uLnByb3ZpZGVyO1xuICAgIGNvbnN0IHByZWZpeCA9IGljb24ucHJlZml4O1xuICAgIGNvbnN0IG5hbWUgPSBpY29uLm5hbWU7XG4gICAgaWYgKHN0b3JhZ2VbcHJvdmlkZXJdID09PSB2b2lkIDApIHtcbiAgICAgIHN0b3JhZ2VbcHJvdmlkZXJdID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIGNvbnN0IHByb3ZpZGVyU3RvcmFnZSA9IHN0b3JhZ2VbcHJvdmlkZXJdO1xuICAgIGlmIChwcm92aWRlclN0b3JhZ2VbcHJlZml4XSA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm92aWRlclN0b3JhZ2VbcHJlZml4XSA9IGdldFN0b3JhZ2UocHJvdmlkZXIsIHByZWZpeCk7XG4gICAgfVxuICAgIGNvbnN0IGxvY2FsU3RvcmFnZSA9IHByb3ZpZGVyU3RvcmFnZVtwcmVmaXhdO1xuICAgIGxldCBsaXN0O1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuaWNvbnNbbmFtZV0gIT09IHZvaWQgMCkge1xuICAgICAgbGlzdCA9IHJlc3VsdC5sb2FkZWQ7XG4gICAgfSBlbHNlIGlmIChwcmVmaXggPT09IFwiXCIgfHwgbG9jYWxTdG9yYWdlLm1pc3NpbmdbbmFtZV0gIT09IHZvaWQgMCkge1xuICAgICAgbGlzdCA9IHJlc3VsdC5taXNzaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ID0gcmVzdWx0LnBlbmRpbmc7XG4gICAgfVxuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICBwcm92aWRlcixcbiAgICAgIHByZWZpeCxcbiAgICAgIG5hbWVcbiAgICB9O1xuICAgIGxpc3QucHVzaChpdGVtKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IGNhbGxiYWNrcyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuY29uc3QgcGVuZGluZ1VwZGF0ZXMgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmZ1bmN0aW9uIHJlbW92ZUNhbGxiYWNrKHNvdXJjZXMsIGlkKSB7XG4gIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBzb3VyY2UucHJvdmlkZXI7XG4gICAgaWYgKGNhbGxiYWNrc1twcm92aWRlcl0gPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwcm92aWRlckNhbGxiYWNrcyA9IGNhbGxiYWNrc1twcm92aWRlcl07XG4gICAgY29uc3QgcHJlZml4ID0gc291cmNlLnByZWZpeDtcbiAgICBjb25zdCBpdGVtcyA9IHByb3ZpZGVyQ2FsbGJhY2tzW3ByZWZpeF07XG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICBwcm92aWRlckNhbGxiYWNrc1twcmVmaXhdID0gaXRlbXMuZmlsdGVyKChyb3cpID0+IHJvdy5pZCAhPT0gaWQpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVDYWxsYmFja3MocHJvdmlkZXIsIHByZWZpeCkge1xuICBpZiAocGVuZGluZ1VwZGF0ZXNbcHJvdmlkZXJdID09PSB2b2lkIDApIHtcbiAgICBwZW5kaW5nVXBkYXRlc1twcm92aWRlcl0gPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuICBjb25zdCBwcm92aWRlclBlbmRpbmdVcGRhdGVzID0gcGVuZGluZ1VwZGF0ZXNbcHJvdmlkZXJdO1xuICBpZiAoIXByb3ZpZGVyUGVuZGluZ1VwZGF0ZXNbcHJlZml4XSkge1xuICAgIHByb3ZpZGVyUGVuZGluZ1VwZGF0ZXNbcHJlZml4XSA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwcm92aWRlclBlbmRpbmdVcGRhdGVzW3ByZWZpeF0gPSBmYWxzZTtcbiAgICAgIGlmIChjYWxsYmFja3NbcHJvdmlkZXJdID09PSB2b2lkIDAgfHwgY2FsbGJhY2tzW3Byb3ZpZGVyXVtwcmVmaXhdID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaXRlbXMgPSBjYWxsYmFja3NbcHJvdmlkZXJdW3ByZWZpeF0uc2xpY2UoMCk7XG4gICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdG9yYWdlID0gZ2V0U3RvcmFnZShwcm92aWRlciwgcHJlZml4KTtcbiAgICAgIGxldCBoYXNQZW5kaW5nID0gZmFsc2U7XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGljb25zID0gaXRlbS5pY29ucztcbiAgICAgICAgY29uc3Qgb2xkTGVuZ3RoID0gaWNvbnMucGVuZGluZy5sZW5ndGg7XG4gICAgICAgIGljb25zLnBlbmRpbmcgPSBpY29ucy5wZW5kaW5nLmZpbHRlcigoaWNvbikgPT4ge1xuICAgICAgICAgIGlmIChpY29uLnByZWZpeCAhPT0gcHJlZml4KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGljb24ubmFtZTtcbiAgICAgICAgICBpZiAoc3RvcmFnZS5pY29uc1tuYW1lXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBpY29ucy5sb2FkZWQucHVzaCh7XG4gICAgICAgICAgICAgIHByb3ZpZGVyLFxuICAgICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RvcmFnZS5taXNzaW5nW25hbWVdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGljb25zLm1pc3NpbmcucHVzaCh7XG4gICAgICAgICAgICAgIHByb3ZpZGVyLFxuICAgICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYXNQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaWNvbnMucGVuZGluZy5sZW5ndGggIT09IG9sZExlbmd0aCkge1xuICAgICAgICAgIGlmICghaGFzUGVuZGluZykge1xuICAgICAgICAgICAgcmVtb3ZlQ2FsbGJhY2soW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgcHJlZml4XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sIGl0ZW0uaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLmNhbGxiYWNrKGljb25zLmxvYWRlZC5zbGljZSgwKSwgaWNvbnMubWlzc2luZy5zbGljZSgwKSwgaWNvbnMucGVuZGluZy5zbGljZSgwKSwgaXRlbS5hYm9ydCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5sZXQgaWRDb3VudGVyID0gMDtcbmZ1bmN0aW9uIHN0b3JlQ2FsbGJhY2soY2FsbGJhY2ssIGljb25zLCBwZW5kaW5nU291cmNlcykge1xuICBjb25zdCBpZCA9IGlkQ291bnRlcisrO1xuICBjb25zdCBhYm9ydCA9IHJlbW92ZUNhbGxiYWNrLmJpbmQobnVsbCwgcGVuZGluZ1NvdXJjZXMsIGlkKTtcbiAgaWYgKCFpY29ucy5wZW5kaW5nLmxlbmd0aCkge1xuICAgIHJldHVybiBhYm9ydDtcbiAgfVxuICBjb25zdCBpdGVtID0ge1xuICAgIGlkLFxuICAgIGljb25zLFxuICAgIGNhbGxiYWNrLFxuICAgIGFib3J0XG4gIH07XG4gIHBlbmRpbmdTb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gc291cmNlLnByb3ZpZGVyO1xuICAgIGNvbnN0IHByZWZpeCA9IHNvdXJjZS5wcmVmaXg7XG4gICAgaWYgKGNhbGxiYWNrc1twcm92aWRlcl0gPT09IHZvaWQgMCkge1xuICAgICAgY2FsbGJhY2tzW3Byb3ZpZGVyXSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBjb25zdCBwcm92aWRlckNhbGxiYWNrcyA9IGNhbGxiYWNrc1twcm92aWRlcl07XG4gICAgaWYgKHByb3ZpZGVyQ2FsbGJhY2tzW3ByZWZpeF0gPT09IHZvaWQgMCkge1xuICAgICAgcHJvdmlkZXJDYWxsYmFja3NbcHJlZml4XSA9IFtdO1xuICAgIH1cbiAgICBwcm92aWRlckNhbGxiYWNrc1twcmVmaXhdLnB1c2goaXRlbSk7XG4gIH0pO1xuICByZXR1cm4gYWJvcnQ7XG59XG5cbmZ1bmN0aW9uIGxpc3RUb0ljb25zKGxpc3QsIHZhbGlkYXRlID0gdHJ1ZSwgc2ltcGxlTmFtZXMgPSBmYWxzZSkge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgaWNvbiA9IHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiID8gc3RyaW5nVG9JY29uKGl0ZW0sIGZhbHNlLCBzaW1wbGVOYW1lcykgOiBpdGVtO1xuICAgIGlmICghdmFsaWRhdGUgfHwgdmFsaWRhdGVJY29uKGljb24sIHNpbXBsZU5hbWVzKSkge1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICBwcm92aWRlcjogaWNvbi5wcm92aWRlcixcbiAgICAgICAgcHJlZml4OiBpY29uLnByZWZpeCxcbiAgICAgICAgbmFtZTogaWNvbi5uYW1lXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBzcmMvY29uZmlnLnRzXG52YXIgZGVmYXVsdENvbmZpZyA9IHtcbiAgcmVzb3VyY2VzOiBbXSxcbiAgaW5kZXg6IDAsXG4gIHRpbWVvdXQ6IDJlMyxcbiAgcm90YXRlOiA3NTAsXG4gIHJhbmRvbTogZmFsc2UsXG4gIGRhdGFBZnRlclRpbWVvdXQ6IGZhbHNlXG59O1xuXG4vLyBzcmMvcXVlcnkudHNcbmZ1bmN0aW9uIHNlbmRRdWVyeShjb25maWcsIHBheWxvYWQsIHF1ZXJ5LCBkb25lKSB7XG4gIGNvbnN0IHJlc291cmNlc0NvdW50ID0gY29uZmlnLnJlc291cmNlcy5sZW5ndGg7XG4gIGNvbnN0IHN0YXJ0SW5kZXggPSBjb25maWcucmFuZG9tID8gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmVzb3VyY2VzQ291bnQpIDogY29uZmlnLmluZGV4O1xuICBsZXQgcmVzb3VyY2VzO1xuICBpZiAoY29uZmlnLnJhbmRvbSkge1xuICAgIGxldCBsaXN0ID0gY29uZmlnLnJlc291cmNlcy5zbGljZSgwKTtcbiAgICByZXNvdXJjZXMgPSBbXTtcbiAgICB3aGlsZSAobGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaXN0Lmxlbmd0aCk7XG4gICAgICByZXNvdXJjZXMucHVzaChsaXN0W25leHRJbmRleF0pO1xuICAgICAgbGlzdCA9IGxpc3Quc2xpY2UoMCwgbmV4dEluZGV4KS5jb25jYXQobGlzdC5zbGljZShuZXh0SW5kZXggKyAxKSk7XG4gICAgfVxuICAgIHJlc291cmNlcyA9IHJlc291cmNlcy5jb25jYXQobGlzdCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzb3VyY2VzID0gY29uZmlnLnJlc291cmNlcy5zbGljZShzdGFydEluZGV4KS5jb25jYXQoY29uZmlnLnJlc291cmNlcy5zbGljZSgwLCBzdGFydEluZGV4KSk7XG4gIH1cbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgbGV0IHN0YXR1cyA9IFwicGVuZGluZ1wiO1xuICBsZXQgcXVlcmllc1NlbnQgPSAwO1xuICBsZXQgbGFzdEVycm9yO1xuICBsZXQgdGltZXIgPSBudWxsO1xuICBsZXQgcXVldWUgPSBbXTtcbiAgbGV0IGRvbmVDYWxsYmFja3MgPSBbXTtcbiAgaWYgKHR5cGVvZiBkb25lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBkb25lQ2FsbGJhY2tzLnB1c2goZG9uZSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGFib3J0KCkge1xuICAgIGlmIChzdGF0dXMgPT09IFwicGVuZGluZ1wiKSB7XG4gICAgICBzdGF0dXMgPSBcImFib3J0ZWRcIjtcbiAgICB9XG4gICAgcmVzZXRUaW1lcigpO1xuICAgIHF1ZXVlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLnN0YXR1cyA9PT0gXCJwZW5kaW5nXCIpIHtcbiAgICAgICAgaXRlbS5zdGF0dXMgPSBcImFib3J0ZWRcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWV1ZSA9IFtdO1xuICB9XG4gIGZ1bmN0aW9uIHN1YnNjcmliZShjYWxsYmFjaywgb3ZlcndyaXRlKSB7XG4gICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgZG9uZUNhbGxiYWNrcyA9IFtdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGRvbmVDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGdldFF1ZXJ5U3RhdHVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydFRpbWUsXG4gICAgICBwYXlsb2FkLFxuICAgICAgc3RhdHVzLFxuICAgICAgcXVlcmllc1NlbnQsXG4gICAgICBxdWVyaWVzUGVuZGluZzogcXVldWUubGVuZ3RoLFxuICAgICAgc3Vic2NyaWJlLFxuICAgICAgYWJvcnRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGZhaWxRdWVyeSgpIHtcbiAgICBzdGF0dXMgPSBcImZhaWxlZFwiO1xuICAgIGRvbmVDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrKHZvaWQgMCwgbGFzdEVycm9yKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBjbGVhclF1ZXVlKCkge1xuICAgIHF1ZXVlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLnN0YXR1cyA9PT0gXCJwZW5kaW5nXCIpIHtcbiAgICAgICAgaXRlbS5zdGF0dXMgPSBcImFib3J0ZWRcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWV1ZSA9IFtdO1xuICB9XG4gIGZ1bmN0aW9uIG1vZHVsZVJlc3BvbnNlKGl0ZW0sIHJlc3BvbnNlLCBkYXRhKSB7XG4gICAgY29uc3QgaXNFcnJvciA9IHJlc3BvbnNlICE9PSBcInN1Y2Nlc3NcIjtcbiAgICBxdWV1ZSA9IHF1ZXVlLmZpbHRlcigocXVldWVkKSA9PiBxdWV1ZWQgIT09IGl0ZW0pO1xuICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICBjYXNlIFwicGVuZGluZ1wiOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgICAgaWYgKGlzRXJyb3IgfHwgIWNvbmZpZy5kYXRhQWZ0ZXJUaW1lb3V0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2UgPT09IFwiYWJvcnRcIikge1xuICAgICAgbGFzdEVycm9yID0gZGF0YTtcbiAgICAgIGZhaWxRdWVyeSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcikge1xuICAgICAgbGFzdEVycm9yID0gZGF0YTtcbiAgICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGlmICghcmVzb3VyY2VzLmxlbmd0aCkge1xuICAgICAgICAgIGZhaWxRdWVyeSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4ZWNOZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVzZXRUaW1lcigpO1xuICAgIGNsZWFyUXVldWUoKTtcbiAgICBpZiAoIWNvbmZpZy5yYW5kb20pIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY29uZmlnLnJlc291cmNlcy5pbmRleE9mKGl0ZW0ucmVzb3VyY2UpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSAmJiBpbmRleCAhPT0gY29uZmlnLmluZGV4KSB7XG4gICAgICAgIGNvbmZpZy5pbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICBzdGF0dXMgPSBcImNvbXBsZXRlZFwiO1xuICAgIGRvbmVDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGV4ZWNOZXh0KCkge1xuICAgIGlmIChzdGF0dXMgIT09IFwicGVuZGluZ1wiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlc2V0VGltZXIoKTtcbiAgICBjb25zdCByZXNvdXJjZSA9IHJlc291cmNlcy5zaGlmdCgpO1xuICAgIGlmIChyZXNvdXJjZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmVzZXRUaW1lcigpO1xuICAgICAgICAgIGlmIChzdGF0dXMgPT09IFwicGVuZGluZ1wiKSB7XG4gICAgICAgICAgICBjbGVhclF1ZXVlKCk7XG4gICAgICAgICAgICBmYWlsUXVlcnkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGNvbmZpZy50aW1lb3V0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZmFpbFF1ZXJ5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICBzdGF0dXM6IFwicGVuZGluZ1wiLFxuICAgICAgcmVzb3VyY2UsXG4gICAgICBjYWxsYmFjazogKHN0YXR1czIsIGRhdGEpID0+IHtcbiAgICAgICAgbW9kdWxlUmVzcG9uc2UoaXRlbSwgc3RhdHVzMiwgZGF0YSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBxdWV1ZS5wdXNoKGl0ZW0pO1xuICAgIHF1ZXJpZXNTZW50Kys7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGV4ZWNOZXh0LCBjb25maWcucm90YXRlKTtcbiAgICBxdWVyeShyZXNvdXJjZSwgcGF5bG9hZCwgaXRlbS5jYWxsYmFjayk7XG4gIH1cbiAgc2V0VGltZW91dChleGVjTmV4dCk7XG4gIHJldHVybiBnZXRRdWVyeVN0YXR1cztcbn1cblxuLy8gc3JjL2luZGV4LnRzXG5mdW5jdGlvbiBzZXRDb25maWcoY29uZmlnKSB7XG4gIGlmICh0eXBlb2YgY29uZmlnICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjb25maWcucmVzb3VyY2VzICE9PSBcIm9iamVjdFwiIHx8ICEoY29uZmlnLnJlc291cmNlcyBpbnN0YW5jZW9mIEFycmF5KSB8fCAhY29uZmlnLnJlc291cmNlcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFJlZHVuY2FuY3kgY29uZmlndXJhdGlvblwiKTtcbiAgfVxuICBjb25zdCBuZXdDb25maWcgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgbGV0IGtleTtcbiAgZm9yIChrZXkgaW4gZGVmYXVsdENvbmZpZykge1xuICAgIGlmIChjb25maWdba2V5XSAhPT0gdm9pZCAwKSB7XG4gICAgICBuZXdDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdDb25maWdba2V5XSA9IGRlZmF1bHRDb25maWdba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld0NvbmZpZztcbn1cbmZ1bmN0aW9uIGluaXRSZWR1bmRhbmN5KGNmZykge1xuICBjb25zdCBjb25maWcgPSBzZXRDb25maWcoY2ZnKTtcbiAgbGV0IHF1ZXJpZXMgPSBbXTtcbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBxdWVyaWVzID0gcXVlcmllcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0oKS5zdGF0dXMgPT09IFwicGVuZGluZ1wiKTtcbiAgfVxuICBmdW5jdGlvbiBxdWVyeShwYXlsb2FkLCBxdWVyeUNhbGxiYWNrLCBkb25lQ2FsbGJhY2spIHtcbiAgICBjb25zdCBxdWVyeTIgPSBzZW5kUXVlcnkoY29uZmlnLCBwYXlsb2FkLCBxdWVyeUNhbGxiYWNrLCAoZGF0YSwgZXJyb3IpID0+IHtcbiAgICAgIGNsZWFudXAoKTtcbiAgICAgIGlmIChkb25lQ2FsbGJhY2spIHtcbiAgICAgICAgZG9uZUNhbGxiYWNrKGRhdGEsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWVyaWVzLnB1c2gocXVlcnkyKTtcbiAgICByZXR1cm4gcXVlcnkyO1xuICB9XG4gIGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2spIHtcbiAgICBjb25zdCByZXN1bHQgPSBxdWVyaWVzLmZpbmQoKHZhbHVlKSA9PiB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQgIT09IHZvaWQgMCA/IHJlc3VsdCA6IG51bGw7XG4gIH1cbiAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgcXVlcnksXG4gICAgZmluZCxcbiAgICBzZXRJbmRleDogKGluZGV4KSA9PiB7XG4gICAgICBjb25maWcuaW5kZXggPSBpbmRleDtcbiAgICB9LFxuICAgIGdldEluZGV4OiAoKSA9PiBjb25maWcuaW5kZXgsXG4gICAgY2xlYW51cFxuICB9O1xuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbmZ1bmN0aW9uIGVtcHR5Q2FsbGJhY2skMSgpIHtcbn1cbmNvbnN0IHJlZHVuZGFuY3lDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuZnVuY3Rpb24gZ2V0UmVkdW5kYW5jeUNhY2hlKHByb3ZpZGVyKSB7XG4gIGlmIChyZWR1bmRhbmN5Q2FjaGVbcHJvdmlkZXJdID09PSB2b2lkIDApIHtcbiAgICBjb25zdCBjb25maWcgPSBnZXRBUElDb25maWcocHJvdmlkZXIpO1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlZHVuZGFuY3kgPSBpbml0UmVkdW5kYW5jeShjb25maWcpO1xuICAgIGNvbnN0IGNhY2hlZFJldW5kYW5jeSA9IHtcbiAgICAgIGNvbmZpZyxcbiAgICAgIHJlZHVuZGFuY3lcbiAgICB9O1xuICAgIHJlZHVuZGFuY3lDYWNoZVtwcm92aWRlcl0gPSBjYWNoZWRSZXVuZGFuY3k7XG4gIH1cbiAgcmV0dXJuIHJlZHVuZGFuY3lDYWNoZVtwcm92aWRlcl07XG59XG5mdW5jdGlvbiBzZW5kQVBJUXVlcnkodGFyZ2V0LCBxdWVyeSwgY2FsbGJhY2spIHtcbiAgbGV0IHJlZHVuZGFuY3k7XG4gIGxldCBzZW5kO1xuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IGFwaSA9IGdldEFQSU1vZHVsZSh0YXJnZXQpO1xuICAgIGlmICghYXBpKSB7XG4gICAgICBjYWxsYmFjayh2b2lkIDAsIDQyNCk7XG4gICAgICByZXR1cm4gZW1wdHlDYWxsYmFjayQxO1xuICAgIH1cbiAgICBzZW5kID0gYXBpLnNlbmQ7XG4gICAgY29uc3QgY2FjaGVkID0gZ2V0UmVkdW5kYW5jeUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgcmVkdW5kYW5jeSA9IGNhY2hlZC5yZWR1bmRhbmN5O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjb25maWcgPSBjcmVhdGVBUElDb25maWcodGFyZ2V0KTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICByZWR1bmRhbmN5ID0gaW5pdFJlZHVuZGFuY3koY29uZmlnKTtcbiAgICAgIGNvbnN0IG1vZHVsZUtleSA9IHRhcmdldC5yZXNvdXJjZXMgPyB0YXJnZXQucmVzb3VyY2VzWzBdIDogXCJcIjtcbiAgICAgIGNvbnN0IGFwaSA9IGdldEFQSU1vZHVsZShtb2R1bGVLZXkpO1xuICAgICAgaWYgKGFwaSkge1xuICAgICAgICBzZW5kID0gYXBpLnNlbmQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICghcmVkdW5kYW5jeSB8fCAhc2VuZCkge1xuICAgIGNhbGxiYWNrKHZvaWQgMCwgNDI0KTtcbiAgICByZXR1cm4gZW1wdHlDYWxsYmFjayQxO1xuICB9XG4gIHJldHVybiByZWR1bmRhbmN5LnF1ZXJ5KHF1ZXJ5LCBzZW5kLCBjYWxsYmFjaykoKS5hYm9ydDtcbn1cblxuZnVuY3Rpb24gZW1wdHlDYWxsYmFjaygpIHtcbn1cbmNvbnN0IHBlbmRpbmdJY29ucyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuY29uc3QgaWNvbnNUb0xvYWQgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmNvbnN0IGxvYWRlckZsYWdzID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG5jb25zdCBxdWV1ZUZsYWdzID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG5mdW5jdGlvbiBsb2FkZWROZXdJY29ucyhwcm92aWRlciwgcHJlZml4KSB7XG4gIGlmIChsb2FkZXJGbGFnc1twcm92aWRlcl0gPT09IHZvaWQgMCkge1xuICAgIGxvYWRlckZsYWdzW3Byb3ZpZGVyXSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9XG4gIGNvbnN0IHByb3ZpZGVyTG9hZGVyRmxhZ3MgPSBsb2FkZXJGbGFnc1twcm92aWRlcl07XG4gIGlmICghcHJvdmlkZXJMb2FkZXJGbGFnc1twcmVmaXhdKSB7XG4gICAgcHJvdmlkZXJMb2FkZXJGbGFnc1twcmVmaXhdID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHByb3ZpZGVyTG9hZGVyRmxhZ3NbcHJlZml4XSA9IGZhbHNlO1xuICAgICAgdXBkYXRlQ2FsbGJhY2tzKHByb3ZpZGVyLCBwcmVmaXgpO1xuICAgIH0pO1xuICB9XG59XG5jb25zdCBlcnJvcnNDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuZnVuY3Rpb24gbG9hZE5ld0ljb25zKHByb3ZpZGVyLCBwcmVmaXgsIGljb25zKSB7XG4gIGZ1bmN0aW9uIGVycigpIHtcbiAgICBjb25zdCBrZXkgPSAocHJvdmlkZXIgPT09IFwiXCIgPyBcIlwiIDogXCJAXCIgKyBwcm92aWRlciArIFwiOlwiKSArIHByZWZpeDtcbiAgICBjb25zdCB0aW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gNmU0KTtcbiAgICBpZiAoZXJyb3JzQ2FjaGVba2V5XSA8IHRpbWUpIHtcbiAgICAgIGVycm9yc0NhY2hlW2tleV0gPSB0aW1lO1xuICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIHJldHJpZXZlIGljb25zIGZvciBcIicgKyBrZXkgKyAnXCIgYmVjYXVzZSBBUEkgaXMgbm90IGNvbmZpZ3VyZWQgcHJvcGVybHkuJyk7XG4gICAgfVxuICB9XG4gIGlmIChpY29uc1RvTG9hZFtwcm92aWRlcl0gPT09IHZvaWQgMCkge1xuICAgIGljb25zVG9Mb2FkW3Byb3ZpZGVyXSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9XG4gIGNvbnN0IHByb3ZpZGVySWNvbnNUb0xvYWQgPSBpY29uc1RvTG9hZFtwcm92aWRlcl07XG4gIGlmIChxdWV1ZUZsYWdzW3Byb3ZpZGVyXSA9PT0gdm9pZCAwKSB7XG4gICAgcXVldWVGbGFnc1twcm92aWRlcl0gPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuICBjb25zdCBwcm92aWRlclF1ZXVlRmxhZ3MgPSBxdWV1ZUZsYWdzW3Byb3ZpZGVyXTtcbiAgaWYgKHBlbmRpbmdJY29uc1twcm92aWRlcl0gPT09IHZvaWQgMCkge1xuICAgIHBlbmRpbmdJY29uc1twcm92aWRlcl0gPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuICBjb25zdCBwcm92aWRlclBlbmRpbmdJY29ucyA9IHBlbmRpbmdJY29uc1twcm92aWRlcl07XG4gIGlmIChwcm92aWRlckljb25zVG9Mb2FkW3ByZWZpeF0gPT09IHZvaWQgMCkge1xuICAgIHByb3ZpZGVySWNvbnNUb0xvYWRbcHJlZml4XSA9IGljb25zO1xuICB9IGVsc2Uge1xuICAgIHByb3ZpZGVySWNvbnNUb0xvYWRbcHJlZml4XSA9IHByb3ZpZGVySWNvbnNUb0xvYWRbcHJlZml4XS5jb25jYXQoaWNvbnMpLnNvcnQoKTtcbiAgfVxuICBpZiAoIXByb3ZpZGVyUXVldWVGbGFnc1twcmVmaXhdKSB7XG4gICAgcHJvdmlkZXJRdWV1ZUZsYWdzW3ByZWZpeF0gPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcHJvdmlkZXJRdWV1ZUZsYWdzW3ByZWZpeF0gPSBmYWxzZTtcbiAgICAgIGNvbnN0IGljb25zMiA9IHByb3ZpZGVySWNvbnNUb0xvYWRbcHJlZml4XTtcbiAgICAgIGRlbGV0ZSBwcm92aWRlckljb25zVG9Mb2FkW3ByZWZpeF07XG4gICAgICBjb25zdCBhcGkgPSBnZXRBUElNb2R1bGUocHJvdmlkZXIpO1xuICAgICAgaWYgKCFhcGkpIHtcbiAgICAgICAgZXJyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhcmFtcyA9IGFwaS5wcmVwYXJlKHByb3ZpZGVyLCBwcmVmaXgsIGljb25zMik7XG4gICAgICBwYXJhbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBzZW5kQVBJUXVlcnkocHJvdmlkZXIsIGl0ZW0sIChkYXRhLCBlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKHByb3ZpZGVyLCBwcmVmaXgpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgaWYgKGVycm9yICE9PSA0MDQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBpdGVtLmljb25zLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgc3RvcmFnZS5taXNzaW5nW25hbWVdID0gdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBhZGRJY29uU2V0KHN0b3JhZ2UsIGRhdGEpO1xuICAgICAgICAgICAgICBpZiAoIXBhcnNlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgcGVuZGluZyA9IHByb3ZpZGVyUGVuZGluZ0ljb25zW3ByZWZpeF07XG4gICAgICAgICAgICAgIHBhcnNlZC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBlbmRpbmdbbmFtZV07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoY2FjaGUuc3RvcmUpIHtcbiAgICAgICAgICAgICAgICBjYWNoZS5zdG9yZShwcm92aWRlciwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbG9hZGVkTmV3SWNvbnMocHJvdmlkZXIsIHByZWZpeCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbmNvbnN0IGlzUGVuZGluZyA9IChpY29uKSA9PiB7XG4gIGNvbnN0IHByb3ZpZGVyID0gaWNvbi5wcm92aWRlcjtcbiAgY29uc3QgcHJlZml4ID0gaWNvbi5wcmVmaXg7XG4gIHJldHVybiBwZW5kaW5nSWNvbnNbcHJvdmlkZXJdICYmIHBlbmRpbmdJY29uc1twcm92aWRlcl1bcHJlZml4XSAmJiBwZW5kaW5nSWNvbnNbcHJvdmlkZXJdW3ByZWZpeF1baWNvbi5uYW1lXSAhPT0gdm9pZCAwO1xufTtcbmNvbnN0IGxvYWRJY29ucyA9IChpY29ucywgY2FsbGJhY2spID0+IHtcbiAgY29uc3QgY2xlYW5lZEljb25zID0gbGlzdFRvSWNvbnMoaWNvbnMsIHRydWUsIGFsbG93U2ltcGxlTmFtZXMoKSk7XG4gIGNvbnN0IHNvcnRlZEljb25zID0gc29ydEljb25zKGNsZWFuZWRJY29ucyk7XG4gIGlmICghc29ydGVkSWNvbnMucGVuZGluZy5sZW5ndGgpIHtcbiAgICBsZXQgY2FsbENhbGxiYWNrID0gdHJ1ZTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoY2FsbENhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2soc29ydGVkSWNvbnMubG9hZGVkLCBzb3J0ZWRJY29ucy5taXNzaW5nLCBzb3J0ZWRJY29ucy5wZW5kaW5nLCBlbXB0eUNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYWxsQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICB9O1xuICB9XG4gIGNvbnN0IG5ld0ljb25zID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHNvdXJjZXMgPSBbXTtcbiAgbGV0IGxhc3RQcm92aWRlciwgbGFzdFByZWZpeDtcbiAgc29ydGVkSWNvbnMucGVuZGluZy5mb3JFYWNoKChpY29uKSA9PiB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBpY29uLnByb3ZpZGVyO1xuICAgIGNvbnN0IHByZWZpeCA9IGljb24ucHJlZml4O1xuICAgIGlmIChwcmVmaXggPT09IGxhc3RQcmVmaXggJiYgcHJvdmlkZXIgPT09IGxhc3RQcm92aWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsYXN0UHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICBsYXN0UHJlZml4ID0gcHJlZml4O1xuICAgIHNvdXJjZXMucHVzaCh7XG4gICAgICBwcm92aWRlcixcbiAgICAgIHByZWZpeFxuICAgIH0pO1xuICAgIGlmIChwZW5kaW5nSWNvbnNbcHJvdmlkZXJdID09PSB2b2lkIDApIHtcbiAgICAgIHBlbmRpbmdJY29uc1twcm92aWRlcl0gPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgY29uc3QgcHJvdmlkZXJQZW5kaW5nSWNvbnMgPSBwZW5kaW5nSWNvbnNbcHJvdmlkZXJdO1xuICAgIGlmIChwcm92aWRlclBlbmRpbmdJY29uc1twcmVmaXhdID09PSB2b2lkIDApIHtcbiAgICAgIHByb3ZpZGVyUGVuZGluZ0ljb25zW3ByZWZpeF0gPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgaWYgKG5ld0ljb25zW3Byb3ZpZGVyXSA9PT0gdm9pZCAwKSB7XG4gICAgICBuZXdJY29uc1twcm92aWRlcl0gPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgY29uc3QgcHJvdmlkZXJOZXdJY29ucyA9IG5ld0ljb25zW3Byb3ZpZGVyXTtcbiAgICBpZiAocHJvdmlkZXJOZXdJY29uc1twcmVmaXhdID09PSB2b2lkIDApIHtcbiAgICAgIHByb3ZpZGVyTmV3SWNvbnNbcHJlZml4XSA9IFtdO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpO1xuICBzb3J0ZWRJY29ucy5wZW5kaW5nLmZvckVhY2goKGljb24pID0+IHtcbiAgICBjb25zdCBwcm92aWRlciA9IGljb24ucHJvdmlkZXI7XG4gICAgY29uc3QgcHJlZml4ID0gaWNvbi5wcmVmaXg7XG4gICAgY29uc3QgbmFtZSA9IGljb24ubmFtZTtcbiAgICBjb25zdCBwZW5kaW5nUXVldWUgPSBwZW5kaW5nSWNvbnNbcHJvdmlkZXJdW3ByZWZpeF07XG4gICAgaWYgKHBlbmRpbmdRdWV1ZVtuYW1lXSA9PT0gdm9pZCAwKSB7XG4gICAgICBwZW5kaW5nUXVldWVbbmFtZV0gPSB0aW1lO1xuICAgICAgbmV3SWNvbnNbcHJvdmlkZXJdW3ByZWZpeF0ucHVzaChuYW1lKTtcbiAgICB9XG4gIH0pO1xuICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gc291cmNlLnByb3ZpZGVyO1xuICAgIGNvbnN0IHByZWZpeCA9IHNvdXJjZS5wcmVmaXg7XG4gICAgaWYgKG5ld0ljb25zW3Byb3ZpZGVyXVtwcmVmaXhdLmxlbmd0aCkge1xuICAgICAgbG9hZE5ld0ljb25zKHByb3ZpZGVyLCBwcmVmaXgsIG5ld0ljb25zW3Byb3ZpZGVyXVtwcmVmaXhdKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY2FsbGJhY2sgPyBzdG9yZUNhbGxiYWNrKGNhbGxiYWNrLCBzb3J0ZWRJY29ucywgc291cmNlcykgOiBlbXB0eUNhbGxiYWNrO1xufTtcbmNvbnN0IGxvYWRJY29uID0gKGljb24pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBpY29uT2JqID0gdHlwZW9mIGljb24gPT09IFwic3RyaW5nXCIgPyBzdHJpbmdUb0ljb24oaWNvbikgOiBpY29uO1xuICAgIGxvYWRJY29ucyhbaWNvbk9iaiB8fCBpY29uXSwgKGxvYWRlZCkgPT4ge1xuICAgICAgaWYgKGxvYWRlZC5sZW5ndGggJiYgaWNvbk9iaikge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gZ2V0U3RvcmFnZShpY29uT2JqLnByb3ZpZGVyLCBpY29uT2JqLnByZWZpeCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBnZXRJY29uRnJvbVN0b3JhZ2Uoc3RvcmFnZSwgaWNvbk9iai5uYW1lKTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICBmdWxmaWxsKGRhdGEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVqZWN0KGljb24pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogTmFtZXMgb2YgcHJvcGVydGllcyB0byBhZGQgdG8gbm9kZXNcbiAqL1xuY29uc3QgZWxlbWVudEZpbmRlclByb3BlcnR5ID0gKCdpY29uaWZ5RmluZGVyJyArIERhdGUubm93KCkpO1xuY29uc3QgZWxlbWVudERhdGFQcm9wZXJ0eSA9ICgnaWNvbmlmeURhdGEnICsgRGF0ZS5ub3coKSk7XG5cbi8qKlxuICogUmVwbGFjZSBlbGVtZW50IHdpdGggU1ZHXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckljb25JblBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyLCBjdXN0b21pc2F0aW9ucywgaWNvbkRhdGEsIHJldHVyblN0cmluZykge1xuICAgIC8vIENyZWF0ZSBwbGFjZWhvbGRlci4gV2h5IHBsYWNlaG9sZGVyPyBJRTExIGRvZXNuJ3Qgc3VwcG9ydCBpbm5lckhUTUwgbWV0aG9kIG9uIFNWRy5cbiAgICBsZXQgc3BhbjtcbiAgICB0cnkge1xuICAgICAgICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZXR1cm5TdHJpbmcgPyAnJyA6IG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBpY29uVG9TVkcoaWNvbkRhdGEsIG1lcmdlQ3VzdG9taXNhdGlvbnMoZGVmYXVsdHMsIGN1c3RvbWlzYXRpb25zKSk7XG4gICAgLy8gUGxhY2Vob2xkZXIgcHJvcGVydGllc1xuICAgIGNvbnN0IHBsYWNlaG9sZGVyRWxlbWVudCA9IHBsYWNlaG9sZGVyLmVsZW1lbnQ7XG4gICAgY29uc3QgZmluZGVyID0gcGxhY2Vob2xkZXIuZmluZGVyO1xuICAgIGNvbnN0IG5hbWUgPSBwbGFjZWhvbGRlci5uYW1lO1xuICAgIC8vIEdldCBjbGFzcyBuYW1lXG4gICAgY29uc3QgcGxhY2Vob2xkZXJDbGFzc05hbWUgPSBwbGFjZWhvbGRlckVsZW1lbnRcbiAgICAgICAgPyBwbGFjZWhvbGRlckVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpXG4gICAgICAgIDogJyc7XG4gICAgY29uc3QgZmlsdGVyZWRDbGFzc0xpc3QgPSBmaW5kZXJcbiAgICAgICAgPyBmaW5kZXIuY2xhc3NGaWx0ZXIocGxhY2Vob2xkZXJDbGFzc05hbWUgPyBwbGFjZWhvbGRlckNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pIDogW10pXG4gICAgICAgIDogW107XG4gICAgY29uc3QgY2xhc3NOYW1lID0gJ2ljb25pZnkgaWNvbmlmeS0tJyArXG4gICAgICAgIG5hbWUucHJlZml4ICtcbiAgICAgICAgKG5hbWUucHJvdmlkZXIgPT09ICcnID8gJycgOiAnIGljb25pZnktLScgKyBuYW1lLnByb3ZpZGVyKSArXG4gICAgICAgIChmaWx0ZXJlZENsYXNzTGlzdC5sZW5ndGggPyAnICcgKyBmaWx0ZXJlZENsYXNzTGlzdC5qb2luKCcgJykgOiAnJyk7XG4gICAgLy8gR2VuZXJhdGUgU1ZHIGFzIHN0cmluZ1xuICAgIGNvbnN0IGh0bWwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cImltZ1wiIGNsYXNzPVwiJyArXG4gICAgICAgIGNsYXNzTmFtZSArXG4gICAgICAgICdcIj4nICtcbiAgICAgICAgcmVwbGFjZUlEcyhkYXRhLmJvZHkpICtcbiAgICAgICAgJzwvc3ZnPic7XG4gICAgLy8gU2V0IEhUTUwgZm9yIHBsYWNlaG9sZGVyXG4gICAgc3Bhbi5pbm5lckhUTUwgPSBodG1sO1xuICAgIC8vIEdldCBTVkcgZWxlbWVudFxuICAgIGNvbnN0IHN2ZyA9IHNwYW4uY2hpbGROb2Rlc1swXTtcbiAgICBjb25zdCBzdmdTdHlsZSA9IHN2Zy5zdHlsZTtcbiAgICAvLyBBZGQgYXR0cmlidXRlc1xuICAgIGNvbnN0IHN2Z0F0dHJpYnV0ZXMgPSBkYXRhLmF0dHJpYnV0ZXM7XG4gICAgT2JqZWN0LmtleXMoc3ZnQXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKGF0dHIsIHN2Z0F0dHJpYnV0ZXNbYXR0cl0pO1xuICAgIH0pO1xuICAgIC8vIEFkZCBjdXN0b20gc3R5bGVzXG4gICAgaWYgKGRhdGEuaW5saW5lKSB7XG4gICAgICAgIHN2Z1N0eWxlLnZlcnRpY2FsQWxpZ24gPSAnLTAuMTI1ZW0nO1xuICAgIH1cbiAgICAvLyBDb3B5IHN0dWZmIGZyb20gcGxhY2Vob2xkZXJcbiAgICBpZiAocGxhY2Vob2xkZXJFbGVtZW50KSB7XG4gICAgICAgIC8vIENvcHkgYXR0cmlidXRlc1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlckF0dHJpYnV0ZXMgPSBwbGFjZWhvbGRlckVsZW1lbnQuYXR0cmlidXRlcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZWhvbGRlckF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwbGFjZWhvbGRlckF0dHJpYnV0ZXMuaXRlbShpKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSAhPT0gJ2NsYXNzJyAmJlxuICAgICAgICAgICAgICAgICAgICBuYW1lICE9PSAnc3R5bGUnICYmXG4gICAgICAgICAgICAgICAgICAgIHN2Z0F0dHJpYnV0ZXNbbmFtZV0gPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZShuYW1lLCBpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENvcHkgc3R5bGVzXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyU3R5bGUgPSBwbGFjZWhvbGRlckVsZW1lbnQuc3R5bGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2Vob2xkZXJTdHlsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYXR0ciA9IHBsYWNlaG9sZGVyU3R5bGVbaV07XG4gICAgICAgICAgICBzdmdTdHlsZVthdHRyXSA9IHBsYWNlaG9sZGVyU3R5bGVbYXR0cl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU3RvcmUgZmluZGVyIHNwZWNpZmljIGRhdGFcbiAgICBpZiAoZmluZGVyKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnREYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHN0YXR1czogJ2xvYWRlZCcsXG4gICAgICAgICAgICBjdXN0b21pc2F0aW9uczogY3VzdG9taXNhdGlvbnMsXG4gICAgICAgIH07XG4gICAgICAgIHN2Z1tlbGVtZW50RGF0YVByb3BlcnR5XSA9IGVsZW1lbnREYXRhO1xuICAgICAgICBzdmdbZWxlbWVudEZpbmRlclByb3BlcnR5XSA9IGZpbmRlcjtcbiAgICB9XG4gICAgLy8gR2V0IHJlc3VsdFxuICAgIGNvbnN0IHJlc3VsdCA9IHJldHVyblN0cmluZyA/IHNwYW4uaW5uZXJIVE1MIDogc3ZnO1xuICAgIC8vIFJlcGxhY2UgcGxhY2Vob2xkZXJcbiAgICBpZiAocGxhY2Vob2xkZXJFbGVtZW50ICYmIHBsYWNlaG9sZGVyRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHBsYWNlaG9sZGVyRWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzdmcsIHBsYWNlaG9sZGVyRWxlbWVudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBQbGFjZWhvbGRlciBoYXMgbm8gcGFyZW50PyBSZW1vdmUgU1ZHIHBhcmVudCBhcyB3ZWxsXG4gICAgICAgIHNwYW4ucmVtb3ZlQ2hpbGQoc3ZnKTtcbiAgICB9XG4gICAgLy8gUmV0dXJuIG5ldyBub2RlXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBMaXN0IG9mIHJvb3Qgbm9kZXNcbiAqL1xubGV0IG5vZGVzID0gW107XG4vKipcbiAqIEZpbmQgbm9kZVxuICovXG5mdW5jdGlvbiBmaW5kUm9vdE5vZGUobm9kZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5vZGVzW2ldO1xuICAgICAgICBjb25zdCByb290ID0gdHlwZW9mIGl0ZW0ubm9kZSA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZW0ubm9kZSgpIDogaXRlbS5ub2RlO1xuICAgICAgICBpZiAocm9vdCA9PT0gbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEFkZCBleHRyYSByb290IG5vZGVcbiAqL1xuZnVuY3Rpb24gYWRkUm9vdE5vZGUocm9vdCwgYXV0b1JlbW92ZSA9IGZhbHNlKSB7XG4gICAgbGV0IG5vZGUgPSBmaW5kUm9vdE5vZGUocm9vdCk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgICAgLy8gTm9kZSBhbHJlYWR5IGV4aXN0OiBzd2l0Y2ggdHlwZSBpZiBuZWVkZWRcbiAgICAgICAgaWYgKG5vZGUudGVtcG9yYXJ5KSB7XG4gICAgICAgICAgICBub2RlLnRlbXBvcmFyeSA9IGF1dG9SZW1vdmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIC8vIENyZWF0ZSBpdGVtLCBhZGQgaXQgdG8gbGlzdCwgc3RhcnQgb2JzZXJ2ZXJcbiAgICBub2RlID0ge1xuICAgICAgICBub2RlOiByb290LFxuICAgICAgICB0ZW1wb3Jhcnk6IGF1dG9SZW1vdmUsXG4gICAgfTtcbiAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgIHJldHVybiBub2RlO1xufVxuLyoqXG4gKiBBZGQgZG9jdW1lbnQuYm9keSBub2RlXG4gKi9cbmZ1bmN0aW9uIGFkZEJvZHlOb2RlKCkge1xuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGFkZFJvb3ROb2RlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICAgIG5vZGVzLnB1c2goe1xuICAgICAgICBub2RlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBSZW1vdmUgcm9vdCBub2RlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZVJvb3ROb2RlKHJvb3QpIHtcbiAgICBub2RlcyA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdHlwZW9mIG5vZGUubm9kZSA9PT0gJ2Z1bmN0aW9uJyA/IG5vZGUubm9kZSgpIDogbm9kZS5ub2RlO1xuICAgICAgICByZXR1cm4gcm9vdCAhPT0gZWxlbWVudDtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGxpc3Qgb2Ygcm9vdCBub2Rlc1xuICovXG5mdW5jdGlvbiBsaXN0Um9vdE5vZGVzKCkge1xuICAgIHJldHVybiBub2Rlcztcbn1cblxuLyoqXG4gKiBFeGVjdXRlIGZ1bmN0aW9uIHdoZW4gRE9NIGlzIHJlYWR5XG4gKi9cbmZ1bmN0aW9uIG9uUmVhZHkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgfHxcbiAgICAgICAgKGRvYy5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycgJiZcbiAgICAgICAgICAgICFkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKSkge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYWxsYmFjayk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFja1xuICovXG5sZXQgY2FsbGJhY2sgPSBudWxsO1xuLyoqXG4gKiBQYXJhbWV0ZXJzIGZvciBtdXRhdGlvbiBvYnNlcnZlclxuICovXG5jb25zdCBvYnNlcnZlclBhcmFtcyA9IHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxufTtcbi8qKlxuICogUXVldWUgRE9NIHNjYW5cbiAqL1xuZnVuY3Rpb24gcXVldWVTY2FuKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUub2JzZXJ2ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvYnNlcnZlciA9IG5vZGUub2JzZXJ2ZXI7XG4gICAgaWYgKCFvYnNlcnZlci5wZW5kaW5nU2Nhbikge1xuICAgICAgICBvYnNlcnZlci5wZW5kaW5nU2NhbiA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIG9ic2VydmVyLnBlbmRpbmdTY2FuO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQ2hlY2sgbXV0YXRpb25zIGZvciBhZGRlZCBub2Rlc1xuICovXG5mdW5jdGlvbiBjaGVja011dGF0aW9ucyhub2RlLCBtdXRhdGlvbnMpIHtcbiAgICBpZiAoIW5vZGUub2JzZXJ2ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvYnNlcnZlciA9IG5vZGUub2JzZXJ2ZXI7XG4gICAgaWYgKCFvYnNlcnZlci5wZW5kaW5nU2Nhbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG11dGF0aW9uc1tpXTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhZGRlZCBub2Rlc1xuICAgICAgICAgICAgKGl0ZW0uYWRkZWROb2RlcyAmJiBpdGVtLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkgfHxcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgaWNvbiBvciBwbGFjZWhvbGRlciB3aXRoIG1vZGlmaWVkIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAoaXRlbS50eXBlID09PSAnYXR0cmlidXRlcycgJiZcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50YXJnZXRbZWxlbWVudEZpbmRlclByb3BlcnR5XSAhPT1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9ic2VydmVyLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZVNjYW4obm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogU3RhcnQvcmVzdW1lIG9ic2VydmVyXG4gKi9cbmZ1bmN0aW9uIGNvbnRpbnVlT2JzZXJ2aW5nKG5vZGUsIHJvb3QpIHtcbiAgICBub2RlLm9ic2VydmVyLmluc3RhbmNlLm9ic2VydmUocm9vdCwgb2JzZXJ2ZXJQYXJhbXMpO1xufVxuLyoqXG4gKiBTdGFydCBtdXRhdGlvbiBvYnNlcnZlclxuICovXG5mdW5jdGlvbiBzdGFydE9ic2VydmVyKG5vZGUpIHtcbiAgICBsZXQgb2JzZXJ2ZXIgPSBub2RlLm9ic2VydmVyO1xuICAgIGlmIChvYnNlcnZlciAmJiBvYnNlcnZlci5pbnN0YW5jZSkge1xuICAgICAgICAvLyBBbHJlYWR5IHN0YXJ0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb290ID0gdHlwZW9mIG5vZGUubm9kZSA9PT0gJ2Z1bmN0aW9uJyA/IG5vZGUubm9kZSgpIDogbm9kZS5ub2RlO1xuICAgIGlmICghcm9vdCkge1xuICAgICAgICAvLyBkb2N1bWVudC5ib2R5IGlzIG5vdCBhdmFpbGFibGUgeWV0XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZlciA9IHtcbiAgICAgICAgICAgIHBhdXNlZDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5vYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgbmV3IGluc3RhbmNlLCBvYnNlcnZlXG4gICAgb2JzZXJ2ZXIuaW5zdGFuY2UgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjaGVja011dGF0aW9ucy5iaW5kKG51bGwsIG5vZGUpKTtcbiAgICBjb250aW51ZU9ic2VydmluZyhub2RlLCByb290KTtcbiAgICAvLyBTY2FuIGltbWVkaWF0ZWx5XG4gICAgaWYgKCFvYnNlcnZlci5wYXVzZWQpIHtcbiAgICAgICAgcXVldWVTY2FuKG5vZGUpO1xuICAgIH1cbn1cbi8qKlxuICogU3RhcnQgYWxsIG9ic2VydmVyc1xuICovXG5mdW5jdGlvbiBzdGFydE9ic2VydmVycygpIHtcbiAgICBsaXN0Um9vdE5vZGVzKCkuZm9yRWFjaChzdGFydE9ic2VydmVyKTtcbn1cbi8qKlxuICogU3RvcCBvYnNlcnZlclxuICovXG5mdW5jdGlvbiBzdG9wT2JzZXJ2ZXIobm9kZSkge1xuICAgIGlmICghbm9kZS5vYnNlcnZlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9ic2VydmVyID0gbm9kZS5vYnNlcnZlcjtcbiAgICAvLyBTdG9wIHNjYW5cbiAgICBpZiAob2JzZXJ2ZXIucGVuZGluZ1NjYW4pIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG9ic2VydmVyLnBlbmRpbmdTY2FuKTtcbiAgICAgICAgZGVsZXRlIG9ic2VydmVyLnBlbmRpbmdTY2FuO1xuICAgIH1cbiAgICAvLyBEaXNjb25uZWN0IG9ic2VydmVyXG4gICAgaWYgKG9ic2VydmVyLmluc3RhbmNlKSB7XG4gICAgICAgIG9ic2VydmVyLmluc3RhbmNlLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgZGVsZXRlIG9ic2VydmVyLmluc3RhbmNlO1xuICAgIH1cbn1cbi8qKlxuICogU3RhcnQgb2JzZXJ2ZXIgd2hlbiBET00gaXMgcmVhZHlcbiAqL1xuZnVuY3Rpb24gaW5pdE9ic2VydmVyKGNiKSB7XG4gICAgY29uc3QgaXNSZXN0YXJ0ID0gY2FsbGJhY2sgIT09IG51bGw7XG4gICAgaWYgKGNhbGxiYWNrICE9PSBjYikge1xuICAgICAgICAvLyBDaGFuZ2UgY2FsbGJhY2sgYW5kIHN0b3AgYWxsIHBlbmRpbmcgb2JzZXJ2ZXJzXG4gICAgICAgIGNhbGxiYWNrID0gY2I7XG4gICAgICAgIGlmIChpc1Jlc3RhcnQpIHtcbiAgICAgICAgICAgIGxpc3RSb290Tm9kZXMoKS5mb3JFYWNoKHN0b3BPYnNlcnZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzUmVzdGFydCkge1xuICAgICAgICAvLyBSZXN0YXJ0IGluc3RhbmNlc1xuICAgICAgICBzdGFydE9ic2VydmVycygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFN0YXJ0IG9ic2VydmVycyB3aGVuIGRvY3VtZW50IGlzIHJlYWR5XG4gICAgb25SZWFkeShzdGFydE9ic2VydmVycyk7XG59XG4vKipcbiAqIFBhdXNlIG9ic2VydmluZyBub2RlXG4gKi9cbmZ1bmN0aW9uIHBhdXNlT2JzZXJ2aW5nTm9kZShub2RlKSB7XG4gICAgKG5vZGUgPyBbbm9kZV0gOiBsaXN0Um9vdE5vZGVzKCkpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFub2RlLm9ic2VydmVyKSB7XG4gICAgICAgICAgICBub2RlLm9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgIHBhdXNlZDogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBub2RlLm9ic2VydmVyO1xuICAgICAgICBvYnNlcnZlci5wYXVzZWQrKztcbiAgICAgICAgaWYgKG9ic2VydmVyLnBhdXNlZCA+IDEgfHwgIW9ic2VydmVyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGlzY29ubmVjdCBvYnNlcnZlclxuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG9ic2VydmVyLmluc3RhbmNlO1xuICAgICAgICAvLyBjaGVja011dGF0aW9ucyhub2RlLCBpbnN0YW5jZS50YWtlUmVjb3JkcygpKTtcbiAgICAgICAgaW5zdGFuY2UuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBQYXVzZSBvYnNlcnZlclxuICovXG5mdW5jdGlvbiBwYXVzZU9ic2VydmVyKHJvb3QpIHtcbiAgICBpZiAocm9vdCkge1xuICAgICAgICBjb25zdCBub2RlID0gZmluZFJvb3ROb2RlKHJvb3QpO1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgcGF1c2VPYnNlcnZpbmdOb2RlKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwYXVzZU9ic2VydmluZ05vZGUoKTtcbiAgICB9XG59XG4vKipcbiAqIFJlc3VtZSBvYnNlcnZlclxuICovXG5mdW5jdGlvbiByZXN1bWVPYnNlcnZpbmdOb2RlKG9ic2VydmVyKSB7XG4gICAgKG9ic2VydmVyID8gW29ic2VydmVyXSA6IGxpc3RSb290Tm9kZXMoKSkuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIW5vZGUub2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIC8vIFN0YXJ0IG9ic2VydmVyXG4gICAgICAgICAgICBzdGFydE9ic2VydmVyKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbm9kZS5vYnNlcnZlcjtcbiAgICAgICAgaWYgKG9ic2VydmVyLnBhdXNlZCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIucGF1c2VkLS07XG4gICAgICAgICAgICBpZiAoIW9ic2VydmVyLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IC8gcmVzdW1lXG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdCA9IHR5cGVvZiBub2RlLm5vZGUgPT09ICdmdW5jdGlvbicgPyBub2RlLm5vZGUoKSA6IG5vZGUubm9kZTtcbiAgICAgICAgICAgICAgICBpZiAoIXJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYnNlcnZlci5pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZU9ic2VydmluZyhub2RlLCByb290KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2JzZXJ2ZXIobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFJlc3VtZSBvYnNlcnZlclxuICovXG5mdW5jdGlvbiByZXN1bWVPYnNlcnZlcihyb290KSB7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRSb290Tm9kZShyb290KTtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIHJlc3VtZU9ic2VydmluZ05vZGUobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VtZU9ic2VydmluZ05vZGUoKTtcbiAgICB9XG59XG4vKipcbiAqIE9ic2VydmUgbm9kZVxuICovXG5mdW5jdGlvbiBvYnNlcnZlKHJvb3QsIGF1dG9SZW1vdmUgPSBmYWxzZSkge1xuICAgIGNvbnN0IG5vZGUgPSBhZGRSb290Tm9kZShyb290LCBhdXRvUmVtb3ZlKTtcbiAgICBzdGFydE9ic2VydmVyKG5vZGUpO1xuICAgIHJldHVybiBub2RlO1xufVxuLyoqXG4gKiBSZW1vdmUgb2JzZXJ2ZWQgbm9kZVxuICovXG5mdW5jdGlvbiBzdG9wT2JzZXJ2aW5nKHJvb3QpIHtcbiAgICBjb25zdCBub2RlID0gZmluZFJvb3ROb2RlKHJvb3QpO1xuICAgIGlmIChub2RlKSB7XG4gICAgICAgIHN0b3BPYnNlcnZlcihub2RlKTtcbiAgICAgICAgcmVtb3ZlUm9vdE5vZGUocm9vdCk7XG4gICAgfVxufVxuXG4vKipcbiAqIExpc3Qgb2YgbW9kdWxlc1xuICovXG5jb25zdCBmaW5kZXJzID0gW107XG4vKipcbiAqIEFkZCBtb2R1bGVcbiAqL1xuZnVuY3Rpb24gYWRkRmluZGVyKGZpbmRlcikge1xuICAgIGlmIChmaW5kZXJzLmluZGV4T2YoZmluZGVyKSA9PT0gLTEpIHtcbiAgICAgICAgZmluZGVycy5wdXNoKGZpbmRlcik7XG4gICAgfVxufVxuLyoqXG4gKiBDbGVhbiBpY29uIG5hbWU6IGNvbnZlcnQgZnJvbSBzdHJpbmcgaWYgbmVlZGVkIGFuZCB2YWxpZGF0ZVxuICovXG5mdW5jdGlvbiBjbGVhbkljb25OYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5hbWUgPSBzdHJpbmdUb0ljb24obmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lID09PSBudWxsIHx8ICF2YWxpZGF0ZUljb24obmFtZSkgPyBudWxsIDogbmFtZTtcbn1cbi8qKlxuICogQ29tcGFyZSBjdXN0b21pc2F0aW9ucy4gUmV0dXJucyB0cnVlIGlmIGlkZW50aWNhbFxuICovXG5mdW5jdGlvbiBjb21wYXJlQ3VzdG9taXNhdGlvbnMobGlzdDEsIGxpc3QyKSB7XG4gICAgY29uc3Qga2V5czEgPSBPYmplY3Qua2V5cyhsaXN0MSk7XG4gICAgY29uc3Qga2V5czIgPSBPYmplY3Qua2V5cyhsaXN0Mik7XG4gICAgaWYgKGtleXMxLmxlbmd0aCAhPT0ga2V5czIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzMS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBrZXlzMVtpXTtcbiAgICAgICAgaWYgKGxpc3QyW2tleV0gIT09IGxpc3QxW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogRmluZCBhbGwgcGxhY2Vob2xkZXJzXG4gKi9cbmZ1bmN0aW9uIGZpbmRQbGFjZWhvbGRlcnMocm9vdCkge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmaW5kZXJzLmZvckVhY2goKGZpbmRlcikgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IGZpbmRlci5maW5kKHJvb3QpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGl0ZW07XG4gICAgICAgICAgICBpZiAoZWxlbWVudFtlbGVtZW50RmluZGVyUHJvcGVydHldICE9PSB2b2lkIDAgJiZcbiAgICAgICAgICAgICAgICBlbGVtZW50W2VsZW1lbnRGaW5kZXJQcm9wZXJ0eV0gIT09IGZpbmRlcikge1xuICAgICAgICAgICAgICAgIC8vIEVsZW1lbnQgaXMgYXNzaWduZWQgdG8gYSBkaWZmZXJlbnQgZmluZGVyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gR2V0IGljb24gbmFtZVxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGNsZWFuSWNvbk5hbWUoZmluZGVyLm5hbWUoZWxlbWVudCkpO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIG5hbWUgLSBkbyBub3QgYXNzaWduIHRoaXMgZmluZGVyIHRvIGVsZW1lbnRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBc3NpZ24gZmluZGVyIHRvIGVsZW1lbnQgYW5kIGFkZCBpdCB0byByZXN1bHRzXG4gICAgICAgICAgICBlbGVtZW50W2VsZW1lbnRGaW5kZXJQcm9wZXJ0eV0gPSBmaW5kZXI7XG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgIGZpbmRlcixcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChwbGFjZWhvbGRlcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIEZpbmQgYWxsIG1vZGlmaWVkIFNWR1xuICAgIGNvbnN0IGVsZW1lbnRzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdzdmcuaWNvbmlmeScpO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWxlbWVudHMsIChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpdGVtO1xuICAgICAgICBjb25zdCBmaW5kZXIgPSBlbGVtZW50W2VsZW1lbnRGaW5kZXJQcm9wZXJ0eV07XG4gICAgICAgIGNvbnN0IGRhdGEgPSBlbGVtZW50W2VsZW1lbnREYXRhUHJvcGVydHldO1xuICAgICAgICBpZiAoIWZpbmRlciB8fCAhZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCBpY29uIG5hbWVcbiAgICAgICAgY29uc3QgbmFtZSA9IGNsZWFuSWNvbk5hbWUoZmluZGVyLm5hbWUoZWxlbWVudCkpO1xuICAgICAgICBpZiAobmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSW52YWxpZCBuYW1lXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGN1c3RvbWlzYXRpb25zO1xuICAgICAgICBpZiAobmFtZS5wcmVmaXggIT09IGRhdGEubmFtZS5wcmVmaXggfHwgbmFtZS5uYW1lICE9PSBkYXRhLm5hbWUubmFtZSkge1xuICAgICAgICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXN0b21pc2F0aW9ucyA9IGZpbmRlci5jdXN0b21pc2F0aW9ucyhlbGVtZW50KTtcbiAgICAgICAgICAgIGlmICghY29tcGFyZUN1c3RvbWlzYXRpb25zKGRhdGEuY3VzdG9taXNhdGlvbnMsIGN1c3RvbWlzYXRpb25zKSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBpdGVtIHRvIHJlc3VsdHNcbiAgICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZmluZGVyLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY3VzdG9taXNhdGlvbnMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG4vKipcbiAqIEZsYWcgdG8gYXZvaWQgc2Nhbm5pbmcgRE9NIHRvbyBvZnRlblxuICovXG5sZXQgc2NhblF1ZXVlZCA9IGZhbHNlO1xuLyoqXG4gKiBJY29ucyBoYXZlIGJlZW4gbG9hZGVkXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUGVuZGluZ0ljb25zKCkge1xuICAgIGlmICghc2NhblF1ZXVlZCkge1xuICAgICAgICBzY2FuUXVldWVkID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2NhblF1ZXVlZCkge1xuICAgICAgICAgICAgICAgIHNjYW5RdWV1ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzY2FuRE9NKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQ29tcGFyZSBJY29uIG9iamVjdHMuIFJldHVybnMgdHJ1ZSBpZiBpY29ucyBhcmUgaWRlbnRpY2FsLlxuICpcbiAqIE5vdGU6IG51bGwgbWVhbnMgaWNvbiBpcyBpbnZhbGlkLCBzbyBudWxsIHRvIG51bGwgY29tcGFyaXNvbiA9IGZhbHNlLlxuICovXG5jb25zdCBjb21wYXJlSWNvbnMgPSAoaWNvbjEsIGljb24yKSA9PiB7XG4gICAgcmV0dXJuIChpY29uMSAhPT0gbnVsbCAmJlxuICAgICAgICBpY29uMiAhPT0gbnVsbCAmJlxuICAgICAgICBpY29uMS5uYW1lID09PSBpY29uMi5uYW1lICYmXG4gICAgICAgIGljb24xLnByZWZpeCA9PT0gaWNvbjIucHJlZml4KTtcbn07XG4vKipcbiAqIFNjYW4gbm9kZSBmb3IgcGxhY2Vob2xkZXJzXG4gKi9cbmZ1bmN0aW9uIHNjYW5FbGVtZW50KHJvb3QpIHtcbiAgICAvLyBBZGQgdGVtcG9yYXJ5IG5vZGVcbiAgICBjb25zdCBub2RlID0gZmluZFJvb3ROb2RlKHJvb3QpO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgICBzY2FuRE9NKHtcbiAgICAgICAgICAgIG5vZGU6IHJvb3QsXG4gICAgICAgICAgICB0ZW1wb3Jhcnk6IHRydWUsXG4gICAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2NhbkRPTShub2RlKTtcbiAgICB9XG59XG4vKipcbiAqIFNjYW4gRE9NIGZvciBwbGFjZWhvbGRlcnNcbiAqL1xuZnVuY3Rpb24gc2NhbkRPTShub2RlLCBhZGRUZW1wTm9kZSA9IGZhbHNlKSB7XG4gICAgc2NhblF1ZXVlZCA9IGZhbHNlO1xuICAgIC8vIExpc3Qgb2YgaWNvbnMgdG8gbG9hZDogW3Byb3ZpZGVyXVtwcmVmaXhdW25hbWVdID0gYm9vbGVhblxuICAgIGNvbnN0IGljb25zVG9Mb2FkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAvLyBHZXQgcGxhY2Vob2xkZXJzXG4gICAgKG5vZGUgPyBbbm9kZV0gOiBsaXN0Um9vdE5vZGVzKCkpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm9vdCA9IHR5cGVvZiBub2RlLm5vZGUgPT09ICdmdW5jdGlvbicgPyBub2RlLm5vZGUoKSA6IG5vZGUubm9kZTtcbiAgICAgICAgaWYgKCFyb290IHx8ICFyb290LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUcmFjayBwbGFjZWhvbGRlcnNcbiAgICAgICAgbGV0IGhhc1BsYWNlaG9sZGVycyA9IGZhbHNlO1xuICAgICAgICAvLyBPYnNlcnZlclxuICAgICAgICBsZXQgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIC8vIEZpbmQgcGxhY2Vob2xkZXJzXG4gICAgICAgIGZpbmRQbGFjZWhvbGRlcnMocm9vdCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGl0ZW0uZWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGljb25OYW1lID0gaXRlbS5uYW1lO1xuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBpY29uTmFtZS5wcm92aWRlcjtcbiAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IGljb25OYW1lLnByZWZpeDtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpY29uTmFtZS5uYW1lO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBlbGVtZW50W2VsZW1lbnREYXRhUHJvcGVydHldO1xuICAgICAgICAgICAgLy8gSWNvbiBoYXMgbm90IGJlZW4gdXBkYXRlZCBzaW5jZSBsYXN0IHNjYW5cbiAgICAgICAgICAgIGlmIChkYXRhICE9PSB2b2lkIDAgJiYgY29tcGFyZUljb25zKGRhdGEubmFtZSwgaWNvbk5hbWUpKSB7XG4gICAgICAgICAgICAgICAgLy8gSWNvbiBuYW1lIHdhcyBub3QgY2hhbmdlZCBhbmQgZGF0YSBpcyBzZXQgLSBxdWlja2x5IHJldHVybiBpZiBpY29uIGlzIG1pc3Npbmcgb3Igc3RpbGwgbG9hZGluZ1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlzc2luZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUGVuZGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBlbmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQbGFjZWhvbGRlcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVjayBpY29uXG4gICAgICAgICAgICBjb25zdCBzdG9yYWdlID0gZ2V0U3RvcmFnZShwcm92aWRlciwgcHJlZml4KTtcbiAgICAgICAgICAgIGlmIChzdG9yYWdlLmljb25zW25hbWVdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAvLyBJY29uIGV4aXN0cyAtIHBhdXNlIG9ic2VydmVyIGJlZm9yZSByZXBsYWNpbmcgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICBpZiAoIXBhdXNlZCAmJiBub2RlLm9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdXNlT2JzZXJ2aW5nTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gR2V0IGN1c3RvbWlzYXRpb25zXG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9taXNhdGlvbnMgPSBpdGVtLmN1c3RvbWlzYXRpb25zICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgICAgICAgPyBpdGVtLmN1c3RvbWlzYXRpb25zXG4gICAgICAgICAgICAgICAgICAgIDogaXRlbS5maW5kZXIuY3VzdG9taXNhdGlvbnMoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgLy8gUmVuZGVyIGljb25cbiAgICAgICAgICAgICAgICByZW5kZXJJY29uSW5QbGFjZWhvbGRlcihpdGVtLCBjdXN0b21pc2F0aW9ucywgZ2V0SWNvbkZyb21TdG9yYWdlKHN0b3JhZ2UsIG5hbWUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RvcmFnZS5taXNzaW5nW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgLy8gTWFyayBhcyBtaXNzaW5nXG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogaWNvbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ21pc3NpbmcnLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21pc2F0aW9uczoge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBlbGVtZW50W2VsZW1lbnREYXRhUHJvcGVydHldID0gZGF0YTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzUGVuZGluZyh7IHByb3ZpZGVyLCBwcmVmaXgsIG5hbWUgfSkpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgaWNvbiB0byBsb2FkaW5nIHF1ZXVlXG4gICAgICAgICAgICAgICAgaWYgKGljb25zVG9Mb2FkW3Byb3ZpZGVyXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGljb25zVG9Mb2FkW3Byb3ZpZGVyXSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVySWNvbnNUb0xvYWQgPSBpY29uc1RvTG9hZFtwcm92aWRlcl07XG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpZGVySWNvbnNUb0xvYWRbcHJlZml4XSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVySWNvbnNUb0xvYWRbcHJlZml4XSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb3ZpZGVySWNvbnNUb0xvYWRbcHJlZml4XVtuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYXJrIGFzIGxvYWRpbmdcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogaWNvbk5hbWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnbG9hZGluZycsXG4gICAgICAgICAgICAgICAgY3VzdG9taXNhdGlvbnM6IHt9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGVsZW1lbnRbZWxlbWVudERhdGFQcm9wZXJ0eV0gPSBkYXRhO1xuICAgICAgICAgICAgaGFzUGxhY2Vob2xkZXJzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE5vZGUgc3R1ZmZcbiAgICAgICAgaWYgKG5vZGUudGVtcG9yYXJ5ICYmICFoYXNQbGFjZWhvbGRlcnMpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0ZW1wb3Jhcnkgbm9kZVxuICAgICAgICAgICAgc3RvcE9ic2VydmluZyhyb290KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRUZW1wTm9kZSAmJiBoYXNQbGFjZWhvbGRlcnMpIHtcbiAgICAgICAgICAgIC8vIEFkZCBuZXcgdGVtcG9yYXJ5IG5vZGVcbiAgICAgICAgICAgIG9ic2VydmUocm9vdCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGF1c2VkICYmIG5vZGUub2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIC8vIFJlc3VtZSBvYnNlcnZlclxuICAgICAgICAgICAgcmVzdW1lT2JzZXJ2aW5nTm9kZShub2RlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIExvYWQgaWNvbnNcbiAgICBPYmplY3Qua2V5cyhpY29uc1RvTG9hZCkuZm9yRWFjaCgocHJvdmlkZXIpID0+IHtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJJY29uc1RvTG9hZCA9IGljb25zVG9Mb2FkW3Byb3ZpZGVyXTtcbiAgICAgICAgT2JqZWN0LmtleXMocHJvdmlkZXJJY29uc1RvTG9hZCkuZm9yRWFjaCgocHJlZml4KSA9PiB7XG4gICAgICAgICAgICBsb2FkSWNvbnMoT2JqZWN0LmtleXMocHJvdmlkZXJJY29uc1RvTG9hZFtwcmVmaXhdKS5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uID0ge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcixcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGljb247XG4gICAgICAgICAgICB9KSwgY2hlY2tQZW5kaW5nSWNvbnMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcm90YXRlRnJvbVN0cmluZyh2YWx1ZSwgZGVmYXVsdFZhbHVlID0gMCkge1xuICBjb25zdCB1bml0cyA9IHZhbHVlLnJlcGxhY2UoL14tP1swLTkuXSovLCBcIlwiKTtcbiAgZnVuY3Rpb24gY2xlYW51cCh2YWx1ZTIpIHtcbiAgICB3aGlsZSAodmFsdWUyIDwgMCkge1xuICAgICAgdmFsdWUyICs9IDQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTIgJSA0O1xuICB9XG4gIGlmICh1bml0cyA9PT0gXCJcIikge1xuICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICByZXR1cm4gaXNOYU4obnVtKSA/IDAgOiBjbGVhbnVwKG51bSk7XG4gIH0gZWxzZSBpZiAodW5pdHMgIT09IHZhbHVlKSB7XG4gICAgbGV0IHNwbGl0ID0gMDtcbiAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICBjYXNlIFwiJVwiOlxuICAgICAgICBzcGxpdCA9IDI1O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZWdcIjpcbiAgICAgICAgc3BsaXQgPSA5MDtcbiAgICB9XG4gICAgaWYgKHNwbGl0KSB7XG4gICAgICBsZXQgbnVtID0gcGFyc2VGbG9hdCh2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSB1bml0cy5sZW5ndGgpKTtcbiAgICAgIGlmIChpc05hTihudW0pKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgbnVtID0gbnVtIC8gc3BsaXQ7XG4gICAgICByZXR1cm4gbnVtICUgMSA9PT0gMCA/IGNsZWFudXAobnVtKSA6IDA7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IHNlcGFyYXRvciA9IC9bXFxzLF0rLztcbmZ1bmN0aW9uIGZsaXBGcm9tU3RyaW5nKGN1c3RvbSwgZmxpcCkge1xuICBmbGlwLnNwbGl0KHNlcGFyYXRvcikuZm9yRWFjaCgoc3RyKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBzdHIudHJpbSgpO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6XG4gICAgICAgIGN1c3RvbS5oRmxpcCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6XG4gICAgICAgIGN1c3RvbS52RmxpcCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBhbGlnbm1lbnRGcm9tU3RyaW5nKGN1c3RvbSwgYWxpZ24pIHtcbiAgYWxpZ24uc3BsaXQoc2VwYXJhdG9yKS5mb3JFYWNoKChzdHIpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHN0ci50cmltKCk7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBjdXN0b20uaEFsaWduID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgY2FzZSBcIm1pZGRsZVwiOlxuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBjdXN0b20udkFsaWduID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNsaWNlXCI6XG4gICAgICBjYXNlIFwiY3JvcFwiOlxuICAgICAgICBjdXN0b20uc2xpY2UgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJtZWV0XCI6XG4gICAgICAgIGN1c3RvbS5zbGljZSA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYXR0cmlidXRlIGV4aXN0c1xuICovXG5mdW5jdGlvbiBoYXNBdHRyaWJ1dGUoZWxlbWVudCwga2V5KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKGtleSk7XG59XG4vKipcbiAqIEdldCBhdHRyaWJ1dGUgdmFsdWVcbiAqL1xuZnVuY3Rpb24gZ2V0QXR0cmlidXRlKGVsZW1lbnQsIGtleSkge1xuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpO1xufVxuLyoqXG4gKiBHZXQgYXR0cmlidXRlIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGdldEJvb2xlYW5BdHRyaWJ1dGUoZWxlbWVudCwga2V5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpO1xuICAgIGlmICh2YWx1ZSA9PT0ga2V5IHx8IHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogQm9vbGVhbiBhdHRyaWJ1dGVzXG4gKi9cbmNvbnN0IGJvb2xlYW5BdHRyaWJ1dGVzID0gW1xuICAgICdpbmxpbmUnLFxuICAgICdoRmxpcCcsXG4gICAgJ3ZGbGlwJyxcbl07XG4vKipcbiAqIFN0cmluZyBhdHRyaWJ1dGVzXG4gKi9cbmNvbnN0IHN0cmluZ0F0dHJpYnV0ZXMgPSBbXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0Jyxcbl07XG4vKipcbiAqIENsYXNzIG5hbWVzXG4gKi9cbmNvbnN0IG1haW5DbGFzcyA9ICdpY29uaWZ5JztcbmNvbnN0IGlubGluZUNsYXNzID0gJ2ljb25pZnktaW5saW5lJztcbi8qKlxuICogU2VsZWN0b3IgY29tYmluaW5nIGNsYXNzIG5hbWVzIGFuZCB0YWdzXG4gKi9cbmNvbnN0IHNlbGVjdG9yID0gJ2kuJyArXG4gICAgbWFpbkNsYXNzICtcbiAgICAnLCBzcGFuLicgK1xuICAgIG1haW5DbGFzcyArXG4gICAgJywgaS4nICtcbiAgICBpbmxpbmVDbGFzcyArXG4gICAgJywgc3Bhbi4nICtcbiAgICBpbmxpbmVDbGFzcztcbi8qKlxuICogRXhwb3J0IGZpbmRlciBmb3I6XG4gKiAgPHNwYW4gY2xhc3M9XCJpY29uaWZ5XCIgLz5cbiAqICA8aSBjbGFzcz1cImljb25pZnlcIiAvPlxuICogIDxzcGFuIGNsYXNzPVwiaWNvbmlmeS1pbmxpbmVcIiAvPlxuICogIDxpIGNsYXNzPVwiaWNvbmlmeS1pbmxpbmVcIiAvPlxuICovXG5jb25zdCBmaW5kZXIgPSB7XG4gICAgLyoqXG4gICAgICogRmluZCBhbGwgZWxlbWVudHNcbiAgICAgKi9cbiAgICBmaW5kOiAocm9vdCkgPT4gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSxcbiAgICAvKipcbiAgICAgKiBHZXQgaWNvbiBuYW1lIGZyb20gZWxlbWVudFxuICAgICAqL1xuICAgIG5hbWU6IChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChoYXNBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtaWNvbicpKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QXR0cmlidXRlKGVsZW1lbnQsICdkYXRhLWljb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldCBjdXN0b21pc2F0aW9ucyBsaXN0IGZyb20gZWxlbWVudFxuICAgICAqL1xuICAgIGN1c3RvbWlzYXRpb25zOiAoZWxlbWVudCwgZGVmYXVsdFZhbHVlcyA9IHtcbiAgICAgICAgaW5saW5lOiBmYWxzZSxcbiAgICB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRlZmF1bHRWYWx1ZXM7XG4gICAgICAgIC8vIENoZWNrIGNsYXNzIGxpc3QgZm9yIGlubGluZSBjbGFzc1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgY29uc3QgY2xhc3NMaXN0ID0gY2xhc3NOYW1lID8gY2xhc3NOYW1lLnNwbGl0KC9cXHMrLykgOiBbXTtcbiAgICAgICAgaWYgKGNsYXNzTGlzdC5pbmRleE9mKGlubGluZUNsYXNzKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJlc3VsdC5pbmxpbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJvdGF0aW9uXG4gICAgICAgIGlmIChoYXNBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtcm90YXRlJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcm90YXRlRnJvbVN0cmluZyhnZXRBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtcm90YXRlJykpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNob3J0aGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgIGlmIChoYXNBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtZmxpcCcpKSB7XG4gICAgICAgICAgICBmbGlwRnJvbVN0cmluZyhyZXN1bHQsIGdldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS1mbGlwJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtYWxpZ24nKSkge1xuICAgICAgICAgICAgYWxpZ25tZW50RnJvbVN0cmluZyhyZXN1bHQsIGdldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS1hbGlnbicpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBCb29sZWFuIGF0dHJpYnV0ZXNcbiAgICAgICAgYm9vbGVhbkF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICAgICAgaWYgKGhhc0F0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS0nICsgYXR0cikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldEJvb2xlYW5BdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtJyArIGF0dHIpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbYXR0cl0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBTdHJpbmcgYXR0cmlidXRlc1xuICAgICAgICBzdHJpbmdBdHRyaWJ1dGVzLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgICAgICAgIGlmIChoYXNBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtJyArIGF0dHIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtJyArIGF0dHIpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2F0dHJdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEZpbHRlciBjbGFzc2VzXG4gICAgICovXG4gICAgY2xhc3NGaWx0ZXI6IChjbGFzc0xpc3QpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUgIT09ICdpY29uaWZ5JyAmJlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSAhPT0gJycgJiZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUuc2xpY2UoMCwgOSkgIT09ICdpY29uaWZ5LS0nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbn07XG5cbi8vIGltcG9ydCB7IGZpbmRlciBhcyBpY29uaWZ5SWNvbkZpbmRlciB9IGZyb20gJy4vZmluZGVycy9pY29uaWZ5LWljb24nO1xuLyoqXG4gKiBHZW5lcmF0ZSBpY29uXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlSWNvbihuYW1lLCBjdXN0b21pc2F0aW9ucywgcmV0dXJuU3RyaW5nKSB7XG4gICAgLy8gR2V0IGljb24gZGF0YVxuICAgIGNvbnN0IGljb25EYXRhID0gZ2V0SWNvbkRhdGEobmFtZSk7XG4gICAgaWYgKCFpY29uRGF0YSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gU3BsaXQgbmFtZVxuICAgIGNvbnN0IGljb25OYW1lID0gc3RyaW5nVG9JY29uKG5hbWUpO1xuICAgIC8vIENsZWFuIHVwIGN1c3RvbWlzYXRpb25zXG4gICAgY29uc3QgY2hhbmdlcyA9IG1lcmdlQ3VzdG9taXNhdGlvbnMoZGVmYXVsdHMsIHR5cGVvZiBjdXN0b21pc2F0aW9ucyA9PT0gJ29iamVjdCcgPyBjdXN0b21pc2F0aW9ucyA6IHt9KTtcbiAgICAvLyBHZXQgZGF0YVxuICAgIHJldHVybiByZW5kZXJJY29uSW5QbGFjZWhvbGRlcih7XG4gICAgICAgIG5hbWU6IGljb25OYW1lLFxuICAgIH0sIGNoYW5nZXMsIGljb25EYXRhLCByZXR1cm5TdHJpbmcpO1xufVxuLyoqXG4gKiBHZXQgdmVyc2lvblxuICovXG5mdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xuICAgIHJldHVybiAnMi4yLjEnO1xufVxuLyoqXG4gKiBHZW5lcmF0ZSBTVkcgZWxlbWVudFxuICovXG5mdW5jdGlvbiByZW5kZXJTVkcobmFtZSwgY3VzdG9taXNhdGlvbnMpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVJY29uKG5hbWUsIGN1c3RvbWlzYXRpb25zLCBmYWxzZSk7XG59XG4vKipcbiAqIEdlbmVyYXRlIFNWRyBhcyBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gcmVuZGVySFRNTChuYW1lLCBjdXN0b21pc2F0aW9ucykge1xuICAgIHJldHVybiBnZW5lcmF0ZUljb24obmFtZSwgY3VzdG9taXNhdGlvbnMsIHRydWUpO1xufVxuLyoqXG4gKiBHZXQgcmVuZGVyZWQgaWNvbiBhcyBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgU1ZHICh1c2UgcmVwbGFjZUlEcyBvbiBib2R5KVxuICovXG5mdW5jdGlvbiByZW5kZXJJY29uKG5hbWUsIGN1c3RvbWlzYXRpb25zKSB7XG4gICAgLy8gR2V0IGljb24gZGF0YVxuICAgIGNvbnN0IGljb25EYXRhID0gZ2V0SWNvbkRhdGEobmFtZSk7XG4gICAgaWYgKCFpY29uRGF0YSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gQ2xlYW4gdXAgY3VzdG9taXNhdGlvbnNcbiAgICBjb25zdCBjaGFuZ2VzID0gbWVyZ2VDdXN0b21pc2F0aW9ucyhkZWZhdWx0cywgdHlwZW9mIGN1c3RvbWlzYXRpb25zID09PSAnb2JqZWN0JyA/IGN1c3RvbWlzYXRpb25zIDoge30pO1xuICAgIC8vIEdldCBkYXRhXG4gICAgcmV0dXJuIGljb25Ub1NWRyhpY29uRGF0YSwgY2hhbmdlcyk7XG59XG4vKipcbiAqIFNjYW4gRE9NXG4gKi9cbmZ1bmN0aW9uIHNjYW4ocm9vdCkge1xuICAgIGlmIChyb290KSB7XG4gICAgICAgIHNjYW5FbGVtZW50KHJvb3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2NhbkRPTSgpO1xuICAgIH1cbn1cbi8qKlxuICogSW5pdGlhbGlzZSBzdHVmZlxuICovXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEFkZCBkb2N1bWVudC5ib2R5IG5vZGVcbiAgICBhZGRCb2R5Tm9kZSgpO1xuICAgIC8vIEFkZCBmaW5kZXIgbW9kdWxlc1xuICAgIC8vIGFkZEZpbmRlcihpY29uaWZ5SWNvbkZpbmRlcik7XG4gICAgYWRkRmluZGVyKGZpbmRlcik7XG4gICAgY29uc3QgX3dpbmRvdyA9IHdpbmRvdztcbiAgICAvLyBMb2FkIGljb25zIGZyb20gZ2xvYmFsIFwiSWNvbmlmeVByZWxvYWRcIlxuICAgIGlmIChfd2luZG93Lkljb25pZnlQcmVsb2FkICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgcHJlbG9hZCA9IF93aW5kb3cuSWNvbmlmeVByZWxvYWQ7XG4gICAgICAgIGNvbnN0IGVyciA9ICdJbnZhbGlkIEljb25pZnlQcmVsb2FkIHN5bnRheC4nO1xuICAgICAgICBpZiAodHlwZW9mIHByZWxvYWQgPT09ICdvYmplY3QnICYmIHByZWxvYWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIChwcmVsb2FkIGluc3RhbmNlb2YgQXJyYXkgPyBwcmVsb2FkIDogW3ByZWxvYWRdKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBpdGVtIGlzIGFuIG9iamVjdCBhbmQgbm90IG51bGwvYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID09PSBudWxsIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtIGluc3RhbmNlb2YgQXJyYXkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciAnaWNvbnMnIGFuZCAncHJlZml4J1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGl0ZW0uaWNvbnMgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgaXRlbS5wcmVmaXggIT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgaWNvbiBzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICFhZGRDb2xsZWN0aW9uKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIExvYWQgb2JzZXJ2ZXIgYW5kIHNjYW4gRE9NIG9uIG5leHQgdGlja1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpbml0T2JzZXJ2ZXIoc2NhbkRPTSk7XG4gICAgICAgIHNjYW5ET00oKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBFbmFibGUgY2FjaGVcbiAqL1xuZnVuY3Rpb24gZW5hYmxlQ2FjaGUoc3RvcmFnZSwgZW5hYmxlKSB7XG4gICAgdG9nZ2xlQnJvd3NlckNhY2hlKHN0b3JhZ2UsIGVuYWJsZSAhPT0gZmFsc2UpO1xufVxuLyoqXG4gKiBEaXNhYmxlIGNhY2hlXG4gKi9cbmZ1bmN0aW9uIGRpc2FibGVDYWNoZShzdG9yYWdlKSB7XG4gICAgdG9nZ2xlQnJvd3NlckNhY2hlKHN0b3JhZ2UsIHRydWUpO1xufVxuLyoqXG4gKiBJbml0aWFsaXNlIHN0dWZmXG4gKi9cbi8vIFNldCBBUEkgbW9kdWxlXG5zZXRBUElNb2R1bGUoJycsIGZldGNoQVBJTW9kdWxlKTtcbi8qKlxuICogQnJvd3NlciBzdHVmZlxuICovXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIFNldCBjYWNoZSBhbmQgbG9hZCBleGlzdGluZyBjYWNoZVxuICAgIGNhY2hlLnN0b3JlID0gc3RvcmVDYWNoZTtcbiAgICBsb2FkQ2FjaGUoKTtcbiAgICBjb25zdCBfd2luZG93ID0gd2luZG93O1xuICAgIC8vIFNldCBBUEkgZnJvbSBnbG9iYWwgXCJJY29uaWZ5UHJvdmlkZXJzXCJcbiAgICBpZiAoX3dpbmRvdy5JY29uaWZ5UHJvdmlkZXJzICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJzID0gX3dpbmRvdy5JY29uaWZ5UHJvdmlkZXJzO1xuICAgICAgICBpZiAodHlwZW9mIHByb3ZpZGVycyA9PT0gJ29iamVjdCcgJiYgcHJvdmlkZXJzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSAnSWNvbmlmeVByb3ZpZGVyc1snICsga2V5ICsgJ10gaXMgaW52YWxpZC4nO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvdmlkZXJzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAhdmFsdWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnJlc291cmNlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFkZEFQSVByb3ZpZGVyKGtleSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSW50ZXJuYWwgQVBJXG4gKi9cbmNvbnN0IF9hcGkgPSB7XG4gICAgZ2V0QVBJQ29uZmlnLFxuICAgIHNldEFQSU1vZHVsZSxcbiAgICBzZW5kQVBJUXVlcnksXG4gICAgc2V0RmV0Y2gsXG4gICAgZ2V0RmV0Y2gsXG4gICAgbGlzdEFQSVByb3ZpZGVycyxcbiAgICBtZXJnZVBhcmFtcyxcbn07XG4vKipcbiAqIEdsb2JhbCB2YXJpYWJsZVxuICovXG5jb25zdCBJY29uaWZ5ID0ge1xuICAgIC8vIEljb25pZnlBUElJbnRlcm5hbEZ1bmN0aW9uc1xuICAgIF9hcGksXG4gICAgLy8gSWNvbmlmeUFQSUZ1bmN0aW9uc1xuICAgIGFkZEFQSVByb3ZpZGVyLFxuICAgIGxvYWRJY29ucyxcbiAgICBsb2FkSWNvbixcbiAgICAvLyBJY29uaWZ5U3RvcmFnZUZ1bmN0aW9uc1xuICAgIGljb25FeGlzdHMsXG4gICAgZ2V0SWNvbixcbiAgICBsaXN0SWNvbnMsXG4gICAgYWRkSWNvbixcbiAgICBhZGRDb2xsZWN0aW9uLFxuICAgIHNoYXJlU3RvcmFnZSxcbiAgICAvLyBJY29uaWZ5QnVpbGRlckZ1bmN0aW9uc1xuICAgIHJlcGxhY2VJRHMsXG4gICAgY2FsY3VsYXRlU2l6ZSxcbiAgICBidWlsZEljb24sXG4gICAgLy8gSWNvbmlmeUNvbW1vbkZ1bmN0aW9uc1xuICAgIGdldFZlcnNpb24sXG4gICAgcmVuZGVyU1ZHLFxuICAgIHJlbmRlckhUTUwsXG4gICAgcmVuZGVySWNvbixcbiAgICBzY2FuLFxuICAgIG9ic2VydmUsXG4gICAgc3RvcE9ic2VydmluZyxcbiAgICBwYXVzZU9ic2VydmVyLFxuICAgIHJlc3VtZU9ic2VydmVyLFxuICAgIC8vIEljb25pZnlCcm93c2VyQ2FjaGVGdW5jdGlvbnNcbiAgICBlbmFibGVDYWNoZSxcbiAgICBkaXNhYmxlQ2FjaGUsXG59O1xuXG5leHBvcnQgeyBfYXBpLCBhZGRBUElQcm92aWRlciwgYWRkQ29sbGVjdGlvbiwgYWRkSWNvbiwgYnVpbGRJY29uLCBjYWxjdWxhdGVTaXplLCBJY29uaWZ5IGFzIGRlZmF1bHQsIGRpc2FibGVDYWNoZSwgZW5hYmxlQ2FjaGUsIGdldEljb24sIGdldFZlcnNpb24sIGljb25FeGlzdHMsIGxpc3RJY29ucywgbG9hZEljb24sIGxvYWRJY29ucywgb2JzZXJ2ZSwgcGF1c2VPYnNlcnZlciwgcmVuZGVySFRNTCwgcmVuZGVySWNvbiwgcmVuZGVyU1ZHLCByZXBsYWNlSURzLCByZXN1bWVPYnNlcnZlciwgc2Nhbiwgc2hhcmVTdG9yYWdlLCBzdG9wT2JzZXJ2aW5nIH07XG5cbi8vIEV4cG9ydCB0byB3aW5kb3cgb3Igd2ViIHdvcmtlclxudHJ5IHtcblx0aWYgKHNlbGYuSWNvbmlmeSA9PT0gdm9pZCAwKSB7XG5cdFx0c2VsZi5JY29uaWZ5ID0gSWNvbmlmeTtcblx0fVxufSBjYXRjaCAoZXJyKSB7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBJY29uaWZ5IGZyb20gJ0BpY29uaWZ5L2ljb25pZnknO1xyXG5pbXBvcnQgY3JlYXRlQ29udGVudCBmcm9tICcuL2hvbWVQYWdlJztcclxuY29uc3QgY29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XHJcbmNvbnNvbGUubG9nKGNvbnRlbnRDb250YWluZXIpO1xyXG5jcmVhdGVDb250ZW50KGNvbnRlbnRDb250YWluZXIpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=