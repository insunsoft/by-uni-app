<template>
<view>
	
	<view class="cu-bar bg-white margin-top">
		<view class="action">
			{{title}}
		</view>
		<view class="action">
			{{imgList.length}}/{{imgNum}}
		</view>
	</view>
	<view class="cu-form-group">
		<view class="grid col-4 grid-square flex-sub">
			<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
			 <image :src="imgList[index]" mode="aspectFill"></image>
				<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
					<text class='cuIcon-close'></text>
				</view>
			</view>
			<view class="solids" @tap="ChooseImage" v-if="imgList.length<imgNum">
				<text class='cuIcon-cameraadd'></text>
			</view>
		</view>
	</view>
</view>

</template>

<script>

import config from "../../config.js";
export default{
	props:{
		title:{
			type:String,
			default:'上传图片'
		},
		imgNum:{
			type:Number,
			default:1
		},
		imgUrl:{
			type:String,
			default:'',
			
		}
	},
 
	data(){
		return {
			imgList:[],
			pre_img:''
		}
	}, 
	methods:{
		ChooseImage() {
			uni.chooseImage({
				count: this.imgNum, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
					console.log(res)
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths)
					} else {
						this.imgList = res.tempFilePaths
					}
				}
			});
		},
		ViewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			uni.showModal({
				title: '温馨提示',
				content: '确定要删除吗？',
				cancelText: '再看看',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						this.imgList.splice(e.currentTarget.dataset.index, 1)
					}
				}
			})
		},
		commitRes(){
			this.$emit("imgChange",this.imgList);
		}
	},
	watch:{
		imgList(){
			this.commitRes();
		},
	 
	},
	
	mounted() {
		uni.showLoading()
		setTimeout(()=>{
			console.log("uplaod img component")
			console.log(this.imgUrl)
			if(this.imgUrl){
				this.imgList.push(config.img_pre+this.imgUrl);
				
			}
			uni.hideLoading()
		},1000)
		
	}
}
</script>

<style>
</style>
