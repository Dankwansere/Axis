package com.sans.axis.service;

import com.sans.axis.domain.User;

public interface IUserService {
	
	public User getUser(String id);
	
	public void createUser(User user);

}
