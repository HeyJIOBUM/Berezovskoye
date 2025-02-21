package com.berezovskoye.services;

import com.berezovskoye.exceptions.errors.global.BadRequestException;
import com.berezovskoye.utils.ImageConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ResourceBundle;
import java.util.UUID;

@Slf4j
@Service
public class ImageService {

    @Value("${images.path}")
    private String uploadPath;

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public ResponseEntity<String> uploadImage(MultipartFile image) throws IOException, IllegalStateException {
        BadRequestException.checkObject("images.bad.request", image);

        try{
            Path path = Paths.get(uploadPath);
            if(Files.notExists(path)){
                Files.createDirectories(path);
            }

            String filename = UUID.randomUUID() + ImageConverter.OUTPUT_TYPE;
            Path savePath = Paths.get(uploadPath, filename);

            InputStream jpgImage = ImageConverter.convertToJpg(image);
            Files.copy(jpgImage, savePath);

            String imgUploaded = messages.getString("images.uploaded");
            log.info(String.format(imgUploaded, savePath), imgUploaded, LocalDateTime.now());
            return new ResponseEntity<>(filename, HttpStatus.OK);
        } catch (IOException e) {
            String imgSaveException = messages.getString("images.save.exception");
            log.error("{}{}", imgSaveException, LocalDateTime.now());
            throw new IOException(imgSaveException);
        } catch (IllegalArgumentException e) {
            log.error("{}{}", e, LocalDateTime.now());
            throw new IllegalStateException(e);
        }
    }
}
