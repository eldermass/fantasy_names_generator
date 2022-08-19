"use strict";
var common_vendor = require("../../common/vendor.js");
var viewComponents_conditions_generateResult = require("./generate-result.js");
require("../../store/results.js");
if (!Math) {
  (ConditionItem + cyInput)();
}
const ConditionItem = () => "./condition-item.js";
const cyInput = () => "../cy-input/cy-input.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const styleOptions = [
      { text: "\u968F\u673A", value: null },
      { text: "\u4E00\u4E2A\u5B9E\u5B57", value: "single" },
      { text: "\u4E24\u4E2A\u5B9E\u5B57", value: "double" },
      { text: "\u865A\u5B57 + \u5B9E\u5B57", value: "combine" }
    ];
    const number = common_vendor.ref(10);
    const isFemale = common_vendor.ref(null);
    const style = common_vendor.ref(null);
    const familyName = common_vendor.ref();
    const middleCharacter = common_vendor.ref();
    const params = {
      number,
      isFemale,
      style,
      familyName,
      middleCharacter
    };
    const { generateResult } = viewComponents_conditions_generateResult.generator("name", params);
    const handleChange = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => number.value = $event),
        b: common_vendor.p({
          title: "\u6570\u91CF",
          optionList: common_vendor.unref(common_vendor.numberOptions),
          modelValue: number.value
        }),
        c: common_vendor.o(($event) => isFemale.value = $event),
        d: common_vendor.p({
          title: "\u6027\u522B",
          optionList: common_vendor.unref(common_vendor.sexOptions),
          modelValue: isFemale.value
        }),
        e: common_vendor.o(($event) => style.value = $event),
        f: common_vendor.p({
          title: "\u6837\u5F0F",
          optionList: common_vendor.unref(styleOptions),
          modelValue: style.value
        }),
        g: common_vendor.o(($event) => familyName.value = $event),
        h: common_vendor.p({
          label: "\u59D3\u6C0F",
          modelValue: familyName.value
        }),
        i: common_vendor.o(handleChange),
        j: common_vendor.o(($event) => middleCharacter.value = $event),
        k: common_vendor.p({
          label: "\u5B57\u8F88",
          modelValue: middleCharacter.value
        }),
        l: common_vendor.o(
          (...args) => common_vendor.unref(generateResult) && common_vendor.unref(generateResult)(...args)
        )
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/\u5404\u79CD\u4EE3\u7801/project/\u4E2A\u4EBA\u9879\u76EE/fantasy_names/apps/mini/src/view-components/conditions/name.vue"]]);
wx.createComponent(Component);
