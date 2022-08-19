"use strict";
var store_results = require("../../store/results.js");
var common_vendor = require("../../common/vendor.js");
function generator(type, params) {
  const store = store_results.useResultStore();
  const generateResult = () => {
    console.log(type, Object.values(params).map((item) => item.value));
    let result = [];
    switch (type) {
      case "name":
        result = handleName(params);
        break;
      case "dao":
        result = handleDao(params);
        break;
      case "skill":
        result = handleSkill(params);
        break;
      case "book":
        result = handleBook(params);
        break;
      case "creature":
        result = handleCreature(params);
        break;
      case "material":
        result = handleMaterial(params);
        break;
      case "alchemy":
        result = handleAlchemy(params);
        break;
      case "talisman":
        result = handleTalisman(params);
        break;
      case "clan":
        result = handleClan(params);
        break;
      case "nation":
        result = handleNation(params);
        break;
      case "location":
        result = handleLocation(params);
        break;
      case "zone":
        result = handleZone(params);
        break;
    }
    store.set_results(result);
  };
  return {
    generateResult
  };
}
function handleName(options) {
  const number = options == null ? void 0 : options.number.value;
  const isFemale = options == null ? void 0 : options.isFemale.value;
  const style = options == null ? void 0 : options.style.value;
  const familyName = options == null ? void 0 : options.familyName.value;
  const middleCharacter = options == null ? void 0 : options.middleCharacter.value;
  return common_vendor.getName(number, { familyName, isFemale, style, middleCharacter });
}
function handleDao(options) {
  const number = options == null ? void 0 : options.number.value;
  const isFemale = options == null ? void 0 : options.isFemale.value;
  const title = (options == null ? void 0 : options.title.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.title.value;
  const firstCharacter = options == null ? void 0 : options.firstCharacter.value;
  return common_vendor.getDao(number, { firstCharacter, isFemale, title });
}
function handleSkill(options) {
  const length = (options == null ? void 0 : options.length.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.length.value;
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  const prefix = (options == null ? void 0 : options.prefix.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.prefix.value;
  const numfix = (options == null ? void 0 : options.numfix.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.numfix.value;
  return common_vendor.getSkill(options == null ? void 0 : options.number.value, { length, kind, prefix, numfix });
}
function handleBook(options) {
  const length = (options == null ? void 0 : options.length.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.length.value;
  const mainkind = (options == null ? void 0 : options.mainKind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.mainKind.value;
  const postkind = (options == null ? void 0 : options.postKind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.postKind.value;
  const prefix = (options == null ? void 0 : options.prefix.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.prefix.value;
  const postfix = (options == null ? void 0 : options.postfix.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.postfix.value;
  return common_vendor.getBook(options == null ? void 0 : options.number.value, { length, mainkind, postkind, prefix, postfix });
}
function handleCreature(options) {
  const category = (options == null ? void 0 : options.category.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.category.value;
  const rarity = (options == null ? void 0 : options.rarity.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.rarity.value;
  return common_vendor.getCreature(options == null ? void 0 : options.number.value, { category, rarity });
}
function handleMaterial(options) {
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  const rarity = options == null ? void 0 : options.rarity.value;
  const postfix = (options == null ? void 0 : options.postfix.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.postfix.value;
  return common_vendor.getMaterial(options == null ? void 0 : options.number.value, { kind, rarity, postfix });
}
function handleAlchemy(options) {
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  return common_vendor.getAlchemy(options == null ? void 0 : options.number.value, kind);
}
function handleTalisman(options) {
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  const rarity = options == null ? void 0 : options.rarity.value;
  const postfix = (options == null ? void 0 : options.postfix.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.postfix.value;
  return common_vendor.getTalisman(options == null ? void 0 : options.number.value, { kind, rarity, postfix });
}
function handleClan(options) {
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  return common_vendor.getClan(options == null ? void 0 : options.number.value, kind);
}
function handleNation(options) {
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  return common_vendor.getNation(options == null ? void 0 : options.number.value, kind);
}
function handleLocation(options) {
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  return common_vendor.getLocation(options == null ? void 0 : options.number.value, kind);
}
function handleZone(options) {
  const kind = (options == null ? void 0 : options.kind.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.kind.value;
  const category = (options == null ? void 0 : options.category.value) === "\u968F\u673A" ? null : options == null ? void 0 : options.category.value;
  return common_vendor.getZone(options == null ? void 0 : options.number.value, { kind, category });
}
exports.generator = generator;
