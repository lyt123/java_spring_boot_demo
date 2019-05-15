package com.bjsxt.controller;//package com.bjsxt.controller;

import com.bjsxt.pojo.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * SpringBoot整合jsp
 *
 *
 */
@RestController
public class TestController {
	/*
	 * 处理请求，产生数据
	 */
	@RequestMapping("/ss")
	public ResponseEntity showUser(Model model){
		return new ResponseEntity(
		    new HashMap<String, String>(){
                {
                    put("heh", "jsdkf");
                    put("sfheh", "jsdkf");
                }
            }, HttpStatus.OK
        );
	}
}
