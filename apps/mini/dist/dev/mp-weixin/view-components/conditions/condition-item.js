"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    title: { type: String, required: true },
    type: { type: String, required: false, default: "object" },
    value: { type: null, required: true, default: "" },
    optionList: { type: null, required: true, default: () => [] }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    const index = common_vendor.ref(0);
    const handleChange = (value) => {
      emits("update:value", value);
      emits("change", value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.o(handleChange),
        c: index.value,
        d: __props.optionList
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/\u5404\u79CD\u4EE3\u7801/project/\u4E2A\u4EBA\u9879\u76EE/fantasy_names/apps/mini/src/view-components/conditions/condition-item.vue"]]);
wx.createComponent(Component);
