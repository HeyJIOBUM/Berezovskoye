package com.berezovskoye.controllers;

import com.berezovskoye.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    ImageService imageService;

    @PostMapping("/upload/{filename}")
    public ResponseEntity<String> uploadImage(
            @RequestParam("image") MultipartFile image,
            @PathVariable String filename)
            throws IOException, IllegalStateException
    {
        return imageService.uploadImage(image, filename);
    }

    @DeleteMapping("/delete/{filename}")
    public ResponseEntity<String> deleteImage(@PathVariable("filename") String filename){
        return imageService.deleteImage(filename);
    }
}
