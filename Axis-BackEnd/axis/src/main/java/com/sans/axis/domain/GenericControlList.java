package com.sans.axis.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="genericprojects")
public class GenericControlList {
	
	@Id
	@Column(name="idprojects")
	private int id;
	@Column(name="generic_name")
	private String genericName;
	@Column(name="generic_type")
	private String genericType;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGenericName() {
		return genericName;
	}
	public void setGenericName(String genericName) {
		this.genericName = genericName;
	}
	public String getGenericType() {
		return genericType;
	}
	public void setGenericType(String genericType) {
		this.genericType = genericType;
	}
	
	@Override
	public String toString() {
		return "GenericControlList [id=" + id + ", genericName=" + genericName + ", genericType=" + genericType + "]";
	}

}
