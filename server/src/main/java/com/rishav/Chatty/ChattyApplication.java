package com.rishav.Chatty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ChattyApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChattyApplication.class, args);
	}

}
