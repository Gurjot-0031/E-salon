package com.jot.Esalon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.jot.Esalon.Repository")
@SpringBootApplication
public class ESalonApplication {

	public static void main(String[] args) {
		SpringApplication.run(ESalonApplication.class, args);
	}

}
