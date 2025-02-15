package com.berezovskoye;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class BerezovskoyeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BerezovskoyeApplication.class, args);
	}

}
