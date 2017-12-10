package com.sans.axis.controller;

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
	private String isUserValid = "isUserValid : true";
	
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String getUser(@RequestBody User user) {
		System.out.println("User name: " + user.getUserName());
		
		return isUserValid;
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	public void create(@RequestBody User user) {
		System.out.println("User name: " + user.getUserName());
		System.out.println("First name: " + user.getFirstName());
		System.out.println("Last name: " + user.getLastName());
		System.out.println("Email Add: " + user.getEmailAdd());
		System.out.println("Password: " + user.getPassWord());
		System.out.println("Gender: " + user.getGender());
		
		userService.createUser(user);
		
	}
	

}
