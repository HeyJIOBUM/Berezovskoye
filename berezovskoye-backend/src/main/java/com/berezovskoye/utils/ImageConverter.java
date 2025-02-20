package com.berezovskoye.utils;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class ImageConverter {
    public final static String OUTPUT_TYPE = ".jpg";

    public static InputStream convertToJpg(MultipartFile file) throws IOException, IllegalStateException {
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
