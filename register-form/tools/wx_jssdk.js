/*
lane@2019-05-08
微信JS-SDK
1、在index.html 中引入 插件文件
    <!-- 引入微信SDK -->
    <script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
2、在需要用的页面  import 导入此模块
3、方法说明
    1、is_wx_browser  同步方法  判断是否是微信浏览器，返回布尔值
    2、get_code
        参数 scope
        'snsapi_base' 不弹出授权页面，直接跳转，只能获取用户openid
        'snsapi_userinfo' 弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息
        从URL中获取code 如无code则调用 redirect_get_code
    3、redirect_get_code
        重定向获取code
        接收参数 scope
            'snsapi_base' 不弹出授权页面，直接跳转，只能获取用户openid
            'snsapi_userinfo' 弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息
    4、get_sign
        获取jssdk签名 异步方法 返回 promise

    5、share_init
        初始化分享
        参数为分享信息
        share_info = {
            title: '', // 分享标题
            desc:'', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
          }
    6、sdk_init

*/


import qs from "qs";
// import axios from "axios";
import config from "../config.js";
// let server_url = 'http://localhost.gek6.com'


// 获取签名接口地址
let get_sign_server_url ='/api/baoming/getjdkauth'
// let get_sign_server_url = 'http://bayin3.gek6.cn/api/wechat/getjdkauth'
// APPID
let appid = 'wx2a392df6eb31dcad';

import ajax from "./ajax.js"




// 获取浏览器类型
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}



class wx_jssdk {

	constructor() {
		console.log("constructor");
		this.wx_ready = null;

	}
	async init_jssdk() {
		// console.log("-------------------------")
		// console.log("init_jssdk")
		// let res = await this.get_sign();
		// let sign = res.data;
		// console.log('获取签名成功')
		// console.log(sign);
		// console.log("-------------------------")

	}
	// 判断是否是微信浏览器
	is_wx_browser() {
		if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
			var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				//在微信中打开
				return true;
			}
		} else {
			//否则就是PC浏览器打开
			return false;
		}
	}
	// 重定向获取code
	redirect_get_code(scope) {


		let redirect_uri = encodeURIComponent(window.location.href);

		// 返回类型，请填写code
		let response_type = 'code';
		// 应用授权作用域，
		// snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），
		// snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）

		// 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
		let state = '';
		let url =
			`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;
		window.location.href = url;
	}
	// 从URL中获取code
	get_code(scope) {

		let wx_params = "";

		let now_url = window.location.href;
		now_url = now_url.split('?');
		now_url.shift();
		now_url = now_url.join("&");
		if (!now_url) {
			console.log("无参数");
			this.redirect_get_code(scope)
			return ""
		}
		wx_params = qs.parse(now_url);
		if (wx_params.code) {
			return wx_params.code;
		} else {
			this.redirect_get_code(scope);
			return ""
		}


	}
	// 获取jssdk签名
	async get_sign() {

		let now_url = window.location.href;
		now_url = now_url.split("#")[0];

		// now_url = encodeURIComponent(now_url);
		console.log(now_url)
		let url = get_sign_server_url;
		// let url = server_url + '/wxh5/makeSign';

		return new Promise((resolve, reject) => {
			// axios.post(url, {
			// 	share_url: now_url
			// }).then(res => {
			// 	resolve(res);
			// }).catch(err => {
			// 	// alert(err)
			// 	reject(err)
			// })
			ajax.post({
				url,
				data: {
					share_url: now_url
				}
			}).then(res => {
				resolve(res);
			}).catch(err => {
				// alert(err)
				reject(err)
			})
		})
	}
	// 分享初始化
	async share_init(info, succ_cb) {
		console.log("----------------------")
		console.log(wx_obj)
		wx_obj.ready(function() {
			//需在用户可能点击分享按钮前就先调用
			console.log('------------分享初始化------------');
			// 分享至微信好友/群
			wx_obj.onMenuShareAppMessage({
				...info,
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户点击了分享后执行的回调函数
					console.log("用户点击了分享后执行的回调函数")
					succ_cb()
				},
				cancel: function() {
					// 用户取消分享至微信好友/群
					console.log("用户取消分享至微信好友/群")
				}
			});
			// 分享至微信朋友圈
			wx_obj.onMenuShareTimeline({
				...info,
				success: function() {
					// 用户点击了分享后执行的回调函数
					succ_cb()
					console.log("分享至微信朋友圈成功")
				},
				cancel: function() {
					// 用户取消分享微信朋友圈成功
					console.log("用户取消分享微信朋友圈成功")
				}
			})
			// 分享至QQ好友/群
			wx_obj.onMenuShareQQ({
				...info,
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			// 分享到QQ空间
			wx_obj.onMenuShareQZone({
				...info,
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			/**
			 *
			 *
			 *

			// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
			wx.updateAppMessageShareData({
			  title: info.title, // 分享标题
			  desc: info.desc, // 分享描述
			  link: info.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			  imgUrl: info.imgUrl, // 分享图标
			  success: function() {
			    // 设置成功
			    console.log("分享给朋友”及“分享到QQ  设置成功")
			  }
			});
			// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
			wx.updateTimelineShareData({
			  title: info.title, // 分享标题
			  link: info.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			  imgUrl:info.imgUrl, // 分享图标
			  success: function() {
			    // 设置成功
			    console.log("分享到朋友圈”及“分享到QQ空间  设置成功")
			  }
			});

			 */
		});
	}

	// 获取经纬度
	async get_position(sign) {
		return new Promise(function(resolve, reject) {
			// wx.config({
			//   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			//   appId: sign.appid, // 必填，公众号的唯一标识
			//   timestamp: sign.timestamp, // 必填，生成签名的时间戳
			//   nonceStr: sign.noncestr, // 必填，生成签名的随机串
			//   signature: sign.signature, // 必填，签名
			//   jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
			// });
			wx.ready(function() {
				console.log("----- init position wx.ready---------")
				wx.getLocation({
					type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function(res) {
						console.log('init position success')
						console.log(res);
						resolve(res)

					},
					errot: function(err) {
						console.log("init position err");
						console.log(err);
					}
				});
			});
		});
	}

	async sdk_init() {
		// 获取签名数据
		let sign;
		try {
			sign = await this.get_sign();

			sign = sign.data;

		} catch (err) {
			console.log(err)
			// alert(JSON.stringify(err))
		}
		console.log('获取签名成功')
		console.log(sign);
		console.log(wx);
		wx_obj.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: sign.appid, // 必填，公众号的唯一标识
			timestamp: sign.timestamp, // 必填，生成签名的时间戳
			nonceStr: sign.noncestr, // 必填，生成签名的随机串
			signature: sign.signature, // 必填，签名
			jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone",
				"onMenuShareWeibo", 'updateAppMessageShareData', 'updateTimelineShareData'
			] // 必填，需要使用的JS接口列表
		});
		
		console.log("++++++++++++++++++++++++++")
		console.log(wx_obj)
	}
	// 微信公众号H5支付
	wx_public_h5_pay(sign) {
		return new Promise(function(resolve,reject){
			function onBridgeReady() {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						...sign
					},
					function(res) {
						console.log(res);
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							resolve(res)
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						}else{
							reject(res)
						}
					});
			}
			if (typeof WeixinJSBridge == "undefined") {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			} else {
				onBridgeReady();
			}
		})
		




	}


}

export default new wx_jssdk();




// if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
//     var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
//     if (ua.match(/MicroMessenger/i) == "micromessenger") {
//             //在微信中打开
//             console.log("在微信中打开")
//     }
//     if (ua.match(/WeiBo/i) == "weibo") {
//             //在新浪微博客户端打开
//             console.log("在新浪微博客户端打开")
//     }
//     if (ua.match(/QQ/i) == "qq") {
//             //在QQ空间打开
//             console.log("在QQ空间打开")
//     }
//     if (browser.versions.ios) {
//             //是否在IOS浏览器打开
//             console.log("是否在IOS浏览器打开")
//     }
//     if(browser.versions.android){
//             //是否在安卓浏览器打开
//             console.log("是否在安卓浏览器打开")
//     }
// } else {
//     //否则就是PC浏览器打开
// }
