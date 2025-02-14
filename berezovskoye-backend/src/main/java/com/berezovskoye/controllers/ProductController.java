package com.berezovskoye.controllers;

import com.berezovskoye.dtos.productDto.ProductDto;
import com.berezovskoye.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable int id){
        return productService.getProduct(id);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts(){
        return productService.getProducts();
    }

    @PostMapping
    public String send(){
        return "hi";
    }
}
