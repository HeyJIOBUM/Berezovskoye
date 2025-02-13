package com.berezovskoye.services;

import com.berezovskoye.dtos.productDto.ProductDto;
import com.berezovskoye.exceptions.product.ProductNotFoundException;
import com.berezovskoye.models.product.Product;
import com.berezovskoye.repositories.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

@Slf4j
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public ResponseEntity<ProductDto> getProduct(int id) {
        Optional<Product> product = productRepository.findById(id);

        if(product.isEmpty()){
            String productNotFound = String.format(messages.getString("product.not.found"), id);
            log.error("{}{}", productNotFound, LocalDateTime.now());
            throw new ProductNotFoundException(productNotFound);
        }

        return new ResponseEntity<>(ProductDto.fromProduct(product.get()),
                HttpStatus.OK);
    }

    public ResponseEntity<List<ProductDto>> getProducts() {
        List<Product> products = productRepository.findAll();
        if(products.isEmpty()){
            log.warn("{}{}", messages.getString("products.empty"), LocalDateTime.now());
        }

        return new ResponseEntity<>(
                ProductDto.fromProduct(products),
                HttpStatus.OK);
    }
}
