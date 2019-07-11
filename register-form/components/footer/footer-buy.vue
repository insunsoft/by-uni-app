<template>
	<view class="footer-buy-menu">
		<view class="left">
			<view class="title">共计：￥{{price}}</view>
			<view class="desc">注：该价格已包含异地考务费</view>
		</view>
		<view class="right" @click="_submit()">支付</view>
	</view>
</template>

<script>
	export default{
		props:{
			price:{
				type:String,
				default:'0.00'
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			_submit(){
				this.$emit("btnClick")
			}
		}
	}
</script>

<style lang="less" scoped>
	.footer-buy-menu{
		width: 100%;
		height: 110upx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		z-index: 100;
		// padding-bottom: 20upx;
		.left{
			width: 100%;
			background-color: #fff;
			height: 100%;
			border-top: 1px solid #F0F0F0;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30upx;
			.title{
				font-size: 36upx;
				font-weight: bold;
			}
			.desc{
				font-size: 24upx;
				color: #E16F54;
			}
		}
		.right{
			width: 300upx;
			height: 100%;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36upx;
			background-image: linear-gradient(180deg, #E3684B 0%, #E17055 100%);
		}
	}
</style>
