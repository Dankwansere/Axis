package com.sans.axis.service;

import com.sans.axis.domain.User;

public interface IUserService {
	
	
	public User getUser(String userName, String password);
	
	public boolean createUser(User user);
	
	public boolean validateUserName(String username);

}
