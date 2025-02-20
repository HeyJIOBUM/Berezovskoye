package com.berezovskoye.services;

import com.berezovskoye.models.product.Product;
import com.berezovskoye.models.product.ProductDetailsTable;
import com.berezovskoye.repositories.ProductRepository;
import com.berezovskoye.utils.PdfGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.ResourceBundle;

@Slf4j
@Service
public class PdfService {
    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Autowired
    private ProductRepository productRepository;

    @Cacheable(value = "pdf", key = "#productId")
    public ResponseEntity<byte[]> downloadPdf(int productId) {

        Optional<Product> desiredProduct = productRepository.findById(productId);
        if(desiredProduct.isEmpty()){
            throw new RuntimeException();//TODO handle + logs
        }

        Product currentProduct = desiredProduct.get();
        ProductDetailsTable detailsTable = currentProduct.getProductDetailsTable();
        if(detailsTable == null){
            throw new RuntimeException();//todo
        }
        byte[] pdfBytes = PdfGenerator.generatePdf(detailsTable);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/pdf");
        String filename = currentProduct.getName();

        String encodedFilename = URLEncoder.encode(filename, StandardCharsets.UTF_8).replaceAll("\\+", "%20");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFilename + PdfGenerator.FILE_TYPE);

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }


}
