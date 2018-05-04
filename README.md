# Axis
HR management system

NOTE:

Front End: Angular
  - Please use "npm install" command to downlaod all required dependencies 
  - If "npm install" command fails, please check if you are using the latest npm and node.
  
Back End: Spring Boot/MVC


Database : MySQL
  - execute axis_user.sql file to create user table
  - User table requires the following columns:
     `id` bigint(20) NOT NULL AUTO_INCREMENT,
     `user_name` varchar(45) DEFAULT NULL,
     `first_name` varchar(45) DEFAULT NULL,
      `last_name` varchar(45) DEFAULT NULL,
      `email_add` varchar(100) DEFAULT NULL,
      `password` varchar(45) DEFAULT NULL,
     `gender` varchar(7) DEFAULT NULL,
      PRIMARY KEY (`id`)
      

Date: Feb 15 2018
- Axis has been upgraded to Angular 5
- please see package.json file to see requirements 
 
