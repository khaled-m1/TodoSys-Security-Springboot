package com.example.todoproject.repository;

import com.example.todoproject.model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<MyUser,String> {
    Optional<MyUser> findMyUserByUsername(String username);
}
