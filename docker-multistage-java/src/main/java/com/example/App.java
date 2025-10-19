package com.example;

import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        // Set port and bind to all interfaces
        port(4567);
        ipAddress("0.0.0.0");
        
        // Simple health check endpoint
        get("/health", (req, res) -> {
            res.type("application/json");
            return "{\"status\":\"UP\"}";
        });
        
        // Main endpoint
        get("/", (req, res) -> "Hello from Java Minimal App!");
        
        // Log initialization
        System.out.println("Java minimal app running on http://0.0.0.0:4567");
    }
}