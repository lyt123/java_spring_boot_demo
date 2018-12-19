package com.bjsxt.mapper;

import java.util.List;

import com.bjsxt.pojo.Users;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UsersMapper {
    @Insert("INSERT INTO USERS(NAME, AGE) VALUES(#{name}, #{age})")
    void insertUser(@Param("name") String name, @Param("age") Integer age);


//    void insertUser(Users users);
	
	List<Users> selectUsersAll();
	
	Users selectUsersById(Integer id);
	
	void updateUser(Users users);
	
	void deleteUserById(Integer id);
}
