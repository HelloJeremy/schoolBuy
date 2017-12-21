var updateProduct;
$(document).ready(function(){//页面初始化化执行
		var product = {};
    	var productid = $.getUrlParam('productid');     
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
    			   var productImgPath ='/pic/image/'+data.imgpath;
    			   $('img').attr('src',productImgPath);
    			   $('textarea').val(data.detail);
    			   $('.priceinput').val(data.price);
    			   updateProduct = data;                            
    		   }
    		});  
});//逗号要加    
//发送宝贝修改的请求
$(document).on('click','.button-success',function() {
	productPrice = parseFloat($('.priceinput').val());
	if(!Number.isInteger(productPrice)) {
		$.toast('价格不能为小数');
		return;
	}
	updateProduct.detail = $('textarea').val();
	updateProduct.price = $('.priceinput').val();            
	   $.ajax({
		   type: "POST",
		   url: "http://"+contextPath+"/schoolbuy/webapp/product/updateProduct.do",
		   data: JSON.stringify(updateProduct),   
		   contentType:"application/json;charset=utf-8",    
		   dataType:"JSON",
		   success: function(data){                                      
			   if(data==='ok') {
//				   window.location.href='../page/productManager.html';
				   $.router.back('../page/productManager.html');
			   }       
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
