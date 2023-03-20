"use strict";
const common_vendor = require("../../common/vendor.js");
const store_stockStore = require("../../store/stockStore.js");
if (!Array) {
  const _easycom_g_slider2 = common_vendor.resolveComponent("g-slider");
  _easycom_g_slider2();
}
const _easycom_g_slider = () => "../../uni_modules/g-slider/components/g-slider/g-slider.js";
if (!Math) {
  (TradeTab + search + tab + ShowList + _easycom_g_slider)();
}
const TradeTab = () => "./components/TradeTab.js";
const search = () => "../../common/compoments/search.js";
const tab = () => "../../common/compoments/tab.js";
const ShowList = () => "../../common/compoments/ShowList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const isMounted = common_vendor.ref(false);
    let stockItem = common_vendor.reactive([]);
    const stockStore = store_stockStore.useStockStore();
    const { stockList } = common_vendor.storeToRefs(stockStore);
    const getStock = (id) => {
      stockItem = stockList.value.filter(
        (item) => item.id == id
      );
      console.log(stockItem);
    };
    common_vendor.onLoad((option) => {
      const { id } = option;
      console.log("传入了id", id);
      getStock(id);
      isMounted.value = !isMounted.value;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isMounted.value
      }, isMounted.value ? {
        b: common_vendor.p({
          data: common_vendor.unref(stockItem)
        })
      } : {}, {
        c: common_vendor.p({
          sliderSize: "20"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da315d97"], ["__file", "/Users/whu125/前端项目/FreedomCF/pages/trade/detail.vue"]]);
wx.createPage(MiniProgramPage);
