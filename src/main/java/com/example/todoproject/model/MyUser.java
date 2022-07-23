package com.example.todoproject.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
public class MyUser implements UserDetails {
    @Id
    private String user_id = UUID.randomUUID().toString().toLowerCase();
    @NotNull(message = "Username is required")@Column(unique = true)
    private String username;
    @NotNull(message = "Password is required")  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @NotNull(message = "Phone is required")
    @Column(unique = true) @Pattern(regexp = "05[^12A-Za-z!@#$%^&*_-]\\d{7}", message = "Phone number must be 10 digits long and starts with 05 followed by any number except 2 or 1")
    private String phone;
    private String role;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "myUser",fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Todo> todos;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
