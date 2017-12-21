package cn.school.buy.util;

import cn.school.buy.po.User;

/**
 * @ClassName:     CallBackMessage.java
 * @Description:   TODO(进行异步请求返回的信息) 
 * 
 * @author         xujiacheng
 * @version        V1.0  
 * @Date           2017年4月8日 上午11:18:24
 */
public class CallBackMessage {
	private User user;
	private String info;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
}
