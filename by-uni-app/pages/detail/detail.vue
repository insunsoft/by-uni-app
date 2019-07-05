<template>
	<view>
		<!-- <view class="static_banner"><image src="../../static/banner/pic_home_banner.png" mode="widthFix" style="width: 100%;height: 100%;"></image></view> -->
		<form>
			<view class="form-title">
				<text>基本信息</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">姓名</view>
				<text style="width: 100%;">{{detail.title}}</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">姓名全拼</view>
				<text style="width: 100%;">{{detail.pinyin}}</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">性别</view>
				<text style="width: 100%;">{{detail.sex_id}}</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">民族</view>
				<text style="width: 100%;">{{detail.minzu_id}}</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">出生日期</view>
				<text style="width: 100%;">{{detail.birthday|time_formate}}</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">身份证号码</view>
				<text style="width: 100%;">{{detail.shenfenzheng}}</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">联系电话</view>
				<text style="width: 100%;">{{detail.telephone}}</text>
			</view>
			
			<view class="cu-form-group"><view class="title" style="width: 100%;">最近一次获得的考级证书</view></view>
			<view class="textarea">{{detail.zhengshu}}</view>
			<view class="cu-form-group"><view class="title" style="width: 100%;">考级曲目</view></view>
			<view class="textarea">
				{{detail.kaoshiqumu}}
			</view>
			<view class="form-title">
				<text>考级信息</text>
			</view>
			<view class="cu-form-group" v-for="(item,index) in detail.baoming_content" :key="index">
				<view class="title">专业1</view>
				<text style="width: 100%;">{{item.zhuanye_title}} + {{item.zhuanye_lv}}</text>
			</view>
			<view class="cu-form-group" >
				<view class="title">报名时间</view>
				<text style="width: 100%;">{{detail.pay_time|create_time_formate}}</text>
			</view>
		</form>
		<view style="height: 200upx;"></view>
	</view>
</template>

<script>
// 时间戳格式化
let dateFormat = require('dateformat');
	export default {
		data() {
			return {
				log_id:"",
				detail:{
					baoming_content:[]
				}
			}
		},
		filters:{
			time_formate(time){
				if(time){
					let T = new Date(parseInt(time)*1000);
					let res = dateFormat(T,"yyyy-mm-dd");
					return res;
				}else{
					return ""
				}
				
			},
			create_time_formate(time){
				if(time){
					let T = new Date(parseInt(time)*1000);
					let res = dateFormat(T,"yyyy-mm-dd HH:MM:ss");
					return res;
				}else{
					return ""
				}
				
			}
		},
		methods: {
			async init_data(){
				let res = await this.$ajax.post({
					url:'/api/Baoming/buysingle',
					data:{
						baoming_order_id:this.log_id
					}
				})
				
				console.log(res);
				try{
					res.data.baoming_content = JSON.parse(res.data.baoming_content)
				}catch(e){
					//TODO handle the exception
				}
				
				this.detail = res.data;
				
			}
		},
		onLoad(opt) {
			this.log_id = opt.log_id||"";
			this.init_data();
		}
	}
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
	color: rgba(0, 0, 0, 0.8);
	font-weight: bold;
}
.cu-form-group {
	padding: 0;
	width: 690upx;
	margin-left: 30upx;
	border: none;
	.title {
		font-size: 26upx;
		width: 200upx;
	}
	uni-input {
		font-size: 26upx;
	}
}
.textarea {
	width: 690upx;
	margin-left: 30upx;
	border-radius: 10upx;
	background-color: #f0f0f0;
	padding: 15upx 20upx;
	font-size: 26upx;
	min-height:160upx;
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
	color: rgba(0, 0, 0, 0.4);
}
.cu-form-group uni-picker::after {
	color: rgba(0, 0, 0, 0.4);
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
