package com.berezovskoye.utils;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

public class MultipartFileConverter {
    public static MultipartFile fromBase64(String base64Image){
        String base64Data = base64Image.split(",")[1];
        byte[] imageBytes = Base64.getDecoder().decode(base64Data);

        // Создаем MultipartFile из byte[]
        MultipartFile imgFile = new MockMultipartFile(
                "image.png", "image.png", "image/png", imageBytes
        );

        return imgFile;
    }
}
