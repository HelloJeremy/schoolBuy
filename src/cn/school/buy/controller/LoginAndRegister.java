package cn.school.buy.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cn.school.buy.po.Product;
import cn.school.buy.po.User;
import cn.school.buy.service.UserService;
import cn.school.buy.util.CallBackMessage;
import cn.school.buy.util.GetCurrentTime;
import cn.school.buy.util.GetRandomNumber;
import cn.school.buy.util.HttpSender;

/**
 * 
 * @ClassName:     LoginAndRegister.java
 * @Description:   TODO注册和登录的控制层 
 * 
 * @author         xujiacheng
 * @version        V1.0  
 * @Date           2017年3月23日 下午6:43:52
 */
@Controller
@RequestMapping("/webapp/loginAndRegister")
public class LoginAndRegister {
	@Autowired
	private UserService userService;
	
	//注册方法
	@RequestMapping("/register")
	@ResponseBody    
	public String register(@RequestBody User user,HttpSession session) {
		String url = "http://sms.253.com/msg/";// 应用地址
		String un = "N5676872";// 账号
		String pw = "clERDUIcs@17";// 密码
		String phone = user.getTel();// 手机号码，多个号码使用","分割
		String checkCode = GetRandomNumber.getRandom();
		String msg = "【253云通讯】您好，你的验证码是"+checkCode;// 短信内容          
		String rd = "1";// 是否需要状态报告，需要1，不需要0
		String ex = null;// 扩展码  

		
		try {
//			String returnString = HttpSender.batchSend(url, un, pw, phone, msg, rd, ex);
//			System.out.println(returnString);
			HttpSender.batchSend(url, un, pw, phone, msg, rd, ex);
			//TODO 验证码校验_将随机生成的验证码加入session中
			session.setAttribute("checkCode",checkCode);  
			return "ok";
			// TODO 处理返回值,参见HTTP协议文档
		} catch (Exception e) {
			// TODO 处理异常                           
			e.printStackTrace();
		}  
		return "error";
		
	}
	
	//校验手机号是否已经注册
	@RequestMapping("/findUserByTel")
	@ResponseBody    
	public List<User> findUserByTel(@RequestBody User user) {
		return userService.findUserByTel(user);
	}
	
	//校验手机号是否已经注册
	@RequestMapping("/registerOfInsertUser")
	@ResponseBody    
	public String registerOfInsertUser(@RequestBody User user,String identifying,HttpSession session) {
		//校验验证码
		String checkCode = (String) session.getAttribute("checkCode");
		if(!identifying.equals(checkCode)) {
			return "error";      
		}
		//清除session的checkCode属性
		session.removeAttribute("checkCode");    
		//判断电话号码是否已经注册
		List<User> users = userService.findUserByTel(user);
		if(users!=null&&users.size()>0) {
			return "telExist";                     
		}
		//TODO 新增用户
		//设置用户的头像路径
		user.setUserid(UUID.randomUUID().toString().replace("-",""));
		user.setHeadPath("mruserhead.png");  
		userService.saveUser(user);      
		return "ok";  
	}
	
	//修改密码
	@RequestMapping("/changeUserPassword")
	@ResponseBody    
	public CallBackMessage changeUserPassword(@RequestBody User user,String identifying,HttpSession session) {
		CallBackMessage callBackMessage = new CallBackMessage();
		//校验验证码
		String checkCode = (String) session.getAttribute("checkCode");
		if(!identifying.equals(checkCode)) {
			callBackMessage.setInfo("error");
			return callBackMessage;      
		}
		//清除session的checkCode属性
		session.removeAttribute("checkCode");    
		//判断电话号码是否已经注册
		List<User> users = userService.findUserByTel(user);
		if(users!=null&&users.size()>0) {
			//修改用户密码
			User existUser = users.get(0);
			existUser.setPassword(user.getPassword());
			userService.updateUserPhotoByPrimaryKey(existUser);   
			session.setAttribute("user",existUser); 
			callBackMessage.setInfo("ok");
			callBackMessage.setUser(existUser);        
			return callBackMessage;                          
		} else {
			callBackMessage.setInfo("noUser");
			return callBackMessage;
		}
	}
	
	//校验手机号是否已经登录
	@RequestMapping("/isLogin")
	@ResponseBody    
	public String isLogin(HttpSession session) {
		//判断用户是否登录
		User user = (User) session.getAttribute("user");
		if(user == null) {
			return "error";   
		} 
		return "ok";   
	}
	//登录
	@RequestMapping("/login")
	@ResponseBody    
	public CallBackMessage login(@RequestBody User user,HttpSession session) {
		CallBackMessage callBackMessage = new CallBackMessage();
		List<User> users = userService.findUserByTel(user);
		User user2 = null;
		if(users!=null && users.size()==1){
			user2 = users.get(0);
			String password_db = user2.getPassword();
			String password = user.getPassword();
			if(!password_db.equals(password)) {
				callBackMessage.setInfo("error");
				return callBackMessage;
			}
		} else {
			callBackMessage.setInfo("noUser");
			return callBackMessage;
		}
		session.setAttribute("user", user2);  
		callBackMessage.setInfo("ok");
		callBackMessage.setUser(user2);
		return callBackMessage;    
	}
	
		//退出登录
		@RequestMapping("/loginOut")
		@ResponseBody 
		public String loginOut(HttpSession session) {   
			//session失效
			session.invalidate();
			//重定向到商品查询页面
			return "loginoutSuccess";          
		}
		
		//更改头像
		@RequestMapping("/changeUserPhoto")
		@ResponseBody      
		public String uploadPic(@RequestParam(value = "userPhoto", required = false) MultipartFile pictureFile,
				HttpSession session) throws Exception {
			//获取登录的用户
			User user = (User) session.getAttribute("user");
			if (pictureFile != null && pictureFile.getOriginalFilename() != null
					&& pictureFile.getOriginalFilename().length() > 0) {
				// 图片上传成功后，将图片的地址写到数据库
				String filePath = "F:\\upload\\head\\";     
				// 上传文件原始名称
				String originalFilename = pictureFile.getOriginalFilename();
				// 新的图片名称
				String newFileName = UUID.randomUUID() + originalFilename.substring(originalFilename.lastIndexOf("."));
				// 新文件
				File file = new java.io.File(filePath + newFileName);

				// 将内存中的文件写入磁盘
				pictureFile.transferTo(file);                

				// 图片上传成功，将新图片地址写入数据库
				 user.setHeadPath(newFileName);
				 //更新用户
				 userService.updateUserPhotoByPrimaryKey(user);
			}
			return "ok";       
		}

}
