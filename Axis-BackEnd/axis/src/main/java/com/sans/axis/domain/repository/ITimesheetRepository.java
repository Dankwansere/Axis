package com.sans.axis.domain.repository;

import java.util.List;

import com.sans.axis.domain.UserTimesheet;

public interface ITimesheetRepository {

	public boolean createTimeWeek(UserTimesheet[] userTimesheet);
	
	public List<UserTimesheet> retrievePendingTimesheets(String userName);
}
