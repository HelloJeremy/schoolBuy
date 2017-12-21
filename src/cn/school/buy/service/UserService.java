package cn.school.buy.service;

import java.util.List;

import cn.school.buy.po.User;

public interface UserService {
	//根据手机号查询用户
	public List<User> findUserByTel(User user);
	//新增用户
	public int saveUser(User user);  
	//更新用户的头像
	public int updateUserPhotoByPrimaryKey(User user);
}
