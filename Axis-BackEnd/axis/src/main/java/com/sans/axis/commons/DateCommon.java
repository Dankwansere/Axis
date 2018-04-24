package com.sans.axis.commons;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
public final class DateCommon {
	
	public static Date stringToDate(String dateString) {
		Date test;
		SimpleDateFormat dateFormat = new SimpleDateFormat("E, MMM dd yyyy");
		
		try {
			return test = dateFormat.parse(dateString);
		} catch (ParseException e) {
			System.out.println("Could not convert! " + e.getMessage());
			return null;
		}
		
		//dateFormat.parse
		
	}

}
