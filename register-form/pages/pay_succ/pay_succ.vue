<template>
	<view>
		<view class="show_img">
			<image src="../../static/icon/succ.png" mode=""></image>
		</view>
		<view class="pay_succ_desc">报名信息提交成功，稍后会有乐奇奇艺术机构老师与您联系，请留意微信消息并保持电话畅通！</view>
		<view class="pay_succ_enter" @click="to_detail()">查看本次报名信息<text class="cuIcon-right"></text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:''
			}
		},
		methods: {
			to_detail(){
				uni.redirectTo({
					url:'../detail/detail?log_id='+this.id
				})
			}
		},
		onLoad(opt) {
			this.id = opt.log_id
		}
	}
</script>

<style lang="less">
.show_img{
	width: 200upx;
	height: 200upx;
	margin: 0 auto;
	margin-top: 78upx;
	image{
		width: 100%;
		height: 100%;
	}
}
.pay_succ_desc{
	width: 690upx;
	margin-top: 100upx;
	margin-left: 30upx;
	font-size: 28upx;
	color: rgba(0,0,0,0.80);
}
.pay_succ_enter{
	width: 690upx;
	margin-top: 150upx;
	margin-left: 30upx;
	text-align: right;
	font-size: 28upx;
	color: rgba(0,0,0,0.40);
}
</style>
