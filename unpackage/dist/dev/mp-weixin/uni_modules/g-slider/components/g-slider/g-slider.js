"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "GSlider",
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    sliderSize: {
      type: [String, Number],
      default: 10
    },
    bgColor: {
      tpye: String,
      default: "#e4e7ed"
    },
    activeColor: {
      type: String,
      default: "#409EFF"
    },
    movableSize: {
      type: [String, Number],
      default: 30
    },
    movableStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      clientRectConfig: {
        movable_area_width: 0,
        movable_area_htight: 0,
        movable_btn_width: 0,
        movable_btn_height: this.movableSize / 2
      },
      movableAreaStyle: {
        width: "100%",
        height: "100%",
        flexDirection: this.direction == "horizontal" ? "" : "column"
      },
      // 进度条的背景样式
      sliderBgStyle: {},
      // 进度条背景的元素信息
      sliderConfig: {
        width: 0,
        height: 0
      },
      movableBtnWidth: 0,
      movableNumber: 0,
      sliderNumber: 0,
      defaultValue: 0,
      g_movableStyle: {
        width: `${this.movableSize}rpx`,
        height: `${this.movableSize}rpx`
      },
      directionKey: this.direction == "horizontal" ? "width" : "height"
    };
  },
  watch: {
    modelValue: {
      handler(newValue) {
        if (this.defaultValue == newValue) {
          return;
        }
        this.initMovableX();
      },
      deep: true
    }
  },
  created() {
    this.sliderBgStyle[this.direction == "horizontal" ? "height" : "width"] = `${this.sliderSize}rpx`;
    this.initMovableStyle();
  },
  mounted() {
    let query = null;
    query = common_vendor.index.createSelectorQuery();
    query = query.in(this);
    query.select("#movable_area").boundingClientRect().select("#movable_btn").boundingClientRect().exec((data) => {
      console.log(data, "data");
      data.forEach((item) => {
        this.clientRectConfig[`${item.id}_width`] = item.width;
        this.clientRectConfig[`${item.id}_height`] = item.height;
      });
      this.setMovableAreaStyle();
      this.setSliderBgStyle();
      this.sliderConfig[this.directionKey] = this.clientRectConfig[`movable_area_${this.directionKey}`] - this.clientRectConfig[`movable_btn_${this.directionKey}`];
      if (this.modelValue < this.min) {
        this.defaultValue = this.min;
        this.movableX = 0;
        this.valchange();
      } else {
        this.initMovableX();
      }
    });
  },
  methods: {
    setMovableAreaStyle() {
      const key = this.direction == "horizontal" ? "height" : "width";
      this.movableAreaStyle[key] = `${this.clientRectConfig[`movable_btn_${this.directionKey}`]}px`;
    },
    setSliderBgStyle() {
      let sliderBgPadding = [];
      if (this.direction == "horizontal") {
        sliderBgPadding = [0, `${this.clientRectConfig[`movable_btn_${this.directionKey}`] / 2}px`];
      } else {
        sliderBgPadding = [`${this.clientRectConfig[`movable_btn_${this.directionKey}`] / 2}px`, 0];
      }
      this.sliderBgStyle.margin = sliderBgPadding.join(" ");
    },
    initMovableStyle() {
      for (const key in this.movableStyle) {
        if (/transform|width|height/.test(key.toLowerCase())) {
          console.warn(`不支持设置 ${key} 属性！`);
        } else {
          this.g_movableStyle[key] = this.movableStyle[key];
        }
      }
    },
    // 计算滑块的位置
    initMovableX() {
      this.movableNumber = this.sliderConfig[this.directionKey] * ((this.modelValue - this.min) / (this.max - this.min));
    },
    sliderChange(event) {
      const detail = event.detail;
      const key = this.direction == "horizontal" ? "x" : "y";
      const percentage = detail[key] / this.sliderConfig[this.directionKey];
      this.sliderNumber = Math.round(percentage * 100);
      this.defaultValue = Math.round(percentage * (this.max - this.min) + this.min);
      this.valchange();
    },
    valchange() {
      this.$emit("update:modelValue", this.defaultValue);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: ["horizontal", "vertical"].includes($props.direction)
  }, ["horizontal", "vertical"].includes($props.direction) ? common_vendor.e({
    b: $props.direction == "horizontal"
  }, $props.direction == "horizontal" ? {
    c: common_vendor.n($props.direction),
    d: `${$data.sliderNumber}%`,
    e: $props.activeColor
  } : {
    f: common_vendor.n($props.direction),
    g: `${$data.sliderNumber}%`,
    h: $props.activeColor
  }, {
    i: common_vendor.s($data.sliderBgStyle),
    j: common_vendor.s({
      backgroundColor: $props.bgColor
    }),
    k: $props.direction == "horizontal"
  }, $props.direction == "horizontal" ? {
    l: $data.movableNumber,
    m: common_vendor.s($data.g_movableStyle),
    n: $props.direction,
    o: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args))
  } : {}, {
    p: $props.direction == "vertical"
  }, $props.direction == "vertical" ? {
    q: $data.movableNumber,
    r: common_vendor.s($data.g_movableStyle),
    s: $props.direction,
    t: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args))
  } : {}, {
    v: common_vendor.n($props.direction),
    w: common_vendor.s($data.movableAreaStyle)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f4facd2c"], ["__file", "/Users/whu125/前端项目/FreedomCF/uni_modules/g-slider/components/g-slider/g-slider.vue"]]);
wx.createComponent(Component);
