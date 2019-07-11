export default {
	/* 
	 * 检验手机号 
	 */
	checkPhone: function(phone) {
		// var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则,第一位是【1】开头，第二位有【3,4,5,7,8】，第三位及以后可以是【0-9】  
		 var reg = /^1[0-9]{10}$/;//不验证第二位，防止几年后新增号码段  
		if (!reg.test(phone)) {
			return false;
		}
		return true;
	},

	/* 
	 * 检验身份证 
	 */
	checkIdCard: function(idCard) {
		var aCity = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"
		}
		var iSum = 0;
		var info = "";
		if (!/^\d{17}(\d|x)$/i.test(idCard)) {
			return false; //身份证长度或格式错误  
		}
		idCard = idCard.replace(/x$/i, "a");
		if (aCity[parseInt(idCard.substr(0, 2))] == null) {
			return false; //身份证地区非法;  
		}
		var sBirthday = idCard.substr(6, 4) + "-" + Number(idCard.substr(10, 2)) + "-" + Number(idCard.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
			return false; //身份证上的出生日期非法;  
		}
		for (var i = 17; i >= 0; i--) {
			iSum += (Math.pow(2, i) % 11) * parseInt(idCard.charAt(17 - i), 11);
		}
		if (iSum % 11 != 1) {
			return false; //身份证号非法;   
		}

		return true;

	},

	/* 
	 * 检验否是汉字  
	 */
	checkCharacter: function(charValue) {
		var reg = /^[\u4e00-\u9fa5]{0,}$/;
		if (!reg.test(charValue)) {
			return false;
		}
		return true;
	}
}
