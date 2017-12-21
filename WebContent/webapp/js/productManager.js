/**
 * @FileName:     productManager.js
 * @Description:   TODO(个人宝贝管理的js脚本) 
 * 
 * @author         xujiacheng
 * @version        V1.0  
 * @Date           2017年4月12日 上午9:03:22 
 */
$(document).ready(function() {
	$('.back').attr('href',"http://"+contextPath+"/schoolbuy/webapp/product/queryProducts2.do#page-me");
	$(document).on('pageInit','#page-myproducts',function(e, id, $page) {
		var innerHtml = '';
    	//通过ajax请求  查询所有的商品
    	$.ajax({
			type : "POST",
			url : "http://" + contextPath
					+ "/schoolbuy/webapp/product/queryProductsofUser.do",
			contentType : "application/json;charset=utf-8",
			dataType : "JSON",
			success : function(data) {
				if(data.length===0){
					$.toast('您暂未上传宝贝,请上传');
					return;
				}
				$.each(data, function(n, item) {
					innerHtml+=['<li>',
					            '                        <label class="label-checkbox item-content" style=\'float:left;margin-top:8%;width: 9%;\'>',
					            '                            <input type="checkbox" value=\'',item.productid,'\'>',
					            '                            <div class="item-media">',
					            '                                 <i class="icon icon-form-checkbox"></i>',
					            '                             </div>',
					            '                        </label>',
					            '                           <a href="#" onclick="goProductDetail(',item.productid,')" class="item-link item-content">',
					            '                            <div class="item-media" style=\'width:27%;\'><img src="/pic/image/',item.imgpath,'" style=\'width: 100%;\'></div>',
					            '                            <div class="item-inner" style="width:64%;">',
					            '                                <div class="item-title-row">',
					            '                                    <div class="item-title">价格</div>',
					            '                                    <div class="item-after"  style=\'color:#f24b48;\'>￥',item.price,'</div>',
					            '                                </div>',
					            '                                <p class="item-text nowrap">',item.detail,'</>         ',
					            '                            </div>',
					            '                        </a>    ',
					            '                       ',
					            '                    </li>'].join("");
				});
				$('ul').empty();
				$('ul').append(innerHtml);
			}     
		});
    }) 
        $(document).on('click','#selectOrNoselect',function() {
            var elem = $('.tab-label', $('#selectOrNoselect'));
            if(elem.html()==='全选') {
                $("input[type='checkbox']").prop("checked", true);//全选   
                elem.html('全不选');
            } else if(elem.html()==='全不选') {
              $("input[type='checkbox']").prop("checked", false);//取消全选             
                //$("input[type='checkbox']").removeProp("checked");//取消全选             
                elem.html('全选');   
            }
        }) 
        //将宝贝下架
        $(document).on('click','#toremove',function() {   
            var productIds = '';
            var checkboxs = $(":checked");//:checked 选择器选取所有选中的复选框或单选按钮。
            if(checkboxs.length===0) {
                $.toast('未选中要下架的宝贝信息');
            } else{
                checkboxs.each(function(i) {
                	if(i===checkboxs.length-1) {   
                		productIds+=$(this).val(); 
                	} else{
                		productIds+=$(this).val()+',' 
                	}   
                })
                var ids = productIds.split(","); 
                ids = JSON.stringify(ids);//JSON.stringify()将js对象转为json字符串 
                $.ajax({
        			type : "POST",
        			url : "http://" + contextPath
        					+ "/schoolbuy/webapp/product/deleteProductById.do",
        			contentType : "application/json;charset=utf-8",
        			dataType : "JSON",
        			data:ids ,         
        			success : function(data) {
        				if(data==='ok') {
        					window.location.reload(true);//浏览器刷新
        					$.toast('所选宝贝下架成功');
        				}
        				
        			}     
        		});
                }
                
        }) 
        $.init();
});
function goProductDetail(productId) {
	window.location.href = "../page/changeproduct.html?productid="+productId;    
}