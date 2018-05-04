package com.sans.axis.domain.repository.impl;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.queryParam;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sans.axis.domain.GenericControlList;
import com.sans.axis.domain.User;
import com.sans.axis.domain.repository.IGenericControlListRepository;
import com.sans.axis.domain.repository.IUserCustomRepository;
import com.sans.axis.domain.repository.IUserRepository;

@Repository
public class UserRepositoryImpl implements IUserCustomRepository {

	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private IUserRepository userRepository; 
	
	@Autowired
	private IGenericControlListRepository genericControlListRepository;
	
	@Override
	public User getUser(String userName, String passWord) {
		User user;
		Query query = em.createQuery("SELECT u from User u WHERE userName = :userName AND passWord = :passWord");
		query.setParameter("userName", userName);
		query.setParameter("passWord", passWord);
		
		try {
			user = (User) query.getSingleResult();
			return user;
		} 
		catch (Exception e) {
			
			System.out.println("Unable to find user: " + e.getMessage());
			return null;
		}
	}

	public ArrayList<GenericControlList> getUserProjectList() {
		
		
		ArrayList<GenericControlList> genControlList = null;
		
		try {
			Query query = em.createQuery("SELECT gp from GenericControlList gp WHERE genericType = :genericType");
			query.setParameter("genericType", "timesheet");
			genControlList = (ArrayList<GenericControlList>) query.getResultList();
		} catch (Exception ex) {
			System.out.println("Query execution error: " + ex.getMessage());
		}
		
		return genControlList;
	}
	
	
	@Override
	public boolean validateUserName(String username) {
		Query query = em.createQuery("SELECT userName from User u WHERE userName = :username");
		query.setParameter("username", username);
		
		try {
			List<User> result = query.getResultList();
			
			if(result.size() == 0) {
				return false;
			}
			else {
				return true;
			}
		}
		catch (Exception ex) {
			System.out.println("Something went wrong searching for user: " + ex.getMessage());
			return false;
		}
	}

	@Override
	public boolean createUser(User user) {
		try {
			userRepository.save(user);
			return true;
		}
		catch(Exception ex) {
			System.out.println("Error: " + ex.getMessage());
			return false;
		}
	}

}
