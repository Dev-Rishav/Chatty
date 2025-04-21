package com.rishav.Chatty.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));

        try {
            // Test Cloudinary connection
            cloudinary.api().ping(ObjectUtils.emptyMap());
            System.out.println("✅ Cloudinary connected successfully.");
        } catch (Exception e) {
            System.err.println("❌ Cloudinary connection failed: " + e.getMessage());
        }

        return cloudinary;
    }
}
