package com.example.todoproject.service;

import com.example.todoproject.exceptions.ApiException;
import com.example.todoproject.model.MyUser;
import com.example.todoproject.model.Todo;
import com.example.todoproject.repository.TodoRepository;


import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;
    private final Logger logger = LoggerFactory.getLogger(TodoService.class);


    public List<Todo> getTodoByUserId(String userId) {
        List<Todo> todos = todoRepository.findAllByMyUser(userId);
        return todos;
    }
    public void addTodo(MyUser user, Todo todo) {
        todo.setMyUser(user);
        todoRepository.save(todo);
    }
    public void updateTodo(String userId, String todoId, Todo todo) {
        Todo updateTodo = todoRepository.findById(todoId).orElseThrow(()-> new ApiException("There is not Todo with this id"));
        if (!updateTodo.getMyUser().getUser_id().equals(userId)){
            throw new ApiException("You don't own this Todo to update it !");
        }
        updateTodo.setMessage(todo.getMessage());
        todoRepository.save(updateTodo);
    }

    public void deleteTodo(String userId, String todoId) {
        Todo deleteTodo=todoRepository.findById(todoId).orElseThrow(()-> new ApiException("There is not Todo with this id"));
        if (!deleteTodo.getMyUser().getUser_id().equals(userId)){
            throw new ApiException("Yoy don't own this Todo to delete it !");
        }
        todoRepository.delete(deleteTodo);
    }
}
