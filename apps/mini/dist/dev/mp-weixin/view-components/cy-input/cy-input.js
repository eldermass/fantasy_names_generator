"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    value: { type: [String, null], required: false },
    label: { type: String, required: false }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const val = common_vendor.ref();
    const handleInput = (e) => {
      console.log(e.target);
      emits("update:value", e.target.value);
      emits("change", e.target.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.label || "label"),
        b: val.value,
        c: common_vendor.o(handleInput)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cf1a316"], ["__file", "E:/\u5404\u79CD\u4EE3\u7801/project/\u4E2A\u4EBA\u9879\u76EE/fantasy_names/apps/mini/src/view-components/cy-input/cy-input.vue"]]);
wx.createComponent(Component);
