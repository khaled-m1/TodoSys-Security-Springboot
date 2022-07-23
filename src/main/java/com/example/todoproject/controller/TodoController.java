package com.example.todoproject.controller;

import com.example.todoproject.DTO.Api;
import com.example.todoproject.model.MyUser;
import com.example.todoproject.model.Todo;
import com.example.todoproject.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/todo")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;
    private final Logger logger = LoggerFactory.getLogger(TodoController.class);

    @GetMapping
    public ResponseEntity<List<Todo>> getTodos(@AuthenticationPrincipal MyUser user){
        return ResponseEntity.status(HttpStatus.OK).body(todoService.getTodoByUserId(user.getUser_id()));
    }

    @PostMapping
    public ResponseEntity<Api> addTodo(@AuthenticationPrincipal MyUser user, @RequestBody @Valid Todo todo){
        todoService.addTodo(user,todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Api("New Todo Add :)",201));
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<Api> updateTodo(@AuthenticationPrincipal MyUser user,
                                          @PathVariable String todoId,
                                          @RequestBody @Valid Todo todo){
        todoService.updateTodo(user.getUser_id(),todoId,todo);
        return ResponseEntity.status(HttpStatus.OK).body(new Api("Todo Update :)",200));
    }
    @DeleteMapping("/{todoId}")
    public ResponseEntity<Api> deleteTodo(@AuthenticationPrincipal MyUser userId, @PathVariable String todoId){
        todoService.deleteTodo(userId.getUser_id(),todoId);
        logger.info("delete Controller After call service");
        return ResponseEntity.status(HttpStatus.OK).body(new Api("Todo Deleted :)",200));
    }
}
