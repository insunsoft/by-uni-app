<template>
	<view>
		<view style="height: 1px;background: rgba(0,0,0,0.06);"></view>
		<view class="no_data" v-if="list.length==0">
			<image src="../../static/icon/no_data.png" mode=""></image>
			暂无数据
		</view>
		<view style="width: 100%;" v-for="(item,index) in list">
			<view class="log_item" @click="to_detail(item.id)">
				<text class="text-left">{{item.title}}</text>
				<text class="text-right">报名时间：{{item.pay_time|create_time_formate}}</text>
			</view>
			<view style="height: 1px;background: rgba(0,0,0,0.06);"></view>
		</view>
	</view>
</template>

<script>
	// 时间戳格式化
	let dateFormat = require('dateformat');
	import config from "../../config.js"
	export default {
		data() {
			return {
				list:[]
			}
		},
		filters:{
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
			to_detail(id){
				uni.navigateTo({
					url:'../detail/detail?log_id='+id
				})
			},
			async init_data(){
				let res = await this.$ajax.post({
					url:'/api/Baoming/buylist',
				})
				
				this.list = res.data;
			}
		},
		onLoad(opt) {
			this.id = opt.id||config.id
			this.init_data();
		}
	}
</script>

<style lang="less">
	.no_data{
		width: 200upx;
		height: 200upx;
		margin: 0 auto;
		margin-top: 340upx;
		text-align: center;
		font-size: 26upx;
		color: rgba(0,0,0,0.3);
		image{
			width: 100%;
			height: 100%;
			
		}
	}
.log_item {
	display: flex;
	justify-content: space-between;
	width: 690upx;
	margin-left: 30upx;
	height: 110upx;
	align-items: center;
	.text-left {
		font-size: 28upx;
		color: #262626;
	}
	.text-right {
		font-size: 28upx;
		color: rgba(0, 0, 0, 0.8);
	}
}
</style>
