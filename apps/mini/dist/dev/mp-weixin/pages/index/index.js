"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  _easycom_uni_grid_item2();
}
const _easycom_uni_grid_item = () => "../../components/uni-grid-item/uni-grid-item.js";
if (!Math) {
  (_easycom_uni_grid_item + uniGrid + conditionPanel + resultPanel)();
}
const uniGrid = () => "../../components/uni-grid/uni-grid.js";
const resultPanel = () => "../../view-components/result/result-panel.js";
const conditionPanel = () => "../../view-components/conditions/conditions.js";
const __default__ = {
  components: { uniGrid, resultPanel, conditionPanel }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  setup(__props) {
    const list = [
      { value: "name", label: "\u4EBA\u540D" },
      { value: "dao", label: "\u6CD5\u53F7" },
      { value: "skill", label: "\u529F\u6CD5" },
      { value: "book", label: "\u79D8\u7C4D" },
      { value: "creature", label: "\u751F\u7075" },
      { value: "material", label: "\u6750\u6599" },
      { value: "alchemy", label: "\u4E39\u836F" },
      { value: "talisman", label: "\u6CD5\u5B9D" },
      { value: "clan", label: "\u95E8\u6D3E" },
      { value: "nation", label: "\u56FD\u5BB6" },
      { value: "location", label: "\u636E\u70B9" },
      { value: "zone", label: "\u5730\u57DF" }
    ];
    const select = common_vendor.ref("name");
    const handleTouch = (e) => {
      const item = list[e.detail.index];
      select.value = item.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.n(select.value === item.value ? "grid-item-box grid-item-box-active" : "grid-item-box"),
            c: item.value,
            d: "73cdddac-1-" + i0 + ",73cdddac-0",
            e: common_vendor.p({
              index
            })
          };
        }),
        b: common_vendor.o(handleTouch),
        c: common_vendor.p({
          column: 6,
          borderColor: "#a9cecf"
        }),
        d: common_vendor.p({
          ["tab-key"]: select.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/\u5404\u79CD\u4EE3\u7801/project/\u4E2A\u4EBA\u9879\u76EE/fantasy_names/apps/mini/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
