package com.example.todoproject.repository;

import com.example.todoproject.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo,String> {
    @Query("select  c from Todo c where c.myUser.user_id=?1")
    List<Todo> findAllByMyUser(String userId);



}
