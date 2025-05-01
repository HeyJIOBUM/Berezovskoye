package com.berezovskoye.controllers;

import com.berezovskoye.dtos.productDto.ProductDto;
import com.berezovskoye.dtos.productDto.ProductProcessDto;
import com.berezovskoye.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable String id){
        return productService.getProduct(id);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto product){
        return productService.addProduct(
                ProductDto.fromProductDto(product)
        );
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductProcessDto> updateProduct(
            @PathVariable String id,
            @RequestPart(value = "imgFile", required = false) @Valid MultipartFile image,
            @RequestPart(value = "price", required = false) @Valid MultipartFile priceXls,
            @RequestPart("product") @Valid String newProductDataJson) throws IOException {
        return productService.updateProduct(id,
                image,
                priceXls,
                ProductProcessDto.fromProductUpdateDto(newProductDataJson)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id){
        return productService.deleteProduct(id);
    }
}
