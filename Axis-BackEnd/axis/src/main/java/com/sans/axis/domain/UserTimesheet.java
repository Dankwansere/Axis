package com.sans.axis.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="timesheet")
public class UserTimesheet  {
	
	@Id
	@Column(name = "timeweek")
	private Date week;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "project")
	private String project;
	
	@Column(name = "activity")
	private String activity;
	
	@Column(name = "category")
	private String category;
	
	@Column(name = "day_mon")
	private double dayMon;
	
	@Column(name = "day_tue")
	private double dayTue;
	
	@Column(name = "day_wed")
	private double dayWed;
	
	@Column(name = "day_thu")
	private double dayThu;
	
	@Column(name = "day_fri")
	private double dayFri;
	
	@Column(name = "day_sat")
	private double daySat;
	
	@Column(name = "day_sun")
	private double daySun;
	
	@Column(name = "total")
	private double total;
	
	@Column(name = "status")
	private String status;
	
	public UserTimesheet() {}
	

	public Date getWeek() {
		return week;
	}

	public void setWeek(Date week) {
		this.week = week;
	}
	
	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}
	public String getActivity() {
		return activity;
	}
	public void setActivity(String activity) {
		this.activity = activity;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public double getDayMon() {
		return dayMon;
	}
	public void setDayMon(double dayMon) {
		this.dayMon = dayMon;
	}
	public double getDayTue() {
		return dayTue;
	}
	public void setDayTue(double dayTue) {
		this.dayTue = dayTue;
	}
	
	public double getDayWed() {
		return dayWed;
	}

	public void setDayWed(double dayWed) {
		this.dayWed = dayWed;
	}
	
	public double getDayThu() {
		return dayThu;
	}
	public void setDayThu(double dayThu) {
		this.dayThu = dayThu;
	}
	public double getDayFri() {
		return dayFri;
	}
	public void setDayFri(double dayFri) {
		this.dayFri = dayFri;
	}
	public double getDaySat() {
		return daySat;
	}
	public void setDaySat(double daySat) {
		this.daySat = daySat;
	}
	public double getDaySun() {
		return daySun;
	}
	public void setDaySun(double daySun) {
		this.daySun = daySun;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
