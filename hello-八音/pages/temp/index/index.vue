<template>
	<view>
		<cu-custom bgColor="by-bg-white"><block slot="content">首页</block></cu-custom>
		<view class="hr-10"></view>
		<view class="cu-list menu">
			
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../base/base">
					<text class="iconfont icon-tools by-text-green"></text>
					<text class="text-grey"> 基础组件</text>
				</navigator>
			</view>
			
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../form/form" >
					<text class="iconfont icon-task by-text-green"></text>
					<text class="text-grey"> 表单组件</text>
				</navigator>
			</view>
			
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../city_picker/city_picker" >
					<text class="iconfont icon-coordinates by-text-green"></text>
					<text class="text-grey"> 省市区选择</text>
				</navigator>
			</view>
			
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../swiper/swiper" >
					<text class="iconfont icon-computer by-text-green"></text>
					<text class="text-grey"> 轮播组件</text>
				</navigator>
			</view>
			
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../list/list" >
					<text class="iconfont icon-refresh by-text-green"></text>
					<text class="text-grey"> 下拉刷新，上拉加载</text>
				</navigator>
			</view>
			
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../list/list" >
					<text class="iconfont icon-label by-text-green"></text>
					<text class="text-grey"> icon图标</text>
				</navigator>
			</view>
			
			<view class="cu-item arrow">
				<view class="content" @click="switch_login_page()">
					<text class="iconfont icon-businesscard by-text-green"></text>
					<text class="text-grey"> 登录模板</text>
				</view>
			</view>
			
			<view class="cu-item arrow">
				<view class="content" @click="switch_pay_succ_page()" >
					<text class="iconfont icon-coupons by-text-green"></text>
					<text class="text-grey"> 支付成功模板</text>
				</view>
			</view>
			
		</view>
		
		<by-login @onClose="switch_login_page" :show="show_login_page"></by-login>
		 
		<by-pay-succ @onClose="switch_pay_succ_page" :show="show_pay_succ_page"></by-pay-succ>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show_login_page:false,
				show_pay_succ_page:false,
				
			}
		},
		methods: {
			switch_login_page(){
				this.show_login_page = !this.show_login_page;
			},
			switch_pay_succ_page(){
				this.show_pay_succ_page = !this.show_pay_succ_page;
			}
		}
	}
</script>

<style>

</style>
