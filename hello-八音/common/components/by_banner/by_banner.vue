<template>
	<view>
		<swiper :style="swiper_style" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item by-bg-yellow">
					<image :src="item.img_url" mode="widthFix"></image>
				</view>
			</swiper-item>
			 
		</swiper>

	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 750
			},
			height: {
				type: Number,
				default: 420
			},
			list: {
				type: Array,
				default: function() {
					return [
						{
							img_url: 'http://img.gek6.com/FqQcDVfz8AbuPbtx1C3P54bB8nN2',
							link: ''
						},
						{
							img_url: 'http://img.gek6.com/Fn40Czdo4qnPEmLDPAvFPJ4N9iZ5',
							link: ''
						},
						{
							img_url: 'http://img.gek6.com/FqwZoe00HuNPIJBowKWB_eTi4gNT',
							link: ''
						},

					]
				}
			}

		},
		computed: {
			swiper_style() {
				return `width:${this.width}upx;height:${this.height}upx;`
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	swiper-item {
		height: 100%;
	}

	.swiper-item {
		height: 100%;
	}
</style>
