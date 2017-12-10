package com.sans.axis.boostrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.sans.axis.domain.User;
import com.sans.axis.domain.repository.IUserRepository;

@Component
public class AxisBootstrap implements ApplicationListener<ContextRefreshedEvent>{

	@Autowired
	private IUserRepository userRepository;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		initData();
		
	}
	
	private void initData() {
		
		

	}

}
