package com.sans.axis.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sans.axis.domain.User;
import com.sans.axis.domain.repository.IUserCustomRepository;
import com.sans.axis.service.IUserService;

@Service
public class UserService implements IUserService  {

	@Autowired
	private IUserCustomRepository customUserRepository;
	
	
	@Override
	public User getUser(String userName, String passWord) {
		User user = customUserRepository.getUser(userName, passWord);	
		if(user != null) {
			return user;
		}
		else {
			System.out.println("Unable to find user: " + userName);
			return null;
		}
	}
	
	@Override
	public boolean validateUserName(String username) {
		return customUserRepository.validateUserName(username);
	}
	
	
	@Override
	public boolean createUser(User user) {
		return customUserRepository.createUser(user);
	}

}
