package com.berezovskoye.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${images.path}")
    private String uploadPath;

    public ResponseEntity<String> uploadImage(MultipartFile image){
        if(image == null){
            throw new RuntimeException();//TODO replace with handler + log
        }
        try{
            Path path = Paths.get(uploadPath);
            if(Files.notExists(path)){
                Files.createDirectories(path);
            }

            String filename = UUID.randomUUID() + ".jpg";
            Path savePath = Paths.get(uploadPath, filename);

            InputStream jpgImage = convertToJpg(image);
            Files.copy(jpgImage, savePath);

            //TODO log
            return new ResponseEntity<>(filename, HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);//TODO replace with handler + log
        }
    }

    public static InputStream convertToJpg(MultipartFile file) throws IOException {
        BufferedImage image = ImageIO.read(file.getInputStream());

        BufferedImage convertedImage = new BufferedImage(
                image.getWidth(),
                image.getHeight(),
                BufferedImage.TYPE_INT_RGB
        );
        convertedImage.createGraphics().drawImage(image, 0, 0, Color.WHITE, null);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        boolean canWrite = ImageIO.write(convertedImage, "jpg", outputStream);

        if (!canWrite) {
            throw new IllegalStateException("Failed to write image.");
        }

        return new ByteArrayInputStream(outputStream.toByteArray());
    }
}
