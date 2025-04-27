package com.berezovskoye.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.UUID;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    @Value("${images.path}")
    private String imagesPath;

    @Value("${xls.path}")
    private String xlsPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/**")
                .addResourceLocations("file:" + imagesPath + "/");

        registry.addResourceHandler("/xls/**")
                .addResourceLocations("file:" + xlsPath + "/");
    }
}