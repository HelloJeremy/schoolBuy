/**
 * @FileName:     productDetail.js
 * @Description:   宝贝详情的脚本 
 * 
 * @author         xujiacheng
 * @version        V1.0  
 * @Date           2017年3月19日 上午11:43:36 
 */
//服务地址
//var contextPath = '10.10.11.239:8090';
//var contextPath = '192.168.191.1:8090'; 
$(document).ready(function(){ 
	var productid = $.getUrlParam('productid'); 
	var product = {};
	product.productid = productid;
	product = JSON.stringify(product);
	//发送ajax请求 对页面进行初始化
	$.ajax({
		   type: "POST",
		   url: "http://"+contextPath+"/schoolbuy/webapp/product/queryProductByProductId.do",
		   data: product,
		   contentType:"application/json;charset=utf-8",    
		   dataType:"JSON",
		   success: function(data){
			   var images = [' <div class="swiper-slide" style="background-image:url(/pic/image/',data.imgpath,')"></div>',
			                 '                        <div class="swiper-slide" style="background-image:url(/pic/image/',data.imgpath,')"></div>'
	].join("");
			   $('#productImage').html('');
			   $('#productImage').append(images);
			   $('#productPrice').append(data.price);   
			   $('#productDesc').append(data.detail);
			   $('#userName').append(data.user.username);  
			   $('#userTel').append(data.user.tel); 
			   //实现三维展示
			   var swiper = new Swiper('.swiper-container', {
				   autoplay : 3000,               
			        pagination: '.swiper-pagination',
			        effect: 'cube',
			        grabCursor: true,
			        cube: {
			            shadow: true,
			            slideShadows: true,
			            shadowOffset: 20,
			            shadowScale: 0.94   
			        } 
			    });    
			   swiper.update();    
		   }
		});  
	
});

//获取URL的请求参数
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);

//$.init();