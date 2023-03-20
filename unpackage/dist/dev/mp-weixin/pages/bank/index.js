"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (News + search + tab)();
}
const search = () => "../../common/compoments/search.js";
const tab = () => "../../common/compoments/tab.js";
const News = () => "../../common/compoments/News.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const bankList = common_vendor.reactive([
      {
        id: 0,
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      },
      {
        imgSrl: "",
        name: ""
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bankList, (item, k0, i0) => {
          return {
            a: item.id
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc3afe3c"], ["__file", "/Users/whu125/前端项目/FreedomCF/pages/bank/index.vue"]]);
wx.createPage(MiniProgramPage);
