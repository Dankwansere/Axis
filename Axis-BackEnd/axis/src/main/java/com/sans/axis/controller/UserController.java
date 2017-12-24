package com.sans.axis.controller;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sans.axis.domain.User;
import com.sans.axis.service.IUserService;
import com.sans.axis.service.impl.UserService;

@RestController
@RequestMapping(value = "/user/")
@CrossOrigin
public class UserController {
	
	@Autowired
	private IUserService userService;
	private User user;
	
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String getUser(@RequestBody User _user) {
		
		System.out.println("User name: " + _user.getUserName());
		
		this.user = userService.getUser(_user.getUserName(), _user.getPassWord());
		
		if(this.user == null) {
			return "false";
		}
		else {
			return "true";
		}
		
	}
	
	@RequestMapping(value = "/validate/{username}", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	public String validateUserName(@PathVariable(value = "username") String username) {
		
		System.out.println("Received username: " + username);
		
		boolean isUserExist = userService.validateUserName(username);
		
		if(isUserExist) {
			return "true";
		}
		else {
			return "false";
		}
		
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	public String create(@RequestBody User user) {	
		boolean isUserSaved = userService.createUser(user);
		
		if(isUserSaved) {
			return "success";
		}
		else {
			return "failed";
		}
		
	}
	

}
