package com.sans.axis.domain.repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.sans.axis.domain.User;



@Repository
public interface IUserRepository extends CrudRepository<User, Long> {
	
	

}
