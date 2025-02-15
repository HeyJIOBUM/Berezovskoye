package com.berezovskoye.controllers;

import com.berezovskoye.dtos.productDto.ProductDto;
import com.berezovskoye.models.product.Product;
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
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public ResponseEntity<ProductDto> addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }

    @PostMapping
    public ResponseEntity<List<ProductDto>> addAllProducts(@RequestBody List<Product> products){
        return productService.addAllProducts(products);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable int id, @RequestBody Product newProductData){
        return productService.updateProduct(id, newProductData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        return productService.deleteProduct(id);
    }
}
