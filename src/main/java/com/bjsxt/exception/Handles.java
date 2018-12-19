package com.bjsxt.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class Handles {
    @ExceptionHandler(value=Exception.class)
    public Object nullPointerExceptionHandler(Exception ex){

        if(ex instanceof ArithmeticException){
            System.out.println("eeeee");
//            String[] th_map = new String[]{"sdf", "sdfjk0"};

            return "jsdkf";

        }

        if(ex instanceof NullPointerException){
            System.out.println("efsdeeee");

        }
        return "jskdl";
    }
}
