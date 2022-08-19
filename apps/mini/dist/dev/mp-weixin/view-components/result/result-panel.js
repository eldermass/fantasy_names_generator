"use strict";
var common_vendor = require("../../common/vendor.js");
var store_results = require("../../store/results.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const store = store_results.useResultStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(store).results, (item, index, i0) => {
          return {
            a: common_vendor.t(typeof item === "string" ? item : item.name),
            b: index
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/\u5404\u79CD\u4EE3\u7801/project/\u4E2A\u4EBA\u9879\u76EE/fantasy_names/apps/mini/src/view-components/result/result-panel.vue"]]);
wx.createComponent(Component);
