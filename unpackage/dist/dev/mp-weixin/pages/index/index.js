"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const toTrade = () => {
      common_vendor.index.navigateTo({
        url: "../trade/index"
      });
    };
    const toBank = () => {
      common_vendor.index.navigateTo({
        url: "../bank/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toBank),
        b: common_vendor.o(toTrade)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/whu125/前端项目/FreedomCF/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
