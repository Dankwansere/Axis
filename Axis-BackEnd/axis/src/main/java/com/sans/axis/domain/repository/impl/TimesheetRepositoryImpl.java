package com.sans.axis.domain.repository.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sans.axis.commons.DateCommon;
import com.sans.axis.domain.UserTimesheet;
import com.sans.axis.domain.repository.ITimesheetRepository;
@Repository
public class TimesheetRepositoryImpl implements ITimesheetRepository  {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	@Transactional
	public boolean createTimeWeek(UserTimesheet[] userTimesheet) {
		
		try {
			em.persist(userTimesheet[0]);
			return true;
		} catch (Exception e) {
			System.out.println("Could not persit: " + e.getMessage());
			return false;
		}
		
		
		
	}

	@Override
	public List<UserTimesheet> retrievePendingTimesheets(String userName) {
		List<UserTimesheet> pendingTimesheets = new ArrayList();
		String retrieveQuery = "SELECT * from timesheet u WHERE username = :userName AND status = 'PENDING'";
		Query query = this.em.createNativeQuery(retrieveQuery);
		query.setParameter("userName", userName);
		
		try {
			pendingTimesheets = query.getResultList();
		} catch (Exception e) {
			System.out.println("error retrieving pending timesheets: " + e.getMessage());
		}
		
		return pendingTimesheets;
	}

}
