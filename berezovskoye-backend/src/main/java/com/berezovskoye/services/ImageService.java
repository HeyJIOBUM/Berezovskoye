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

    public ResponseEntity<String> uploadImage(MultipartFile image, String previousFile) throws IOException, IllegalStateException {
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

            if(previousFile != null){
                deleteImage(previousFile);
            }

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

    public ResponseEntity<String> deleteImage(String filename) {
        BadRequestException.checkObject("images.bad.filename", filename);

        final String logPrefix = "[File: " + filename + "] ";

        try {
            Path filePath = Paths.get(uploadPath, filename).normalize();

            if (!filePath.startsWith(Paths.get(uploadPath).normalize())) {
                String invalidPathMsg = messages.getString("images.invalid.path");
                log.error("{} {}Path traversal attempt detected. Tried path: {}",
                        logPrefix, invalidPathMsg, filePath);
                throw new SecurityException(invalidPathMsg);
            }

            if (Files.notExists(filePath)) {
                String notFoundMsg = messages.getString("images.not.found");
                log.warn("{} {}", logPrefix, notFoundMsg);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(notFoundMsg + ". File: " + filename);
            }

            Files.delete(filePath);

            String deleteSuccessMsg = messages.getString("images.deleted");
            log.info("{} {}", logPrefix, deleteSuccessMsg);
            return ResponseEntity.ok(deleteSuccessMsg + ". File: " + filename);

        }
        catch (SecurityException e) {
            log.error("{} Security violation: {}", logPrefix, e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage() + ". File: " + filename);
        } catch (IOException e) {
            String deleteErrorMsg = messages.getString("images.delete.error");
            log.error("{} {}: {}", logPrefix, deleteErrorMsg, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(deleteErrorMsg + ": " + e.getMessage() + ". File: " + filename);
        } catch (Exception e) {
            log.error("{} Unexpected error: {}", logPrefix, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(messages.getString("images.unexpected.error") + ". File: " + filename);
        }
    }
}
