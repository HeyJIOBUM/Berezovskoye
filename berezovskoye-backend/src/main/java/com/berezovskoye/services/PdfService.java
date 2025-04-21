package com.berezovskoye.services;

import com.berezovskoye.exceptions.errors.database.EntityNotFoundException;
import com.berezovskoye.exceptions.errors.utils.PdfGenerationException;
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

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
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
        Optional<Product> productOptional = productRepository.findById(productId);

        Product existingProduct = productOptional.orElseThrow(() ->
            EntityNotFoundException.throwAndLogNotFound("Product", productId+"")
        );

        ProductDetailsTable detailsTable = existingProduct.getProductDetailsTable();

        if(detailsTable == null){
            String missingFields = messages.getString("entity.missing.fields");
            String missingFieldsMessage = String.format(missingFields, "Product", productId, "detailsTable");
            log.error("{} {}", missingFieldsMessage, LocalDateTime.now());
            throw new EntityNotFoundException(missingFieldsMessage);
        }

        byte[] pdfBytes= PdfGenerator.generatePdf(detailsTable);;

        String generationFail = messages.getString("pdf.generation.failure");
        String generationFailMessage = String.format(generationFail, productId);
        log.error("{} {}", generationFailMessage, LocalDateTime.now());

//        try {
//            pdfBytes = PdfGenerator.generatePdf(detailsTable);
//        } catch (RuntimeException ex){
//            String generationFail = messages.getString("pdf.generation.failure");
//            String generationFailMessage = String.format(generationFail, productId);
//            log.error("{} {}", generationFailMessage, LocalDateTime.now());
//            throw new PdfGenerationException(generationFailMessage);
//        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/pdf");
        String filename = existingProduct.getName();

        String encodedFilename = URLEncoder.encode(filename, StandardCharsets.UTF_8).replaceAll("\\+", "%20");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFilename + PdfGenerator.FILE_TYPE);

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }


}
