<template>
	<view class="login_page " :class="show_login_view_class?'page_show':'page_close'" v-show="show_login_view">
		<view class="back_icon">
			<image class="img" @click="close_login_view" src="/static/img/icon_img/back.png" mode=""></image>
		</view>
		<view class="login_title">欢迎回来！</view>
		<view class="login_form">
			<view class="input_line"><input type="number" maxlength="11" v-model="telephone" placeholder="手机号" placeholder-class="placeholder_text" /></view>
			<view class="input_line">
				<input type="text" placeholder="验证码" maxlength="6" v-model="code_msg" placeholder-class="placeholder_text" style="width: 50%;border: none;" />
				<view class="get_msg_btn" @click="get_code_msg">
					|
					<button class="text by-text-gray" :loading="get_msg_btn_loading">{{get_msg_btn_loading?"":get_msg_text}}</button>
				</view>
			</view>
			<view class="submit_btn" @click="loginByCode" :class="is_can_login?'by-bg-green':''">登 录</view>
		</view>
		<view class="other_login">
			<view class="other_login_bg"></view>
			<view class="other_login_text"><text class="text">第三方登陆</text></view>
		</view>
		<view class="other_login_icon">
			<button open-type="getUserInfo" @getuserinfo="onGetUserInfo" class="other_login_icon_item">
				<image class="img" src="/static/img/icon_img/wexin.png" mode=""></image>
			</button>
		</view>
		<view class="footer_msg">
			<text>登录代表您已同意</text>
			<text class="text by-text-green" @click="to_agreement">八音隐私协议</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				get_msg_text: '获取验证码',
				can_click: true,
				telephone: '15596861992',
				code_msg: '375214',
				get_msg_btn_loading: false,
				show_login_view:false,
				show_login_view_class:false
				
			};
		},
		watch:{
			show(new_value,old_value){
				if(new_value){
					console.log('open login view')
					this.show_login_view = new_value;
					setTimeout(()=>{
						this.show_login_view_class = new_value;
					},50)
					
				}else{
					console.log('close login view')
					this.show_login_view_class = new_value;
					setTimeout(()=>{
						this.show_login_view = new_value;
					},300)
				}
			}
		},
		computed: {
			is_can_login() {

				if (this.telephone.length == 11 && this.code_msg.length == 6) {
					return true
				} else {
					return false
				}

			}
		},

		methods: {
			// 关闭登陆页
			close_login_view(){
				console.log("close login view event .. ");
				this.$emit("onClose")
			},
			// 安全协议
			to_agreement() {
				uni.navigateTo({
					url: 'agreement/agreement'
				});
			},
			onGetUserInfo(e) {
				// console.log(e);

				this.$store.commit('set_wx_user_info', JSON.parse(e.detail.rawData));
				uni.showToast({
					title: '登陆成功',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);
			},
			// 获取短信验证码
			get_code_msg() {

				if (this.get_msg_btn_loading || !this.can_click) {
					return
				}

				this.get_msg_btn_loading = true;

				setTimeout(() => {
					this.get_msg_btn_loading = false;
					this.get_msg_start_count();
				}, 1000)

				return;
				let params = {
					telephone: this.telephone,
					smstype: 'login_by_code'
				};
				this.$store.dispatch('get_code_msg', params).then(res => {
					console.log(res);
					this.get_msg_start_count(res);
				});

			},
			// 获取验证码 开始 倒计时
			get_msg_start_count() {
				this.get_msg_btn_loading = false;
				uni.showToast({
					title: "验证码已发送",
					icon: 'none'
				})
				let time = 60;
				this.get_msg_text = time;
				this.can_click = false;
				let timer = setInterval(() => {
					if (time == 1) {
						this.get_msg_text = '重新获取';
						clearInterval(timer);
						this.can_click = true;
					} else {
						this.get_msg_text = --time;
					}

				}, 1000);
			},
			// 登陆
			loginByCode() {
				if (!this.is_can_login) {
					return false
				}
				let params = {
					telephone: this.telephone,
					code: this.code_msg
				};
				console.log(params)
				this.$store.dispatch("loginByCode", params).then(res => {
					if (!res) {
						return
					}
					this.$alert("登陆成功");
					console.log(res);
					uni.setStorageSync("user_info", res.data);
					this.$store.commit('set_user_info', res.data);
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				})
			}


		}
	}
</script>

<style lang="less" scoped>
	.login_page {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 30px;
		left: 0;
		background-color: #fff;
		z-index: 100000;
		opacity: 0;
		transition: 0.3s;
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
	}
	.login_page.page_show{
		top: 0px;
		opacity: 1;
	}
	.login_page.page_close{
		top: 30px;
		opacity: 0;
	}
 

	.login_title {
		font-size: 50upx;
		color: #6d737e;
		padding-left: 60upx;
		width: 690upx;
		padding-top: 50upx;
	}

	.login_form {
		width: 630upx;
		// height: 200upx;
		// background-color: #ccc;
		margin-left: 60upx;
		padding-top: 80upx;

		.input_line {
			width: 100%;
			height: 90upx;
			// background-color: #aaa;
			margin-bottom: 90upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #e8eaed;

			input {
				// background-color: #f1f1f1;
				height: 100%;
				width: 100%;
				color: #a9abab;
				border: none;
			}

			.get_msg_btn {
				height: 100%;
				display: flex;
				align-items: center;
				color: #aaa9ae;

				.text {
					min-width: 160upx;
					padding-left: 20upx;
					text-align: center;
					background: none;
					border: none;
					font-size: 24upx;

					:after {
						border: none;
						outline: none;
					}
				}

				uni-button:after {
					border: none;
				}
			}
		}

		.submit_btn {
			width: 100%;
			height: 100upx;
			background-color: #e5e5e5;
			line-height: 100upx;
			text-align: center;
			border-radius: 16upx;
			color: #fff;
			font-size: 32upx;
		}
	}

	.placeholder_text {
		color: #a9abab;
	}

	.other_login {
		position: relative;
		width: 750upx;
		margin-top: 50upx;

		.other_login_bg {
			width: 350upx;
			position: absolute;
			left: 200upx;
			// top: 20upx;
			height: 44upx;
			box-sizing: border-box;
			z-index: -1;
			border-bottom: 1px solid #e5e5e5;
		}

		.other_login_text {
			// background-color: #ccc;
			display: flex;
			justify-content: center;
			height: 80upx;
			align-items: center;

			.text {
				color: #aeb0b2;
				background-color: #fff;
				padding-left: 10upx;
				padding-right: 10upx;
			}
		}
	}

	.other_login_icon {
		button::after {
			border: none;
		}

		input {
			outline: none;
			border: none;
			list-style: none;
		}

		// background-color: #ccc;
		display: flex;
		padding-top: 30upx;
		justify-content: center;

		.other_login_icon_item {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			overflow: hidden;
			// background-color: #ccc;
			margin: 0;
			padding: 0;
			border: none;
			background-color: transparent;
			outline: none;
			list-style: none;

			::after {
				border: none;
			}

			.img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.footer_msg {
		position: absolute;
		bottom: 30upx;
		height: 50upx;
		width: 100%;
		display: flex;
		font-size: 22upx;
		align-items: center;
		color: #afafb1;
		justify-content: center;
		text{
			font-size: 22upx;
		}
		.text {
			font-size: 22upx;

		}
	}
</style>
