package com.berezovskoye.services;

import com.berezovskoye.dtos.productDto.ProductDto;
import com.berezovskoye.dtos.productDto.ProductProcessDto;
import com.berezovskoye.exceptions.errors.database.EntityAbnormalBehaviorException;
import com.berezovskoye.exceptions.errors.database.EntityNotFoundException;
import com.berezovskoye.exceptions.errors.global.BadRequestException;
import com.berezovskoye.models.product.Product;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    private ImageService imageService;

    @Autowired
    private XlsService xlsService;

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Cacheable(value = CACHE_NAME, key = "#id")
    public ResponseEntity<ProductDto> getProduct(String id) {
        Optional<Product> product = productRepository.findById(id);

        if(product.isEmpty()){
            throw EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id);
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

        Product addedProduct = productRepository.save(product);

        return logAndReturnProduct("entity.saved", addedProduct);
    }

    @Transactional
    @CacheEvict(value = { CACHE_NAME, "pdf" }, allEntries = true)
    public ResponseEntity<ProductProcessDto> updateProduct(
            String id,
            MultipartFile image,
            MultipartFile priceXls,
            Product newProductData) throws IOException
    {
        BadRequestException.checkObject("default.bad.request", newProductData);

        String newImageName = null;
        if(image != null){
            newImageName = imageService.uploadImage(image, newProductData.getImgUrl()).getBody();
            newProductData.setImgUrl(newImageName);
        }

        String newXmlName = null;
        if(priceXls != null){
            newXmlName = xlsService.uploadXml(priceXls, newProductData, newProductData.getPriceUrl()).getBody();
            newProductData.setPriceUrl(newXmlName);
        }

        Optional<Product> productOptional = productRepository.findById(id);

        Product existingProduct = productOptional.orElseThrow(() ->
                EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id)
        );

        if(newProductData.equals(existingProduct)){
            String sameData = messages.getString("entity.same.data");
            String sameDataMessage = String.format(sameData, MODEL_NAME, existingProduct.getId());
            log.warn("{} {}", sameDataMessage, LocalDateTime.now());
            return new ResponseEntity<>(ProductProcessDto.fromProduct(existingProduct), HttpStatus.OK);
        }

        existingProduct.update(newProductData);
        Product updatedProduct = productRepository.save(existingProduct);

        if(!existingProduct.equals(updatedProduct)){
            String notUpdated = messages.getString("entity.not.updated");
            String notUpdatedMessage = String.format(notUpdated, MODEL_NAME, existingProduct.getId());
            log.error("{} {}", notUpdatedMessage, LocalDateTime.now());
            if(image != null){
                imageService.deleteImage(newImageName);
            }
            if(priceXls != null){
                xlsService.deleteXml(newXmlName);
            }
            throw new EntityAbnormalBehaviorException(notUpdatedMessage);
        }

        return logAndReturnUpdatedProduct("entity.updated", updatedProduct);
    }

    @CacheEvict(value = { CACHE_NAME, "pdf" }, allEntries = true)
    public ResponseEntity<String> deleteProduct(String id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if(productOptional.isEmpty()){
            throw EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id);
        }

        String imageName = productOptional.get().getImgUrl();
        String priceFilename = productOptional.get().getPriceUrl();

        productRepository.deleteById(id);

        productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            throw EntityAbnormalBehaviorException.throwAndLogNotDeleted(MODEL_NAME, id);
        }

        if(imageName != null){
            imageService.deleteImage(imageName);
        }

        if(priceFilename != null){
            xlsService.deleteXml(priceFilename);
        }

        return logAndReturnText("entity.deleted", id);
    }

    private ResponseEntity<String> logAndReturnText(String key, String id){
        String success = messages.getString(key);
        String successMessage = String.format(success, MODEL_NAME, id);
        log.info("{}{}", successMessage, LocalDateTime.now());

        return new ResponseEntity<>(successMessage,
                HttpStatus.OK);
    }

    private ResponseEntity<ProductDto> logAndReturnProduct(String key, Product product){
        String success = messages.getString(key);
        String successMessage = String.format(success, MODEL_NAME, product.getId());
        log.info("{}{}", successMessage, LocalDateTime.now());

        return new ResponseEntity<>(ProductDto.fromProduct(product),
                HttpStatus.OK);
    }

    private ResponseEntity<ProductProcessDto> logAndReturnUpdatedProduct(String key, Product product){
        String success = messages.getString(key);
        String successMessage = String.format(success, MODEL_NAME, product.getId());
        log.info("{}{}", successMessage, LocalDateTime.now());

        return new ResponseEntity<>(ProductProcessDto.fromProduct(product),
                HttpStatus.OK);
    }
}
