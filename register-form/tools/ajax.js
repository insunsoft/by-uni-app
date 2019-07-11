/*
	2019-02-20
	lane
	封装uni-app请求
	
	
*/

import config from "../config.js";

function request(params, method) {
	
	let token  = uni.getStorageSync("ins_token") || '';
	
	return new Promise(function(resolve, reject) {
		let head = {};
		let code = uni.getStorageSync("wx_code");
		let auth_info = uni.getStorageSync("auth_info")||{};
		
		if(code){
			head.code = code;
		}
		
		uni.request({
			url: config.base_url + params.url,
			// url:"http://localhost/index.php",
			data: params.data,
			method: method,
			header:{
				"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
				// "access-token":token,
				// "agent":'back_h5'
				...head,
				...auth_info
			},
			success(res) {
				// 成功回调
				 
				if (res.statusCode==200) {
					
					if(res.data.code==200){
						uni.removeStorageSync("code")
						resolve(res.data)
						
						
					}else if(res.data.code==30101){
						 
						uni.showToast({
							title:res.data.message||res.data.msg,
							icon:"none"
						})
						uni.redirectTo({
							url:'/pages/institution/login/login'
						})
					}else{
						
						// uni.showToast({
						// 	title:res.data.message||res.data.msg,
						// 	icon:"none"
						// })
					}
					
					
				}else{
					uni.showToast({
						title:'服务器错误:'+res.statusCode,
						icon:'none'
					})
				}

			},
			fail() {
				uni.hideLoading()
				uni.showToast({
					title: '服务器错误',
					icon: "none"
				})
				
				// 失败回调
			},
			complete() {
				// 无论成功或失败 只要请求完成的 回调
				 
			}
		})
	})
};
export default {

	async get(params) {
		return request(params, "GET");
	 
		
	},
	async post(params) {
		return await request(params, "POST")
	},
	
	upload(blob,params={}){
		return new Promise(function(resolve,reject){
			uni.showLoading();
			let token  = uni.getStorageSync("ins_token") || '';
			uni.uploadFile({
				url:  config.base_url+'/back/lessonunion/imagesupload', //仅为示例，非真实的接口地址
				filePath:blob,
				name: 'input-logo',
				formData: {
					...params,
					is_api:1
				},
				header:{
					"access-token":token,
					"agent":'back_h5'
				},
				success: (uploadFileRes) => {
					 
				 
					uni.hideLoading();
					let res = JSON.parse(uploadFileRes.data);
					if(res.code==200){
						uni.showToast({
							title:'图片上传成功',
							icon:'none'
						})
						resolve(res);
					}else{
						uni.showToast({
							title:res.message||res.msg,
							icon:'none'
						})
					}
					
					
				}
			});
		})
		
	}

}
