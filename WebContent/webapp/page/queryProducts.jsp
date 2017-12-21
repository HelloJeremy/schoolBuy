<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html>
<html>

<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>东华理工大学校园购</title>
<link rel="stylesheet" href="../css/light7.min.css">
<link rel="stylesheet" href="../css/mylight7.css">    
<link rel="stylesheet" href="../css/common.css">
<link rel="stylesheet" href="../css/icon/iconfont.css">   
</head>

<body class='myapp'>
	<!-- 工具栏 -->
	<nav class="bar bar-tab">
		<a class="tab-item active" href='#page-home'>  
			<span class="icon icon-home"></span> <span class="tab-label">Home</span>
		</a> <a class="tab-item" href="#page-me"> <span
			class="icon icon-me"></span> <span class="tab-label">Me</span>
		</a>
	</nav>
	<!-- page 容器 -->
	<div class="page page-home page-current" id="page-home">
		<!-- 标题栏 -->
		<header class="bar bar-nav">
			<!--    <a class="icon icon-me pull-left"></a>-->
			<c:if test="${sessionScope.user == null}">
			<div id='home_userphoto'>
				<!-- 未登录情况 -->
				<span class="iconfont icon-denglu pull-left personal" style='font-size:1.3em'></span>
			</div>
			</c:if>
			<c:if test="${sessionScope.user != null}">
				<!-- 登录情况 -->
				<div id='home_userphoto'><img src='/pic/head/${sessionScope.user.headPath}' class="pull-left personal" /></div> 
			</c:if>   
			<h1 class="title">校园购</h1>
			<a class="icon icon-menu pull-right open-panel" style='color:white;'></a>
		</header>
		<div class="buttons-tab" style="top: 2.6em; position: relative;">
			<a href="#tab1" id='alltype' class="tab-link active button">All</a>
		    <a href="#tab2" id='shyp' class="tab-link button">生活用品</a> 
			<a href="#tab3" id='booktype' class="tab-link button">书籍</a>   
		</div>
		<!-- 这里是页面内容区 -->
		<div class="content infinite-scroll pull-to-refresh-content" data-distance="50"
			style="top:2em;">
		   <div class="pull-to-refresh-layer">               
			  <div class="preloader"></div>
			  <div class="pull-to-refresh-arrow"></div>         
		   </div>
			<!-- <div class="content-block">-->
			<div class="tabs">
				<div id="tab1" class="tab active">
					<c:forEach items="${allProduct }" var="item">
					<div class="card demo-card-header-pic" onclick="goProductDetail(${item.productid})">
						<div valign="bottom"
							class="card-header color-white no-border no-padding">
							<img class='card-cover'  src="/pic/image/${item.imgpath}" alt="">
						</div>
						<div class="card-content">
							<div class="card-content-inner">
								<p class="color-gray">发表于 <fmt:formatDate value="${item.uploadtime}" pattern="yyyy-MM-dd"/></p>
								<p>${item.detail}</p>
							</div>
						</div>
						<div class="card-footer">
							<a href="#" class="link">坐标：${item.user.address}</a> <a href="#" class="link">
								上传者：${item.user.username}</a>   
						</div>
					</div>
					</c:forEach>
					<div class="infinite-scroll-preloader">
						<div class="preloader"></div>
						<div>暂无更多...</div>   
					</div>   
				</div>
				<div id="tab2" class="tab">
					<div class="infinite-scroll-preloader">
						<div class="preloader"></div>
						<div>玩命加载中...</div>
					</div> 
				</div>
				<div id="tab3" class="tab">
					<div class="infinite-scroll-preloader">       
						<div class="preloader"></div>
						<div>玩命加载中...</div>
					</div> 
				</div>
			</div>
			<!--            </div>-->
		</div>
	</div>
	
	<!-- 个人中心的page页面 -->
	<div class="page" id='page-me'>       
	  <!-- 标题栏 -->
	  <header class="bar bar-nav">
	  	<a class="button button-link button-nav pull-left" href='#page-home'> <span class="icon icon-left"></span> Back </a>
	    <h1 class="title">校园购</h1>   
	  </header>
	  <!-- 这里是页面内容区 -->
	  <div class="content">
	    <div class="content-block" style='padding:0em;margin-top:0em;'>
	    	<div class='grzxtxBackground' style='text-align:center'>
	    	<c:if test="${sessionScope.user != null}">    
	    	<!-- 已经登录 -->
			<img src='/pic/head/${sessionScope.user.headPath}' style='margin-left:0em;' class="personalbig" id='tolarge'/>
			<a href="#" id='toLoginOut' class="button" style='color:#fff;border:1px solid #fff;width:30%;margin-left:35%;margin-top:.2em;'>
				退出登录   
			</a>                   
			</c:if>
			<c:if test="${sessionScope.user == null}">    
			<!-- 未登录时的状态 -->
			<span class="iconfont icon-denglu" style='color: #fff;font-size:4rem;' class="personalbig"></span>
			<a href="#" onclick='window.location.href = "../page/loginandregister.html";' class="button" style='color: #fff;border: 1px solid #fff;width:30%;margin-left:35%;margin-top:.2em;'>
				立即登录
			</a> 
			</c:if>       
	    	</div>
	    	<!-- 用户点击头像后 ,头像放大显示-->   
	    	<img src='/pic/head/${sessionScope.user.headPath}' style='display:none' id='tosmall'/>
	    	<ul style='width:100%;height:3.5em;background-color:#fff;margin-top:-1em;list-style-type:none;padding-left:0em;'>                
		         <li style='width:50%;float:left;text-align:center;border-right:1px solid #eeeeee;height:100%;'>
		           <input  type="file" name="userPhoto" style='display:none' id='userPhotoInput' accept="image/*;" capture="camera">	
			       <a href="#" style='display:block;color:#7b7b7b;margin-top:.2em;' id='toChangeHeadPhoto'>
			         <span class="icon" style='display:block;'><i class="iconfont icon-xiugaitouxiang-copy" style='display:block;font-size:1.2em;'></i></span>
			         <span class="txt">修改头像</span>
		           </a>
		         </li>
		         <li style='width:50%;float:left;text-align:center;border-right:1px solid #eeeeee;'>
			        <a href="#" style='display:block;color:#7b7b7b;margin-top:.2em;' id='toManagerProduct'>
				       <span class="icon" style='display:block;'><i class="iconfont icon-bianjibaobei" style='display:block;font-size:1.2em;'></i></span>
				       <span class="txt">我的宝贝</span>
			        </a>
		         </li>
			</ul>
			<!-- 校园购应用功能介绍 -->
			<div class="list-block">
				<div class="content-padded">
					<p>校园购应用功能介绍：</p>
				</div>
				<section id="cd-timeline" class="cd-container">
					<div class="cd-timeline-block">
						<div class="cd-timeline-img cd-location">
						</div>
						<div class="cd-timeline-content">
							 <div class="cd-title">所有宝贝浏览、查看</div>          
						</div>
					</div>
					<div class="cd-timeline-block">
						<div class="cd-timeline-img cd-movie">    
						</div>
						<div class="cd-timeline-content">
							 <div class="cd-title">用户注册、登录</div>          
						</div>
					</div>
					<div class="cd-timeline-block">
						<div class="cd-timeline-img cd-picture">
						</div>
						<div class="cd-timeline-content">
							 <div class="cd-title">上传个人宝贝</div>          
						</div>
					</div>
					<div class="cd-timeline-block">
						<div class="cd-timeline-img cd-movie">
						</div>
						<div class="cd-timeline-content">
							 <div class="cd-title">管理个人宝贝</div>          
						</div>
					</div>
					<div class="cd-timeline-block">
						<div class="cd-timeline-img cd-location">
						</div>
						<div class="cd-timeline-content">
							 <div class="cd-title">修改个人头像</div>          
						</div>
					</div>
					</section>
			</div>
	    </div>     
	  </div>    
	</div>                 
	
	<!-- popup, panel 等放在这里 -->
	<div class="panel-overlay"></div>
	<!-- Left Panel with Reveal effect -->
	<div class="panel panel-left panel-reveal" style="background: #111;">
		<div class="content-block"
			style="background-image: url(../image/grzxbackground.png); height: 15em; margin-top: 0em">
			<!-- 当用户登录时显示用户的头像、用户名、及商品图像上传 -->
			<div>
				<c:if test="${sessionScope.user == null}">
					<!-- 未登录情况 -->
					<div id='panel_userInfo'>        
						<span class="iconfont icon-denglu" onclick='$.router.loadPage("#page-me")' style='color:#ffffff;margin-left:.9em;font-size:4rem;' class="personalbig"></span>
					</div> 
				</c:if>  
				<c:if test="${sessionScope.user != null}">
					<!-- 登录情况 -->    
					<div id='panel_userInfo'>
						<img src='/pic/head/${sessionScope.user.headPath}' onclick='$.router.loadPage("#page-me")' class="personalbig" /> 
						<input type="text" class='nameinput' value="${sessionScope.user.username}" /> 
					</div> 
				</c:if>      
					<i class="iconfont icon-p-types" style='margin-left:1.5em;float:left;color:#ffffff;'></i>     
					<input type='text' id='product_type' style='color:#fff;' placeholder="请选择宝贝类别">   
					<div id='show'>
					<span class="icon icon-picture" style="float: left; margin-left: 1.5em;color:#ffffff;"></span></div>
				<a href="#" id="uploadButton" class="button" style='width: 8em; margin-left:3.6em;color:#ffffff;border: 1px solid #fff;'>我的宝贝上传</a>
				<input  type="file" name="file" style="display:none" id='uploadInput' accept="image/*;" capture="camera"> 
			</div>
		</div>
		<p style="color: #bbb;">
			&nbsp;&nbsp;&nbsp;Themes<span class="icon icon-right close-panel"></span>
		</p>
		<div class="list-block" style="color: #bbb;">
			<ul
				style="border-top: 1px solid #e7e7e7; border-bottom: 1px solid #e7e7e7; background: #111;">
				<li>
					<div class="item-content">
						<div class="item-inner">
							<div class="item-title label" style='width: 60%;'>Night
								Mode</div>
							<div class="item-input">
								<label class="label-switch"> <input type="checkbox"
									id="dark-switch">
									<div class="checkbox"></div>
								</label>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<script type='text/javascript' src='../js/jquery-2.1.4.min.js'
		charset='utf-8'></script>                        
	<script type='text/javascript' src='../js/ajaxfileupload.js'   
		charset='utf-8'></script>
	<script type='text/javascript' src='../js/light7.min.js'
		charset='utf-8'></script>
	<script type='text/javascript' src='../js/address.js' charset='utf-8'></script>   
	<script type='text/javascript' src='../js/common.js' charset='utf-8'></script>                
</body>
</html>