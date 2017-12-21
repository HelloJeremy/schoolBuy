/**
*实现特定功能的脚本
**/
//服务地址
var contextPath = '10.10.11.239:8090';
//var contextPath = '192.168.191.1:8090';   


$(document).on("pageInit", "#page-home", function(e, id, $page) {

  $(document).on('refresh', '.page-home',function(e) {
    setTimeout(function() {
      $.pullToRefreshDone('.page-home');   
    }, 2000);
  });

 //商品下拉加载更多数据项                                   
 $(document).on('infinite', '.infinite-scroll',function() {
        setTimeout(function() {
                $('.infinite-scroll-preloader').remove();
        }, 1000);
    });

});

$(document).on('click','#uploadButton',function(){
   $("#uploadInput").click();                                
});
//图片上传前预览
//var upimg = document.querySelector('#uploadInput');
//upimg.addEventListener('change', function(e){
$(document).on('change','#uploadInput',function(){        
//    var files = this.files;
//    if(files.length){
//    	// 对文件进行处理
//        checkFile(this.files);
//    }
	  //to do....将图片上传至服务器	
	$.prompt('该宝贝的参考价格','欢迎使用校园购',function (value) {
		price = value;
		$.prompt('该宝贝的描述','欢迎使用校园购',function (value) {
			uploadProduct(value,price);
			 /*setTimeout(function() {
				 //超链接   
				 window.location.href = "http://"+contextPath+"/schoolbuy";
	        }, 3000);    */      
	    });
    });   
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
			   var innerHtml ='';
			   $.each(data, function(n, item) {
				   innerHtml+=['<div class="card demo-card-header-pic">',    
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
				               '							<a href="#" class="link">坐标：西二楼下</a> <a href="#" class="link">',
				               '								上传者：豆腐西施</a>',
				               '						</div>',
				               '					</div>'].join("");
			   });
			   $(id).html(innerHtml);   
		   }
		});    
}

//将商品上传至后台
function uploadProduct(value,price) {
	productType = $('#product_type').val();
	if(productType==='书籍') {
		productType = '0'
	} else {
		productType = '1'   
	}
	$.ajaxFileUpload({
        url:'http://'+contextPath+'/schoolbuy/webapp/product/uploadProduct.do?price='+price+'&productType='+productType+'&detail='+value, //服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: 'uploadInput', //文件上传域的ID
        dataType: 'JSON', //返回值类型 一般设置为json     
        enctype:'multipart/form-data',//注意一定要有该参数
        type:'POST',
        /*success: function (data)  //服务器成功响应处理函数
        {	data = JSON.parse(data); 
        },*/      
    });
}

//图片处理
/*function checkFile(files){
	var file = files[0];
	var reader = new FileReader();
	// show表示<div id='show'></div>，用来展示图片预览的
	if(!/image\/\w+/.test(file.type)){
        show.innerHTML = "请确保文件为图像类型";
        return false;
    }
	var show = document.querySelector('#show');
    // onload是异步操作
	reader.onload = function(e){
		show.innerHTML = '<img src="'+e.target.result+'" alt="img">';
	}
	reader.readAsDataURL(file);
}*/  
var $dark = $("#dark-switch").on("change", function() {
  $(document.body)[$dark.is(":checked") ? "addClass" : "removeClass"]("theme-dark");
});

//选择宝贝类别--弹出选择框
$("#product_type").picker({
  toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">请选择宝贝类别</h1>\
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

$.init();     