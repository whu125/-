"use strict";
const common_vendor = require("../../common/vendor.js");
const store_stockStore = require("../../store/stockStore.js");
if (!Math) {
  (TradeTab + search + tab + ShowList)();
}
const TradeTab = () => "./components/TradeTab.js";
const search = () => "../../common/compoments/search.js";
const tab = () => "../../common/compoments/tab.js";
const ShowList = () => "../../common/compoments/ShowList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const stockStore = store_stockStore.useStockStore();
    const { stockList } = common_vendor.storeToRefs(stockStore);
    common_vendor.onMounted(() => {
      stockList.value = stockLists;
    });
    const stockLists = common_vendor.reactive([
      {
        id: "1",
        //股票编号
        name: "测试",
        description: "11111111111111",
        upDown: 0,
        //0表示跌 1表示涨
        number: 0
      },
      {
        id: "2",
        name: "",
        description: "",
        upDown: 0,
        //0表示跌 1表示涨
        number: 2.5
      },
      {
        id: "3",
        name: "",
        description: "",
        upDown: 0,
        //0表示跌 1表示涨
        number: 2.5
      },
      {
        id: "4",
        //股票编号
        name: "测试",
        description: "",
        upDown: 0,
        //0表示跌 1表示涨
        number: 2.5
      },
      {
        id: "5",
        //股票编号
        name: "测试",
        description: "",
        upDown: 0
        //0表示跌 1表示涨
      }
    ]);
    const toDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/trade/detail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toDetail),
        b: common_vendor.p({
          data: stockLists
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1fe0e1fb"], ["__file", "/Users/whu125/前端项目/FreedomCF/pages/trade/index.vue"]]);
wx.createPage(MiniProgramPage);
