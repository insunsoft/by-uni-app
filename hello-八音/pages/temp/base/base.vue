<template>
	<view>
		<cu-custom :isBack="true" bgColor="by-bg-white">
			<block slot="content">基础组件</block>
		</cu-custom>
		<view class="hr-10"></view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>文字
			</view>
		</view>
		<view class="padding flex flex-wrap">
			<text class="by-text-red margin-right-sm">类名 by-text-red</text>
			<text class="by-text-gray margin-right-sm">类名 by-text-gray</text>
			<text class="by-text-green margin-right-sm">类名 by-text-green</text>
			<text class="by-text-black margin-right-sm">类名 by-text-black</text>
			<text class="by-text-yellow margin-right-sm">类名 by-text-yellow</text>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按钮
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn by-bg-gray lg by-text-white">灰 cu-btn by-bg-gray</button>
			<button class="cu-btn by-bg-red margin-tb-sm lg by-text-white">红 cu-btn by-bg-red</button>
		</view>
		<view class="padding ">
			<button class="cu-btn by-bg-green by-text-white">八音绿 cu-btn by-bg-green</button>
			<view>
				<button class="cu-btn by-bg-red by-text-white" loading="true"></button>
			</view>
			
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>数字字体
			</view>
			
		</view>
		<view class="padding flex flex-direction">
			<text class="by-text-gray">跟随系统</text>
			<text class="margin-right-sm" style="font-size: 40upx;">9.876543210</text>
			<text class="by-text-gray">自定义</text>
			<text class="margin-right-sm font-family-DIN-Bold" style="font-size: 40upx;">9.876543210</text>
		</view>

	</view>
</template>

<script>
	export default {
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
