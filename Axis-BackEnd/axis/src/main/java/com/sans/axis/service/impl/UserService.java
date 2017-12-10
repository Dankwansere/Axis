package com.sans.axis.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sans.axis.domain.User;
import com.sans.axis.domain.repository.IUserRepository;
import com.sans.axis.service.IUserService;

@Service
public class UserService implements IUserService {

	@Autowired
	private IUserRepository userRepository;
	
	@Override
	public User getUser(String id) {
		
		Long _id = Long.parseLong(id);
		
		User user = userRepository.findOne(_id);
		
		return user;
	}
	
	@Override
	public void createUser(User user) {
		
		try {
			userRepository.save(user);
		}
		catch(Exception ex) {
			System.out.println("Error: " + ex.getMessage());
		}
	}

}
