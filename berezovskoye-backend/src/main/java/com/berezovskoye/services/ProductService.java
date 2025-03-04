package com.berezovskoye.services;

import com.berezovskoye.dtos.productDto.ProductDto;
import com.berezovskoye.exceptions.errors.database.EntityAbnormalBehaviorException;
import com.berezovskoye.exceptions.errors.database.EntityNotFoundException;
import com.berezovskoye.exceptions.errors.global.BadRequestException;
import com.berezovskoye.models.product.Product;
import com.berezovskoye.models.product.ProductDetailsCategory;
import com.berezovskoye.models.product.ProductDetailsTable;
import com.berezovskoye.repositories.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

@Slf4j
@Service
public class ProductService {

    private static final String MODEL_NAME = "Product";
    private static final String CACHE_NAME = "products";

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Cacheable(value = CACHE_NAME, key = "#id")
    public ResponseEntity<ProductDto> getProduct(int id) {
        Optional<Product> product = productRepository.findById(id);

        if(product.isEmpty()){
            throw EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id+"");
        }

        return new ResponseEntity<>(ProductDto.fromProduct(product.get()),
                HttpStatus.OK);
    }

    @Cacheable(value = CACHE_NAME)
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<Product> allProducts = productRepository.findAll();

        if(allProducts.isEmpty()){
            String empty = messages.getString("entities.empty");
            String emptyMessage = String.format(empty, MODEL_NAME);
            log.warn("{}{}", emptyMessage, LocalDateTime.now());
        }

        return new ResponseEntity<>(
                ProductDto.fromProduct(allProducts),
                HttpStatus.OK);
    }

    @Transactional
    @CacheEvict(value = { CACHE_NAME, "pdf" }, allEntries = true)
    public ResponseEntity<ProductDto> addProduct(Product product) {
        BadRequestException.checkObject("default.bad.request", product);

        if(product.getId() != null){
            throw BadRequestException.throwAndLogBadRequest("entity.wrong.key", MODEL_NAME);
        }

        Product addedProduct = productRepository.save(product);

        return logAndReturnObject("entity.saved", addedProduct);
    }

    @Transactional
    @CacheEvict(value = { CACHE_NAME, "pdf" }, allEntries = true)
    public ResponseEntity<ProductDto> updateProduct(int id, Product newProductData) {
        BadRequestException.checkObject("default.bad.request", newProductData);

        Optional<Product> productOptional = productRepository.findById(id);

        Product existingProduct = productOptional.orElseThrow(() ->
                EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id + "")
        );

        if(newProductData.equals(existingProduct)){
            String sameData = messages.getString("entity.same.data");
            String sameDataMessage = String.format(sameData, MODEL_NAME, existingProduct.getId());
            log.warn("{} {}", sameDataMessage, LocalDateTime.now());
            return new ResponseEntity<>(ProductDto.fromProduct(existingProduct), HttpStatus.OK);
        }

        Optional.ofNullable(newProductData.getName()).ifPresent(existingProduct::setName);
        Optional.ofNullable(newProductData.getDescription()).ifPresent(existingProduct::setDescription);
        Optional.ofNullable(newProductData.getImgUrl()).ifPresent(existingProduct::setImgUrl);

        Optional.ofNullable(newProductData.getPackagingTypes()).ifPresent(packaging -> {
            existingProduct.getPackagingTypes().clear();
            existingProduct.getPackagingTypes().addAll(packaging);
        });

        Optional.ofNullable(newProductData.getQualityIndicators()).ifPresent(quality -> {
            existingProduct.getQualityIndicators().clear();
            existingProduct.getQualityIndicators().addAll(quality);
        });

        Product updatedProduct = productRepository.save(existingProduct);

        if(!newProductData.equals(updatedProduct)){
            String notUpdated = messages.getString("entity.not.updated");
            String notUpdatedMessage = String.format(notUpdated, MODEL_NAME, existingProduct.getId());
            log.error("{} {}", notUpdatedMessage, LocalDateTime.now());
            throw new EntityAbnormalBehaviorException(notUpdatedMessage);
        }

        return logAndReturnObject("entity.updated", updatedProduct);
    }

    @CacheEvict(value = { CACHE_NAME, "pdf" }, allEntries = true)
    public ResponseEntity<String> deleteProduct(int id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if(productOptional.isEmpty()){
            throw EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id+"");
        }

        productRepository.deleteById(id);

        productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            throw EntityAbnormalBehaviorException.throwAndLogNotDeleted(MODEL_NAME, id);
        }

        return logAndReturnText("entity.deleted", id);
    }

    private ResponseEntity<String> logAndReturnText(String key, Integer id){
        String success = messages.getString(key);
        String successMessage = String.format(success, MODEL_NAME, id);
        log.info("{}{}", successMessage, LocalDateTime.now());

        return new ResponseEntity<>(successMessage,
                HttpStatus.OK);
    }

    private ResponseEntity<ProductDto> logAndReturnObject(String key, Product product){
        String success = messages.getString(key);
        String successMessage = String.format(success, MODEL_NAME, product.getId());
        log.info("{}{}", successMessage, LocalDateTime.now());

        return new ResponseEntity<>(ProductDto.fromProduct(product),
                HttpStatus.OK);
    }
}
