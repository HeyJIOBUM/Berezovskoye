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
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto product){
        return productService.addProduct(
                ProductDto.fromProductDto(product)
        );
    }

    @PostMapping
    public ResponseEntity<List<ProductDto>> addAllProducts(@RequestBody List<ProductDto> products){
        return productService.addAllProducts(
                ProductDto.fromProductDto(products)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable int id,
                                                    @RequestBody ProductDto newProductData){
        return productService.updateProduct(id,
                ProductDto.fromProductDto(newProductData)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        return productService.deleteProduct(id);
    }
}
