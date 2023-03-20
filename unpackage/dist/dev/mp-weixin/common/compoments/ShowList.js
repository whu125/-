"use strict";
const common_vendor = require("../vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ShowList",
  props: {
    data: null
  },
  emits: ["showDetail"],
  setup(__props, { emit: emits }) {
    const props = __props;
    function emitShowDetail(id) {
      emits("showDetail", id);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.data, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.description),
            c: common_vendor.t(item.number),
            d: item.id,
            e: common_vendor.o(($event) => emitShowDetail(item.id), item.id)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32bc9ce6"], ["__file", "/Users/whu125/前端项目/FreedomCF/common/compoments/ShowList.vue"]]);
wx.createComponent(Component);
