<template>
	<view>
		<cu-custom bgColor="by-bg-white" :isBack="true"><block slot="content">省市区选择</block></cu-custom>
		<view class="hr-10"></view>
		<!-- 省市区选择 -->
		
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<view class="content" @click="picker_show()">
					<text class="iconfont icon-coordinates by-text-green"></text>
					<text class="text-grey"> 省市区选择</text>
				</view>
			</view>
		</view>

		 
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onCancel="onCancel"
		 @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components:{
			mpvueCityPicker
		},
		data() {
			return {
				pickerValueDefault: [0, 0, 0],
			}
		},
		methods: {
			picker_show() {
				this.$refs.mpvueCityPicker.show();
			},
			onChange(e){
				console.log(e)
			},
			onConfirm(e){
				console.log(e);
				uni.showModal({
					content:e.label
				})
			}
		},
		
	}
</script>

<style>

</style>
