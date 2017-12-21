/**
 * @FileName: productDetail.js
 * @Description: 宝贝详情的脚本
 * 
 * @author xujiacheng
 * @version V1.0
 * @Date 2017年3月19日 上午11:43:36
 */
// 服务地址
// var contextPath = '10.10.11.239:8090';
// var contextPath = '192.168.191.1:8090';
var isPhone = 1;
var flag_tel = false;
var flag_passward = false;
$(document)
		.ready(
				function() {
					//$("#toRegister").unbind("click");      
					
					// 登录
					$(document).on("click", "#login",
							function(e, id, $page) {
						var tel = $('#login_tel').val();
						var password = $('#login_password').val();
						if(tel==='' || password===''){
							$.toast("请填写所有输入框");
							return;
						}
						//校验验证码的准确性
						var pattern = /^1[0-9]{10}$/;
						if (!pattern.test(tel)) {
							$.alert('请输入正确的手机号码');
							return;
						}   
						var user = {};
						user.tel = tel;
						user.password = password; 
						user = JSON.stringify(user);
						$.ajax({
									type : "POST",
									url : "http://"
											+ contextPath
											+ "/schoolbuy/webapp/loginAndRegister/login.do",
									data : user,
									contentType : "application/json;charset=utf-8",
									dataType : "JSON",
									success : function(data) {
										if(data.info==='noUser') {
											$.toast("该手机未注册");
										}
										if(data.info==='error') {
											$.toast("账号或密码不正确");
										}
										if(data.info==='ok') {
											window.location.href = "http://"+contextPath+"/schoolbuy";
											//将登入的用户保存到会话中
											sessionStorage["user"] = data.user;
											$.toast("登录成功");                     
										}
									}
								});
							});
					
					// 发送ajax请求 获取验证码
					$(document).on("click", "#getIdentifying",
							function(e, id, $page) {
								getCode(e);
							});
					// 校验手机号码是否已注册-失去焦点事件
					$(document)
							.on(
									"blur",
									"#tel",
									function(e, id, $page) {
										//校验手机号格式是否正确
										var phone = $('#tel').val();
										var pattern = /^1[0-9]{10}$/;
										if (phone == '') {
											$.toast('请输入手机号码');
											$('#tel').focus();
											return;
										}
										if (!pattern.test(phone)) {
											$.toast('请输入正确的手机号码');
											$('#tel').focus();
											return;   
										}
										
										var user = {};
										user.tel = $('#tel').val();
										user = JSON.stringify(user);
										$
												.ajax({
													type : "POST",
													url : "http://"
															+ contextPath
															+ "/schoolbuy/webapp/loginAndRegister/findUserByTel.do",
													data : user,
													contentType : "application/json;charset=utf-8",
													dataType : "JSON",
													success : function(data) {
														if (data.length > 0) {
															flag_tel = false;
															$
																	.confirm(
																			'该手机号已注册,使用此手机号登录？',
																			function() {
																				$.router
																						.loadPage("#login_page");
																			});
														} else {
															flag_tel = true;
														}
													}
												});
									});

					// 校验前后密码是否一致
					$(document).on("blur", "#repassword",
							function(e, id, $page) {
								var password = $('#password').val();
								var repassword = $('#repassword').val();
								if (!(password === repassword)) {
									flag_passward = false;
									$.toast("前后密码不一致");
								} else {
									flag_passward = true;
								}
							});
					
					// 将注册按钮变为可用
					$(document).on(
							"click",
							"#toRegister",
							function(e, id, $page) {
								//校验手机号格式是否正确
								var phone = $('#tel').val();
								var pattern = /^1[0-9]{10}$/;
								if (phone == '') {
									$.toast('请输入手机号码');
									$('#tel').focus();
									return;
								}
								if (!pattern.test(phone)) {
									$.toast('请输入正确的手机号码');
									$('#tel').focus();
									return;   
								}
								if (checkInputIsValue($('#tel'))
										&& checkInputIsValue($('#username'))
										&& checkInputIsValue($('#password'))
										&& checkInputIsValue($('#repassword'))
										&& checkInputIsValue($('#address'))
										&& checkInputIsValue($('#identifying'))) {
									if(!flag_tel) {
										$
										.confirm(
												'该手机号已注册,使用此手机号登录？',
												function() {
													$.router
															.loadPage("#login_page");
												});
										return;
									}
									if(!flag_passward) {
										$.toast("前后密码不一致");
										return;
									}
									if(flag_tel&&flag_passward) {
										//$('#toRegister').removeAttr("style");          
										// 注册点击ajax请求
										/*$(document).on("click", "#toRegister",
												function(e, id, $page) {*/                  
											var password = $('#password').val();
											var repassword = $('#repassword').val();
											if (!(password === repassword)) {
												flag_passward = false;
												$.toast("前后密码不一致");   
											} else {
												//友好提示
												 $.showPreloader('请稍后')
												//注册--先检验验证码是否正确
												var identifying = $('#identifying').val();
												var user = {};
												user.tel = $('#tel').val();
												user.username = $('#username').val();
												user.password = $('#password').val();
												user.address = $('#address').val();
												user = JSON.stringify(user);
												$
														.ajax({
															type : "POST",
															url : "http://"
																	+ contextPath
																	+ "/schoolbuy/webapp/loginAndRegister/registerOfInsertUser.do?identifying="+identifying,
															data : user,
															contentType : "application/json;charset=utf-8",
															dataType : "JSON",
															success : function(data) {
																$.hidePreloader();
																if(data==='error') {
																	$.toast("验证码不正确");
																	return;
																}
																if(data==='ok') {
																	$.toast("注册成功");
																	$.router.loadPage("#login_page");
																	return;
																}
																if(data==='telExist') {
																	$.confirm(
																			'该手机号已注册,使用此手机号登录？',
																			function() {
																				$.router
																						.loadPage("#login_page");
																			});
																	return;                
																}
															}
														});
											}
										//});      
									}

								} else {
									$.toast("请填写所有的输入框");
								}
							});
					
					//忘记密码--修改新密码的处理
					$(document).on("click", "#forget_getIdentifying",
							function(e, id, $page) {
								forget_getCode(e);   
							});
					//忘记密码--校验前后密码是否一致
					$(document).on("blur", "#forget_repassword",
							function(e, id, $page) {
								var password = $('#forget_password').val();
								var repassword = $('#forget_repassword').val();
								if (!(password === repassword)) {
									//flag_passward = false;
									$.toast("前后密码不一致");
									//$('#forget_password').focus();   
								} /*else {
									flag_passward = true;
								}*/                                   
							});
					//忘记密码--登录按钮的点击事件
					$(document).on('click','#forget_tologin',function() {
						//校验所有输入框是否已经填写完毕
						if(checkInputIsValue($('#forget_tel')) && checkInputIsValue($('#forget_password'))&& checkInputIsValue($('#forget_repassword')) && checkInputIsValue($('#forget_identifying'))) {
							//校验手机号码是否符合规则
							var phone = $('#forget_tel').val();
							var pattern = /^1[0-9]{10}$/;
							if (phone == '') {
								$.toast('请输入手机号码');
								$('#forget_tel').focus();
								return;
							}
							if (!pattern.test(phone)) {
								$.toast('请输入正确的手机号码');
								$('#forget_tel').focus();
								return;   
							}
							//校验前后密码是否一致
							var password = $('#forget_password').val();
							var repassword = $('#forget_repassword').val();
							if (!(password === repassword)) {
								$.toast("前后密码不一致");
								$('#forget_password').focus();    
								return;     
							}
							//校验手机号码是否已经注册
							var user = {};
							user.tel = $('#forget_tel').val();
							user = JSON.stringify(user);
							$.ajax({
										type : "POST",
										url : "http://"
												+ contextPath
												+ "/schoolbuy/webapp/loginAndRegister/findUserByTel.do",
										data : user,
										contentType : "application/json;charset=utf-8",
										dataType : "JSON",
										success : function(data) {
											if (!data.length > 0) {
												$.confirm(
																'该手机号未注册,立即注册？',
																function() {
																	$.router
																			.loadPage("#register_page");
																});
											} else {
												//进行登录
												//友好提示
												 $.showPreloader('请稍后')
												//注册--先检验验证码是否正确
												var identifying = $('#forget_identifying').val();
												var user = {};
												user.tel = $('#forget_tel').val();
												user.password = $('#forget_password').val();
												user = JSON.stringify(user);
												$
														.ajax({
															type : "POST",
															url : "http://"
																	+ contextPath
																	+ "/schoolbuy/webapp/loginAndRegister/changeUserPassword.do?identifying="+identifying,
															data : user,
															contentType : "application/json;charset=utf-8",
															dataType : "JSON",
															success : function(data) {
																$.hidePreloader();
																if(data.info==='error') {
																	$.toast("验证码不正确");
																	return;
																}
																if(data.info==='ok') {
																	$.toast("登录成功");
																	sessionStorage["user"] = data.user;
																	window.location.href = "http://"+contextPath+"/schoolbuy/webapp/product/queryProducts2.do";   
																	return;
																}
																if(data.info==='noUser') {
																	$.confirm(
																			'该手机号未注册,立即注册？',
																			function() {
																				$.router.loadPage("#register_page");
																			});
																	return;                
																}
															}   
														});
											}
										}
									});
							
							
						} else {
							$.toast('请填写所有的输入框');
						}
						
						
					});
					
				});
// 判断input中是否有值
function checkInputIsValue($ele) {
	if (!($ele.val() === '')) {
		return true;
	} else {
		return false;
	}
}

function getCode(e) {
	checkPhone(); // 验证手机号码
	if (isPhone) {
		var user = {};
		user.tel = $('#tel').val();
		user = JSON.stringify(user);
		$.ajax({
			type : "POST",
			url : "http://" + contextPath
					+ "/schoolbuy/webapp/loginAndRegister/register.do",
			data : user,
			contentType : "application/json;charset=utf-8",
			dataType : "JSON",
			success : function(data) {
				if (data === 'ok') {
					resetCode(); // 倒计时
				}
			}
		});
	} else {
		$('#tel').focus();
	}
}
var forget_isPhone = 1;
//修改密码--获取验证码
function forget_getCode(e) {
	// 验证手机号码
	var phone = $('#forget_tel').val();
	var pattern = /^1[0-9]{10}$/;
	forget_isPhone = 1;
	if (phone == '') {
		$.alert('请输入手机号码');
		forget_isPhone = 0;
		return;
	}
	if (!pattern.test(phone)) {
		$.alert('请输入正确的手机号码');
		forget_isPhone = 0;
		return;
	}
	
	if (forget_isPhone) {
		//验证手机号是否已经注册
		var user = {};
		user.tel = $('#forget_tel').val();
		user = JSON.stringify(user);
		$
				.ajax({
					type : "POST",
					url : "http://"
							+ contextPath
							+ "/schoolbuy/webapp/loginAndRegister/findUserByTel.do",
					data : user,
					contentType : "application/json;charset=utf-8",
					dataType : "JSON",
					success : function(data) {
						if (!data.length > 0) {
//							flag_tel = false;
							$
									.confirm(
											'该手机号未注册,立即注册？',
											function() {
												$.router
														.loadPage("#register_page");
											});
						} else {
//							flag_tel = true;
							//发送手机验证码
							var user = {};
							user.tel = $('#forget_tel').val();
							user = JSON.stringify(user);
							$.ajax({
								type : "POST",
								url : "http://" + contextPath
										+ "/schoolbuy/webapp/loginAndRegister/register.do",
								data : user,
								contentType : "application/json;charset=utf-8",
								dataType : "JSON",
								success : function(data) {
									if (data === 'ok') {
										forget_resetCode(); // 倒计时     
									}
								}
							});
						}
					}
				});
		
	} else {
		$('#forget_tel').focus();
	}
}
// 验证手机号码
function checkPhone() {
	var phone = $('#tel').val();
	var pattern = /^1[0-9]{10}$/;
	isPhone = 1;
	if (phone == '') {
		$.alert('请输入手机号码');
		isPhone = 0;
		return;
	}
	if (!pattern.test(phone)) {
		$.alert('请输入正确的手机号码');
		isPhone = 0;
		return;
	}
}
// 倒计时
function resetCode() {
	var text = '秒后重新获取';
	$('#getIdentifying').hide();
	$('#timepass').html('60' + text);
	$('#timepass').show();
	var second = 60;
	var intervalID = null;
	intervalID = setInterval(function() {
		second -= 1;
		if (second > 0) {
			$('#timepass').html(second + text);
		} else {
			clearInterval(intervalID);
			$('#getIdentifying').show();
			$('#timepass').hide();
		}
	}, 1000);
}
//修改密码--倒计时
function forget_resetCode() {
	var text = '秒后重新获取';
	$('#forget_getIdentifying').hide();
	$('#forget_timepass').html('60' + text);  
	$('#forget_timepass').show();
	var second = 60;
	var intervalID = null;
	intervalID = setInterval(function() {
		second -= 1;
		if (second > 0) {
			$('#forget_timepass').html(second + text);
		} else {
			clearInterval(intervalID);
			$('#forget_getIdentifying').show();
			$('#forget_timepass').hide();
		}
	}, 1000);
}
$.init();