<template>
	<movable-area v-if="['horizontal','vertical'].includes(direction)" class="g-slider" id="movable_area"
		:animation="false" :class="[direction]"
		:style="[movableAreaStyle]">
		<view class="g-slider-bg"
			:style="[sliderBgStyle,{
					backgroundColor:bgColor,
			}]">
			<template v-if="direction == 'horizontal'">
				<view class="g-slider-vl" :class="[direction]"
					:style="{
					width: `${sliderNumber}%`,
					backgroundColor:activeColor
				}">
				</view>
			</template>
			<template v-else>
				<view class="g-slider-vl" :class="[direction]"
					:style="{
					height: `${sliderNumber}%`,
					backgroundColor:activeColor
				}">
				</view>
			</template>
		</view>
		<movable-view class="slider-btn"
			v-if="direction == 'horizontal'"
			id="movable_btn"
			:x="movableNumber"
			:style="[g_movableStyle]"
			:direction="direction"
			@change="sliderChange">
		</movable-view>
		<movable-view class="slider-btn"
			v-if="direction == 'vertical'"
			id="movable_btn"
			:y="movableNumber"
			:style="[g_movableStyle]"
			:direction="direction"
			@change="sliderChange">
		</movable-view>
	</movable-area>
</template>
<script>
	export default {
		name: "GSlider",
		props: {
			modelValue: {
				type: [String, Number],
				default: 0,
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
					flexDirection: this.direction == 'horizontal' ? '' : 'column'
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
				directionKey: this.direction == 'horizontal' ? 'width' : 'height'
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
				deep: true,
			}
		},
		created() {
			this.sliderBgStyle[this.direction == 'horizontal' ? 'height' : 'width'] = `${this.sliderSize}rpx`;
			this.initMovableStyle();
		},
		mounted() {
			// 初始化样式 宽度获取
			let query = null;
			query = uni.createSelectorQuery();
			// #ifndef MP-ALIPAY
			query = query.in(this);
			// #endif
			query.select('#movable_area').boundingClientRect()
				.select("#movable_btn").boundingClientRect()
				.exec((data) => {
					console.log(data, 'data');
					data.forEach(item => {
						this.clientRectConfig[`${item.id}_width`] = item.width;
						this.clientRectConfig[`${item.id}_height`] = item.height;
					});
					this.setMovableAreaStyle();
					this.setSliderBgStyle();
					this.sliderConfig[this.directionKey] = (
						this.clientRectConfig[`movable_area_${this.directionKey}`] -
						this.clientRectConfig[`movable_btn_${this.directionKey}`]);
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
				const key = this.direction == 'horizontal' ? 'height' : 'width';
				this.movableAreaStyle[key] = `${this.clientRectConfig[`movable_btn_${this.directionKey}`]}px`;
			},
			setSliderBgStyle() {
				let sliderBgPadding = [];
				if (this.direction == 'horizontal') {
					sliderBgPadding = [0, `${this.clientRectConfig[`movable_btn_${this.directionKey}`]/2}px`];
				} else {
					sliderBgPadding = [`${this.clientRectConfig[`movable_btn_${this.directionKey}`]/2}px`, 0];
				}
				this.sliderBgStyle.margin = sliderBgPadding.join(' ');
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
				this.movableNumber = this.sliderConfig[this.directionKey] * ((this.modelValue - this.min) / (this.max -
					this.min));
			},
			sliderChange(event) {
				const detail = event.detail;
				const key = this.direction == 'horizontal' ? 'x' : 'y';
				const percentage = detail[key] / this.sliderConfig[this.directionKey];
				this.sliderNumber = Math.round(percentage * 100);
				this.defaultValue = Math.round(percentage * (this.max - this.min) + this.min);
				this.valchange();
			},
			valchange() {
				// #ifdef  VUE3
				this.$emit('update:modelValue', this.defaultValue);
				// #endif
				// #ifndef VUE3
				this.$emit('input', this.defaultValue);
				// #endif
			}
		},
	};
</script>
<style lang="scss" scoped>
	.g-slider {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;

		&.horizontal {
			width: 100%;
		}

		&.vertical {
			height: 100%;
		}

		.g-slider-bg {
			width: 100%;
			height: 100%;
			flex: 1;

			.g-slider-vl {
				&.horizontal {
					height: 100%;
				}

				&.vertical {
					width: 100%;
				}
			}
		}

		.slider-btn {
			background-color: #fff;
			border: 5rpx solid #409eff;
			border-radius: 50%;
		}
	}
</style>
