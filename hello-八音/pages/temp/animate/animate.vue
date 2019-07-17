<template>
	<view>
		<div id="lottie"></div>
		<div id="lottie2"></div>
	</view>
</template>

<script>
	import animationData from "@/common/animate_json/data.json"
	import animationData2 from "@/common/animate_json/data2.json"
	// lottie 为运行AE导出的json动画的类库
	// import lottie from "@/node_modules/lottie-web/build/player/lottie.min.js";
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		onLoad() {
			// setTimeout(()=>{
			// 	var params = {
			// 		container: document.getElementById('lottie'),
			// 		renderer: 'svg',
			// 		loop: true,
			// 		autoplay: true,
			// 		animationData: animationData
			// 	};
			// 	var anim;
			// 	anim = lottie.loadAnimation(params);
			// 	
			// },1000)
			
		}
	}
</script>

<style>
	#lottie {

		width: 100%;
		height: 100%;
		display: block;
		overflow: hidden;
		transform: translate3d(0, 0, 0);
		text-align: center;
		opacity: 1;
	}
</style>
