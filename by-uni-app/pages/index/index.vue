<template>
	<view>
		<view class="static_banner" @click="to_succ_page()"><image src="../../static/banner/pic_home_banner.png" mode="widthFix" style="width: 100%;height: 100%;"></image></view>
		<form>
			<view class="form-title">
				<text>基本信息</text>
				<text class="form-title-text" @click="to_sign_log_page()">报名记录</text>
			</view>

			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请你的姓名" @blur="blur_name_input" v-model="fm.title" />
			</view>
			<view class="form-hr"></view>
			<view style="height: 30upx;"></view>
			<view class="cu-form-group">
				<view class="title">姓名全拼</view>
				<input placeholder="例如：ZHANYUN" v-model="fm.pinyin" />
			</view>
			<view class="form-hr"></view>
			<view class="form-item-desc">注：自动全拼有一定误差率，如有发现不符，请手动修改</view>
			<view style="height: 30upx;"></view>
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group form-group-radio">
					<view class="title">性别</view>
					<view style="display: flex;">
						<view style="margin-right: 20upx; display: flex;align-items: center;" v-for="(item, index) in sexs">
							<radio class=" green_radio radio" :class="radio == item.id ? 'checked' : ''" :checked="radio == item.id ? true : false" :value="item.id"></radio>
							<text>{{ item.title }}</text>
						</view>
					</view>
				</view>
			</radio-group>
			<view class="form-hr"></view>
			<view style="height: 30upx;"></view>
			<view class="cu-form-group">
				<view class="title">民族</view>
				<picker @change="nation_picker" :range="nations" range-key="title">
					<view class="picker" :style="nation ? 'color:#555' : ''">{{ nation.title || '请选择民族' }}</view>
				</picker>
			</view>
			<view class="form-hr"></view>
			<view style="height: 30upx;"></view>
			<view class="cu-form-group">
				<view class="title">出生日期</view>
				<picker @change="date_picker" mode="date">
					<view class="picker" :style="birth_date ? 'color:#555' : ''">{{ birth_date || '请选择出生日期' }}</view>
				</picker>
			</view>
			<view class="form-hr"></view>
			<view style="height: 30upx;"></view>
			<view class="cu-form-group">
				<view class="title">身份证号码</view>
				<input type="text" maxlength="18" placeholder="请输入身份证号码" v-model="fm.shenfenzheng" />
			</view>
			<view class="form-hr"></view>
			<view style="height: 30upx;"></view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input type="number" maxlength="11" placeholder="请输入联系电话" v-model="fm.telephone" />
			</view>
			<view class="form-hr"></view>
			<view style="height: 30upx;"></view>
			<view class="cu-form-group"><view class="title" style="width: 100%;">最近一次获得的考级证书</view></view>

			<textarea class="kaoji" placeholder-style="color: rgba(0,0,0,0.2);" v-model="fm.zhengshu" placeholder="例如：2019年1月获得中国音乐学院考级委员会5级证书(选填)" />
			<view style="height: 30upx;"></view>
			<view class="cu-form-group"><view class="title" style="width: 100%;">考级曲目</view></view>

			<textarea class="qumu" placeholder-style="color: rgba(0,0,0,0.2);" v-model="fm.kaoshiqumu" placeholder="请输入你的考级曲目…" />
			<view class="form-title">
				<text>考级信息</text>
				<text class="form-title-text" @click="to_desc_page()">考级收费说明</text>
			</view>
			<view class="cu-form-group" v-if="index <= 1" v-for="(item, index) in project_list">
				<view class="title">专业{{ index + 1 }}</view>
				<view class="form-item-right">
					<picker class="lv-picker" mode="multiSelector" @change="project_picker($event, index)" :range="projects" range-key="title">
						<view class="picker">{{ item.zhuanye_title }} <text v-if="item.zhuanye_lv">-</text> {{ item.zhuanye_lv }}</view>
					</picker>
					<view class="form-item-right-icon">
						<image @click="add_project" v-if="project_list.length == index + 1 && (index + 1) != 2" src="../../static/icon/btn_global_add.png" mode=""></image>
						<image @click="cut_project(index)" v-if=" (index + 1) == 2" src="../../static/icon/btn_global_delete.png" mode=""></image>
					</view>
				</view>
			</view>
		</form>
		<view style="height: 200upx;"></view>
		<footerBuy @btnClick="submit_data()" :price="final_price"></footerBuy>
	</view>
</template>

<script>
import footerBuy from '../../components/footer/footer-buy.vue';
import wx_jssdk from '../../tools/wx_jssdk.js';
import config from '../../config.js';
import reg from '../../tools/reg.js';
export default {
	components: { footerBuy },
	data() {
		return {
			id: '',
			projects: [],
			sexs: [],
			radio: 1,
			// 表单数据
			fm: {
				code: '',
				baoming_config_id: '', //报名配置页id
				title: '', //姓名
				pinyin: '', //姓名拼音
				sex_id: 1, //性别
				minzu_id: '', //民族
				zhengshu: '', //最近一次考试证书
				kaoshiqumu: '', //考试曲目
				total_price: 0, //总价
				telephone: '', //电话
				birthday: '', //出生年月日 时间戳
				shenfenzheng: '', //身份证
				baoming_content: '' //专业课 json格式
				// [{“baoming_zhuanye_id”:4,”baoming_jibie_id”:3},{“baoming_zhuanye_id”:4,”baoming_jibie_id”:3}]
			},
			// 民族 列表
			nations: [],
			// 已选民族
			nation: '',
			birth_date: '',
			project_list: [
				{
					baoming_zhuanye_id: '',
					baoming_jibie_id: '',
					zhuanye_title: '请选择',
					zhuanye_lv: ''
				}
			]
		};
	},
	computed: {
		final_price() {
			//  如果 专业 最后一个未选择,则删除最后一个
			let sel_project = JSON.parse(JSON.stringify(this.project_list));
			let last = sel_project[sel_project.length - 1];
			if (!last.baoming_zhuanye_id) {
				sel_project.splice(sel_project.length - 1, 1);
			}
			console.log(sel_project);
			let price = 0;
			if (sel_project.length > 0) {
				sel_project.forEach(item => {
					price += parseFloat(item.price) * 100;
				});
				return (price / 100).toFixed(2).toString();
			} else {
				return '0.00';
			}
		}
	},

	methods: {
		// 跳转报名记录
		to_sign_log_page() {
			uni.navigateTo({
				url: '../sign_log/sign_log?id=' + this.id
			});
		},
		// 跳转支付成功页面
		to_succ_page() {
			uni.navigateTo({
				url: '../pay_succ/pay_succ'
			});
		},
		// 跳转收费明细
		to_desc_page() {
			uni.navigateTo({
				url: '../desc/desc?id=' + this.id
			});
		},
		// 姓名输入完,自动填充大写拼音
		async blur_name_input(e) {
			console.log(e);
			let keywords = e.detail.value;
			if (!reg.checkCharacter(keywords)) {
				this.$alert('姓名必须为汉字');
				return;
			}
			let res = await this.$ajax.post({
				url: '/api/Baoming/titletopinyin',
				data: { title: keywords }
			});

			this.fm.pinyin = res.data.pinyin;
		},
		// 单选性别
		RadioChange(e) {
			this.radio = e.detail.value;
			this.fm.sex_id = this.radio;
		},
		// 专业课选择
		project_picker(e, index) {
			console.log(`选择第${index + 1}行`);
			let sel_res = e.detail.value;
			if (sel_res.length == 1) {
				sel_res.push(0);
			}
			console.log(sel_res);
			let pro_index = sel_res[0];
			let lv_index = sel_res[1];

			let pro = this.projects[0][pro_index];
			let lv = this.projects[1][lv_index];

			console.log('专业选择了 --> ' + pro_index + pro.title);
			console.log('等级选择了 --> ' + pro_index + lv.title);
			// console.log(JSON.parse(JSON.stringify(pro)));
			// console.log(JSON.parse(JSON.stringify(lv)));
			// 如果选择的是最后一个,则末尾出栈,末尾进栈
			if (this.project_list.length == index + 1) {
				this.project_list.pop();
				this.project_list.push({
					baoming_zhuanye_id: pro.id,
					baoming_jibie_id: lv.id,
					zhuanye_title: pro.title,
					zhuanye_lv: lv.title,
					price: lv.price
				});
			} else {
				this.project_list.splice(index, 1, {
					baoming_zhuanye_id: pro.id,
					baoming_jibie_id: lv.id,
					zhuanye_title: pro.title,
					zhuanye_lv: lv.title,
					price: lv.price
				});
			}

			// console.log(this.project_list);
		},
		// 民族选择
		nation_picker(e) {
			let item = this.nations[e.detail.value];
			this.fm.minzu_id = parseInt(item.id);
			this.nation = item;
		},
		// 出生年月 选择
		date_picker(e) {
			this.birth_date = e.detail.value;
			let stamp = new Date(this.birth_date).getTime() / 1000;
			this.fm.birthday = stamp;
		},
		// 添加一个专业选择器
		add_project() {
			if (!this.project_list[this.project_list.length - 1].zhuanye_lv) {
				console.log('未选择');
				return;
			}
			this.project_list.push({
				baoming_zhuanye_id: '',
				baoming_jibie_id: '',
				zhuanye_title: '请选择',
				zhuanye_lv: ''
			});
		},
		// 删除当前专业选择器
		cut_project(index) {
			this.project_list.splice(index, 1);
		},
		// 初始化页面数据
		async init_data() {
			// 获取code
			// this.fm.code = "011xHlNr0IhPMg1f00Or0bM7Nr0xHlNj";
			this.fm.code = wx_jssdk.get_code('snsapi_base');
			uni.setStorageSync('wx_code', this.fm.code);
			let res = await this.$ajax.get({
				url: '/api/Baoming/set',
				data: {
					id: this.id
				}
			});
			uni.removeStorageSync('wx_code');

			if (res.data.token) {
				uni.setStorageSync('auth_info', res.data);
				this.init_data();
				return;
			}
			// 初始化 考级课程 和等级
			console.log(res);
			this.projects.push(res.data.baoming_zhuanyes);
			this.projects.push(res.data.baoming_jibies);
			// 初始化 性别
			this.sexs = res.data.sexs;
			// 初始化 民族
			this.nations = res.data.minzus;

			//  初始化 页面分享
			setTimeout(async () => {
				await wx_jssdk.sdk_init();
				await wx_jssdk.share_init({
					title: res.data.share_title, // 分享标题
					desc: res.data.share_des, // 分享描述
					link: config.h5_base_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: config.img_pre + res.data.share_img_arr.image // 分享图标
				},()=>{
					console.log('分享 回调')
				})
			},300);
		},
		// 提交数据
		submit_data() {
			//  如果 专业 最后一个未选择,则删除最后一个
			let sel_project = JSON.parse(JSON.stringify(this.project_list));
			let last = sel_project[sel_project.length - 1];
			if (!last.baoming_zhuanye_id) {
				sel_project.splice(sel_project.length - 1, 1);
			}
			if (sel_project.length > 0) {
				this.fm.baoming_content = JSON.stringify(sel_project);
			} else {
				this.fm.baoming_content = '';
			}

			console.log(JSON.parse(JSON.stringify(this.fm)));
			if (!this.fm.title) {
				this.$alert('请输入姓名');
				return;
			}
			if (!reg.checkCharacter(this.fm.title)) {
				this.$alert('姓名必须为汉字');
				return;
			}
			if (!this.fm.minzu_id) {
				this.$alert('请选择民族');
				return;
			}
			if (!this.fm.birthday) {
				this.$alert('请选择出生年月日');
				return;
			}
			if (!this.fm.shenfenzheng) {
				this.$alert('请输入身份证');
				return;
			}
			if (!reg.checkIdCard(this.fm.shenfenzheng)) {
				this.$alert('请输入正确的身份证号');
				return;
			}
			if (!this.fm.telephone) {
				this.$alert('请输入联系电话');
				return;
			}
			if (!reg.checkPhone(this.fm.telephone)) {
				this.$alert('请输入正确的手机号码');
				return;
			}
			// if (!this.fm.zhengshu) {
			// 	this.$alert('请输入获得证书');
			// 	return;
			// }
			if (!this.fm.kaoshiqumu) {
				this.$alert('请输入考级曲目');
				return;
			}
			if (!this.fm.baoming_content) {
				this.$alert('请选择考级专业');
				return;
			}
			this.fm.total_price = this.final_price;
			// this.fm.total_price ='0.01';
			// 提交 信息 获取支付凭证A
			this.$ajax
				.post({
					url: '/api/Baoming/pay',
					data: {
						...this.fm
					}
				})
				.then(res => {
					let ticket = JSON.parse(res.data.jsApiParameters);
					console.log(res);
					wx_jssdk.wx_public_h5_pay(ticket).then(rs => {
						
						uni.navigateTo({
							url: '../pay_succ/pay_succ?log_id='+res.data.order_id
						});
					});
				});
		}
	},
	onLoad(opt) {
		console.log(opt);
		this.id = opt.id || config.id;
		this.fm.baoming_config_id = this.id;
		this.init_data();
	}
};
</script>

<style lang="less">
.static_banner {
	width: 100%;
	height: 282upx;
	// background-color: #ccc;
}
.form-title {
	width: 690upx;
	margin-left: 30upx;
	padding-top: 20upx;
	padding-bottom: 20upx;
	font-size: 32upx;
	font-weight: bold;
	color: rgba(0, 0, 0, 0.8);
}
.cu-form-group {
	padding: 0;
	width: 690upx;
	margin-left: 30upx;
	border: none;
	.title {
		font-size: 26upx;
		width: 160upx;
	}
	uni-input {
		font-size: 26upx;
	}
}
textarea {
	width: 690upx;
	margin-left: 30upx;
	border-radius: 10upx;
	background-color: #f0f0f0;
	padding: 15upx 20upx;
	font-size: 26upx;
}
textarea.kaoji {
	height: 110upx;
}
textarea.qumu {
	height: 330upx;
}
.form-item-desc {
	width: 690upx;
	margin-left: 30upx;
	font-size: 20upx;
	color: rgba(0, 0, 0, 0.2);
	padding-top: 10upx;
}
.form-hr {
	width: 690upx;
	margin-left: 30upx;
	height: 1px;
	background: rgba(0, 0, 0, 0.06);
}
.form-group-radio {
	display: flex;
	flex-direction: row;
	justify-content: left;
	radio {
		margin-right: 10upx;
		transform: scale(0.7);
	}
}

.cu-form-group uni-picker .picker {
	text-align: left;
	color: rgba(0, 0, 0, 0.2);
}
.cu-form-group uni-picker::after {
	color: rgba(0, 0, 0, 0.2);
}
.form-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.form-title-text {
		font-size: 24upx;
		color: #009f8a;
		align-items: center;
		text {
			display: flex;
			align-items: center;
		}
	}
}

.form-item-right {
	width: 100%;
	// background-color: #ccc;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.form-item-right-icon {
		display: flex;
		image {
			width: 60upx;
			height: 60upx;
		}
	}
}
.lv-picker {
	margin-right: 20upx;
}
.cu-form-group .lv-picker::after {
	color: #dadada;
}
.cu-form-group uni-picker.lv-picker .picker {
	color: rgba(0, 0, 0, 0.8);
}
</style>
