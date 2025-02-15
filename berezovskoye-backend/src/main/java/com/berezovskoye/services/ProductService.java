package com.berezovskoye.services;

import com.berezovskoye.dtos.productDto.ProductDto;
import com.berezovskoye.exceptions.product.BadCredentialsException;
import com.berezovskoye.exceptions.product.ProductNotFoundException;
import com.berezovskoye.models.product.Product;
import com.berezovskoye.models.product.ProductDetailsCategory;
import com.berezovskoye.models.product.ProductDetailsTable;
import com.berezovskoye.repositories.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
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

    @Autowired
    private ModelMapper modelMapper;

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

    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        if(products.isEmpty()){
            log.warn("{}{}", messages.getString("products.empty"), LocalDateTime.now());
        }

        return new ResponseEntity<>(
                ProductDto.fromProduct(products),
                HttpStatus.OK);
    }

    public ResponseEntity<ProductDto> addProduct(Product product) {
        //TODO handle adding to repo + log
        return new ResponseEntity<>(ProductDto.fromProduct(productRepository.save(product)), HttpStatus.OK);
    }

    public ResponseEntity<List<ProductDto>> addAllProducts(List<Product> products){
        //TODO handle adding to repo + log
        return new ResponseEntity<>(ProductDto.fromProduct(productRepository.saveAll(products)), HttpStatus.OK);
    }

    public ResponseEntity<ProductDto> updateProduct(int id, Product newProductData) {
        Optional<Product> productToUpdate = productRepository.findById(id);
        if(productToUpdate.isEmpty()){
            //TODO throw error missing product + log
        }

        Product existingProduct = productToUpdate.get();

        modelMapper.map(newProductData, existingProduct);
        updateProductDetails(existingProduct.getProductDetailsTable(), newProductData.getProductDetailsTable());

        productRepository.save(existingProduct);
        //TODO handle adding to repo + logs

        return new ResponseEntity<>(ProductDto.fromProduct(existingProduct), HttpStatus.OK);
    }

    private void updateProductDetails(ProductDetailsTable existingDetails, ProductDetailsTable newDetails) {
        if (newDetails != null) {
            modelMapper.map(newDetails, existingDetails);
            updateProductDetailsCategories(existingDetails.getProductDetailsCategories(), newDetails.getProductDetailsCategories());
        }
    }

    private void updateProductDetailsCategories(List<ProductDetailsCategory> existingCategories, List<ProductDetailsCategory> newCategories) {
        existingCategories.clear();
        if (newCategories != null) {
            existingCategories.addAll(newCategories);
        }
    }
    

    public ResponseEntity<String> deleteProduct(int id) {
        Optional<Product> productToDelete = productRepository.findById(id);
        if(productToDelete.isEmpty()){
            //TODO throw error missing product + log
        }

        productRepository.deleteById(id);
        //TODO handle adding to repo + logs

        return new ResponseEntity<>("Success", HttpStatus.OK); //TODO set message from .properties
    }
}
