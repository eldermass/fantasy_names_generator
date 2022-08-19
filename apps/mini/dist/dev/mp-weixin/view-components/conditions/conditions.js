"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_Transition = common_vendor.resolveComponent("Transition");
  _component_Transition();
}
if (!Math) {
  Name();
}
const Name = () => "./name.js";
const __default__ = {
  components: Name
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: {
    tabKey: { type: String, required: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "slide-fade",
          mode: "out-in"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/\u5404\u79CD\u4EE3\u7801/project/\u4E2A\u4EBA\u9879\u76EE/fantasy_names/apps/mini/src/view-components/conditions/conditions.vue"]]);
wx.createComponent(Component);
