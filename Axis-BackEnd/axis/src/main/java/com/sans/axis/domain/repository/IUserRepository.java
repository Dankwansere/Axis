package com.sans.axis.domain.repository;
import org.springframework.data.repository.CrudRepository;

import com.sans.axis.domain.User;

public interface IUserRepository extends CrudRepository<User, Long> {
	
	

}
