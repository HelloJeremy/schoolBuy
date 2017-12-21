package cn.school.buy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.school.buy.mapper.UserMapper;
import cn.school.buy.po.User;
import cn.school.buy.po.UserExample;
import cn.school.buy.service.UserService;

public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	@Override
	public List<User> findUserByTel(User user) {
		UserExample UserExample = new UserExample();
		UserExample.or().andTelEqualTo(user.getTel());
		return userMapper.selectByExample(UserExample);  
	}

	@Override
	public int saveUser(User user) {
		return userMapper.insert(user);  
	}

	@Override
	public int updateUserPhotoByPrimaryKey(User user) {
		return userMapper.updateByPrimaryKey(user);  
	}

}
