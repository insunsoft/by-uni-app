<template>
	<view class="pay-succ-page" :class="show_pay_succ_view_class?'page_show':'page_close'" v-show="show_pay_succ_view">
		<view class="back_icon">
			<image class="img" @click="close_view" src="/static/img/icon_img/back.png" mode=""></image>
		</view>
		<view class="show_img">
			<image src="../../../static/img/icon_img/pay_succ.png" mode=""></image>
		</view>
		<view class="pay-succ-title by-text-green">支付成功</view>
		<view class="pay_succ_desc by-text-gray">{{descText}}
		</view>
		<view class="pay_succ_enter" @click="to_detail()">{{linkText}}<text class="cuIcon-right"></text></view>

		<view class="pay_succ_down_load_btn" @click="to_down_laod()">
			<text>
				立即下载
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			descText: {
				type: String,
				default: '支付成功后提示文本，可通过组件 descText 属性设置，string类型'
			},
			linkText: {
				type: String,
				default: 'linkText属性设置文本，onClickLink事件触发点击'
			},
			show:{
				type:Boolean,
				default:false
			}

		},
		watch:{
			show(new_value,old_value){
				if(new_value){
					 
					this.show_pay_succ_view = new_value;
					setTimeout(()=>{
						this.show_pay_succ_view_class = new_value;
					},50)
					
				}else{
					console.log('close login view')
					this.show_pay_succ_view_class = new_value;
					setTimeout(()=>{
						this.show_pay_succ_view = new_value;
					},300)
				}
			}
		},
		data() {
			return {
				id: '',
				show_pay_succ_view:false,
				show_pay_succ_view_class:false
			}
		},
		methods: {
			// 关闭支付成功页
			close_view(){
				this.$emit("onClose")
			},
			to_detail() {
				this.$emit("onClickLink")
			},
			to_down_laod() {
				window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.zyby.bayin';
			}
		},
		onLoad(opt) {

		}
	}
</script>

<style lang="less" scoped>
	.pay-succ-page {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 30px;
		left: 0;
		background-color: #fff;
		z-index: 1000000;
		opacity: 0;
		transition: 0.3s;
	}

	.pay-succ-page.page_show {
		top: 0px;
		opacity: 1;
	}

	.pay-succ-page.page_close {
		top: 30px;
		opacity: 0;
	}

	.back_icon {
		width: 60upx;
		height: 60upx;
		margin-left: 66upx;
		margin-top: 40upx;

		.img {
			width: 100%;
			height: 100%;
		}
	}

	.pay-succ-title {
		font-size: 34upx;
		text-align: center;
		line-height: 90upx;
	}

	.show_img {
		width: 87upx;
		height: 87upx;
		margin: 0 auto;
		margin-top: 65upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.pay_succ_desc {
		width: 690upx;
		margin-top: 100upx;
		margin-left: 30upx;
		font-size: 28upx;

	}

	.pay_succ_enter {
		width: 690upx;
		margin-top: 150upx;
		margin-left: 30upx;
		text-align: right;
		font-size: 28upx;
		color: rgba(0, 0, 0, 0.40);
	}

	.pay_succ_down_load_btn {
		width: 390upx;
		height: 100upx;
		margin-left: 180upx;
		line-height: 100upx;
		background: rgba(0, 159, 138, 0.20);
		border-radius: 8px;
		margin-top: 200upx;
		text-align: center;

		>text {
			font-size: 28upx;
			color: #009F8A;
		}
	}
</style>
