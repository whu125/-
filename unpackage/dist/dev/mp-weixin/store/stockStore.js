"use strict";
const common_vendor = require("../common/vendor.js");
const useStockStore = common_vendor.defineStore("stockStore", {
  state: () => {
    return {
      stockList: []
    };
  },
  actions: {},
  getters: {}
});
exports.useStockStore = useStockStore;
