/**
*实现特定功能的脚本
**/
//服务地址
//var contextPath = '192.168.191.1:8090';     
//从后台接收的数据集合
$(document).ready(function(){//在文档加载后激活函数,如果不加,浏览器刷新将会一直触发有page-current属性的页面初始化事件,加了之后在哪个page页刷新就将触发哪个page页的初始化事件
	var items = null;
	var start;
	var loginFlag = true;
	var loginFlag2 = false; 
	var message= ['<div class="infinite-scroll-preloader">     ',
	              '						<div class="preloader"></div>',
	              '						<div>玩命加载中...</div>',
	              '					</div> '].join("");
	$(document).on("pageInit", "#page-home", function(e, id, $page) {

	  $(document).on('refresh', '.page-home',function(e) {
	    setTimeout(function() {
	    	 window.location.href = "http://"+contextPath+"/schoolbuy"; 
	    }, 2000);
	  });
	  var flag1 = true;
 	  var flag2 = true;
	 //商品下拉加载更多数据项                 
 	  var loading = false;
	 $(document).on('infinite', '.infinite-scroll',function() {
//        $('#infinite-scroll1').remove(); 
		 if($('#alltype').hasClass('active')) {
			 $('#tab1').find('.infinite-scroll-preloader').remove();
		 }
		 else if ($('#shyp').hasClass('active')) {
			 if(loading) {
				 return;
			 }
			  loading = true;
			 setTimeout(function() {
				 loading = false
				 addItemsByGroups(start,$('#tab2'));    
		    }, 1000);
		 }
		 else {
			 if(loading) {
				 return;
			 }
			  loading = true;   
			 setTimeout(function() {
				 loading = false
				 addItemsByGroups(start,$('#tab3'));         
		    }, 1000);
		 }
        
	    });   
	});
function addItemsByGroups(param,elem) {
	 var innerHtml ='';
	 if(param>items.length || param==items.length) {
		 elem.find('.infinite-scroll-preloader').remove();     
		 $.detachInfiniteScroll($('.infinite-scroll'));
		 return;
	 }
	for(var i = param ;i<param+3&&i<items.length;i++) {   
		start++     	
		 innerHtml+=['<div class="card demo-card-header-pic" onclick="goProductDetail(',items[i].productid,')">',
		               '						<div valign="bottom"',
		               '							class="card-header color-white no-border no-padding">',
		               '							<img class=\'card-cover\' src="/pic/image/',items[i].imgpath,'" alt="">',
		               '						</div>',
		               '						<div class="card-content">',
		               '							<div class="card-content-inner">',
		               '								<p class="color-gray">发表于 ',formatTimeUtil(items[i].uploadtime),'</p>',
		               '								<p>',items[i].detail,'</p>',
		               '							</div>',
		               '						</div>',
		               '						<div class="card-footer">',
		               '							<a href="#" class="link">坐标：',items[i].user.address,'</a> <a href="#" class="link">',
		               '								上传者：',items[i].user.username,'</a>',   
		               '						</div>',
		               '					</div>'].join("");    
	}
	elem.find('.infinite-scroll-preloader').remove();   
	elem.append(innerHtml);
	elem.append(message);            
}
$(document).on('click','#uploadButton',function(){
	//每点击一次  不能重复请求后台
	if(loginFlag) {                                                                     
		$.ajax({
			type : "POST",
			url : "http://" + contextPath
					+ "/schoolbuy/webapp/loginAndRegister/isLogin.do",
			contentType : "application/json;charset=utf-8",
			async:false,  
			dataType : "JSON",
			success : function(data) {
				if(data === 'error') {
					$.toast("您还未登录,请登录");
					 setTimeout(function() {
						 window.location.href = "../page/loginandregister.html";         
				    }, 1000);
	        		return;   
				}
				if (data === 'ok') {
					productType = $('#product_type').val();
					if(productType==='') {
						$.toast("请选择宝贝类别");
						return;
					}                      	
				   $("#uploadInput").click();   
				   loginFlag = false; 
				}
			}
		});
		return;   
	}
	productType = $('#product_type').val();
	if(productType==='') {
		$.toast("请选择宝贝类别");
		return;
	}                      	
   $("#uploadInput").click();    
	                               
});
//page页初始化
$(document).on("pageInit", "#page-me", function(e, id, $page) {     
	//退出
	$(document).on('click','#toLoginOut',function(){     
		$.ajax({
			type : "POST",
			url : "http://" + contextPath
					+ "/schoolbuy/webapp/loginAndRegister/loginOut.do",
			contentType : "application/json;charset=utf-8",
			async:false,  
			dataType : "JSON",
			success : function(data) {
				if(data === 'loginoutSuccess') {
				 sessionStorage.removeItem('user');	 
				 $.toast("退出登录成功");
				 setTimeout(function() {
			    	 window.location.href = "http://"+contextPath+"/schoolbuy"; 
			    }, 1500);   
				}    
			}     
		});
//		 loginFlag2 = false;
	});  
	//点击头像放大
	$(document).on('click','#tolarge',function(){
		tolarge();    
	});
	//点击头像还原
	$(document).on('click','#tosmall',function(){
		$('#tosmall').fadeOut("slow");               
	});
//	var loginFlag2 = false;
	//点击头像更换
	$(document).on('click','#toChangeHeadPhoto',function(){
		if(typeof sessionStorage["user"] == "undefined") {
			$.toast("您还未登录");
		} else {
			//判断后台的session是否失效
			if(loginFlag2) {
				//更改头像
				$("#userPhotoInput").click(); 
				return;
			}
			$.ajax({
				type : "POST",
				url : "http://" + contextPath
						+ "/schoolbuy/webapp/loginAndRegister/isLogin.do",
				contentType : "application/json;charset=utf-8",
				async:false,  
				dataType : "JSON",
				success : function(data) {
					if(data === 'error') {
						//后台的session失效
						sessionStorage.removeItem('user');             
						$.toast("您还未登录");
					} if (data === 'ok') {
						//后台的session未失效
						loginFlag2 = true;
						//更改头像
						$("#userPhotoInput").click();               
					}
				}
			});
		} 
	});
	//将个人头像上传到后台
	$(document).on('change','#userPhotoInput',function(){          
		$.ajaxFileUpload({
	        url:'http://'+contextPath+'/schoolbuy/webapp/loginAndRegister/changeUserPhoto.do', //服务器端请求地址
	        secureuri: false, //是否需要安全协议，一般设置为false
	        fileElementId: 'userPhotoInput', //文件上传域的ID
	        dataType : "JSON", //返回值类型 一般设置为json                                     
	        enctype:'multipart/form-data',//注意一定要有该参数
	        type:'POST',
	        success: function (data)  //服务器成功响应处理函数
	        {
	        	data = JSON.parse(data); //JSON.parse()将JSON字符串转为js对象                 
	        	if(data==='ok') {
	        		window.location.reload(true);   //浏览器刷新
	        	} 
	        },      
	    });
	});
	//点击对个人宝贝进行管理
	$(document).on('click','#toManagerProduct',function(){
		if(typeof sessionStorage["user"] == "undefined") {
			$.toast("您还未登录");
		} else {
			//判断后台的session是否失效
			if(loginFlag2) {
				//查看个人宝贝
				window.location.href = '../page/productManager.html';     
				return;
			}
			$.ajax({
				type : "POST",
				url : "http://" + contextPath
						+ "/schoolbuy/webapp/loginAndRegister/isLogin.do",
				contentType : "application/json;charset=utf-8",
				dataType : "JSON",
				success : function(data) {
					if(data === 'error') {
						//后台的session失效
						sessionStorage.removeItem('user');             
						$.toast("您还未登录");
					} if (data === 'ok') {
						//后台的session未失效
						loginFlag2 = true;   
						//查看个人宝贝
						window.location.href = '../page/productManager.html';                
					}
				}
			});
		}  
	});  
});    


$(document).on('change','#uploadInput',function(){ 
	$.prompt('该宝贝的参考价格','欢迎使用校园购',function (value) {
		price = value;
		$.prompt('该宝贝的描述','欢迎使用校园购',function (value) {
			uploadProduct(value,price);
	    });
    });   
});

//按类别查看商品
$(document).on('click','#shyp',function(){ //生活用品
	selectProductByType('1','#tab2');
});
$(document).on('click','#booktype',function(){ //书籍
	selectProductByType('0','#tab3');   
});

function selectProductByType(type,id){
	var product = {};
	product.productType = type;
	product = JSON.stringify(product);
	//异步和后台交互
	$.ajax({
		   type: "POST",
		   url: "http://"+contextPath+"/schoolbuy/webapp/product/queryProductByType.do",
		   data: product,
		   contentType:"application/json;charset=utf-8",    
		   dataType:"JSON",
		   success: function(data){
			   //遍历data改数组对象
			   $(id).empty();
			   items = data;
			   $.attachInfiniteScroll('.infinite-scroll');   
			   start=3;
			  var innerHtml ='';
			   $.each(data, function(n, item) {
				   if(n<3) {
				   innerHtml+=['<div class="card demo-card-header-pic" onclick="goProductDetail(',item.productid,')">',    
				               '						<div valign="bottom"',
				               '							class="card-header color-white no-border no-padding">',
				               '							<img class=\'card-cover\' src="/pic/image/',item.imgpath,'" alt="">',
				               '						</div>',
				               '						<div class="card-content">',
				               '							<div class="card-content-inner">',
				               '								<p class="color-gray">发表于 ',formatTimeUtil(item.uploadtime),'</p>',
				               '								<p>',item.detail,'</p>',
				               '							</div>',
				               '						</div>',
				               '						<div class="card-footer">',
				               '							<a href="#" class="link">坐标：',item.user.address,'</a> <a href="#" class="link">',
				               '								上传者：',item.user.username,'</a>',
				               '						</div>',
				               '					</div>'].join("");
			   }});
			   $(id).append(innerHtml);    
			   $(id).append(message);      
		   }
		});    
}
/*//查看宝贝详情
function goProductDetail(productId) {
	window.location.href = "../page/productDetail.html?productid="+productId; 
	
//	$.router.loadPage("../page/productDetail.html?productid="+productId); 不兼容
}*/

//将商品上传至后台
function uploadProduct(value,price) {
	productType = $('#product_type').val();
	/*if(productType==='') {
		$.toast("请选择宝贝类别");
		return;
	}*/
	if(productType==='书籍') {
		productType = '0'
	} else {
		productType = '1'   
	}
	$.ajaxFileUpload({
        url:'http://'+contextPath+'/schoolbuy/webapp/product/uploadProduct.do?price='+price+'&productType='+productType+'&detail='+value, //服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: 'uploadInput', //文件上传域的ID
        dataType : "JSON", //返回值类型 一般设置为json                                     
        enctype:'multipart/form-data',//注意一定要有该参数
        type:'POST',
        success: function (data)  //服务器成功响应处理函数
        {	// data.replace(/"/g, "");  利用正则表达式：将两个双引号转为一个双引号            
        	data = JSON.parse(data);               
        	if(data==='ok') {
        		$.toast("宝贝上传成功,请下拉刷新");
        	}                                      
        },      
    });
}
var $dark = $("#dark-switch").on("change", function() {
  $(document.body)[$dark.is(":checked") ? "addClass" : "removeClass"]("theme-dark");
});

//选择宝贝类别--弹出选择框
$("#product_type").picker({
  toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker" style="color:white;">确定</button>\
  <h1 class="title" style="color:white;">请选择宝贝类别</h1>\
  </header>',    
  cols: [
    {
      textAlign: 'center',
      values: ['生活用品', '书籍']
    }
  ]
});
//格式化时间的函数
function formatTimeUtil(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;       
}
//头像放大
function tolarge()  
{  
	$("#tosmall").css({"top":"2.6em","position": "fixed","background": "#000","z-index": "1001","-moz-opacity": "0.5","filter": "alpha(opacity=50)","width":"100%"});
	$("#tosmall").fadeIn("slow");       
} 

$.init();    });  
//查看宝贝详情
function goProductDetail(productId) {
	window.location.href = "../page/productDetail.html?productid="+productId; 
	
//	$.router.loadPage("../page/productDetail.html?productid="+productId); 不兼容
}