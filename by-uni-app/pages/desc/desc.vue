<template>
	<view>
		<view class="static_banner" @click="to_succ_page()"><image src="../../static/banner/pic_detail_banner.png" mode="widthFix" style="width: 100%;height: 100%;"></image></view>
		<view class="desc_info">
			<view>根据文化部及国家发展和改革委员会“文教科发【2003】52号”文件收费标准如下：</view>
			
			<view>一级200元，二级240元，三级280元，四级320元，五级360元，六级390元，七级420元，八级450元，九级480元，十级510元。</view>
			<view>钢琴、古筝、二胡表演文凭级：800元（含荣誉牌），考级录像送京评审通过后发证。</view>
			<view>西安市二环外每人加收30元异地考务费。</view>
			<view>考试结束后，考委会60日内将对考核合格证颁发由文化部全国社会艺术考级中心监制的中国音乐学院社会艺术水平考级证书。</view>	
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

<style lang="less">
.static_banner {
	width: 100%;
	height: 282upx;
	// background-color: #ccc;
}
.desc_info{
	width: 690upx;
	margin-left: 30upx;
	font-size: 28upx;
	color: rgba(0,0,0,0.80);
	view{
		margin-top: 20upx;
		text-indent:30px;
	}
}
</style>
