package com.sans.axis.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sans.axis.domain.UserTimesheet;
import com.sans.axis.domain.repository.ITimesheetRepository;
import com.sans.axis.service.ITimesheetService;

@Service
public class TimesheetService implements ITimesheetService {

	@Autowired
	ITimesheetRepository timesheetRepository;
	
	@Override
	public boolean createTimeWeek(UserTimesheet[] userTimesheet) {
		
		try {
			return this.timesheetRepository.createTimeWeek(userTimesheet);
		} catch (Exception e) {
			
			e.printStackTrace();
			return false;
			
		}
	}

	@Override
	public List<UserTimesheet> retrievePendingTimesheets(String userName) {
		
		try {
			return this.timesheetRepository.retrievePendingTimesheets(userName);
		} catch(Exception e) {
			System.out.println("retrievePendingTimesheets service error: " + e.getMessage());
			return null;
		}
	}

}
