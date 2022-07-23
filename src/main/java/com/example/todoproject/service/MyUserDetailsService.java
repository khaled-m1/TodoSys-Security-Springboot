package com.example.todoproject.service;

import com.example.todoproject.model.MyUser;
import com.example.todoproject.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> optionalMyUser=userRepository.findMyUserByUsername(username);
        if (optionalMyUser.isEmpty()){
            throw  new UsernameNotFoundException("Username not Found");
        }
        return optionalMyUser.get();
    }
}
