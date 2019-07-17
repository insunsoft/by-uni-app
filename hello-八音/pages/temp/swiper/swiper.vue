<template>
	<view>
		<cu-custom bgColor="by-bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">轮播</block>
		</cu-custom>
		<view class="banner">
			<bySwiper></bySwiper>
		</view>
	</view>
</template>

<script>
	import bySwiper from "../../../common/components/by_banner/by_banner.vue";
	export default {
		components:{
			bySwiper
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
