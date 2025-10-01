package com.example.oblig3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class Oblig3Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        System.out.println("Starting MovieTickets Application...");
        try {
            SpringApplication.run(Oblig3Application.class, args);
            System.out.println("MovieTickets Application started successfully!");
        } catch (Exception e) {
            System.err.println("Failed to start MovieTickets Application: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

}
