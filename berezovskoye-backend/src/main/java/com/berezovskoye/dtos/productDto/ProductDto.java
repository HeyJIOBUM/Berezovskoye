package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private String id;
    private boolean isVisible;
    private String name;
    private String description;
    private String imgUrl;
    private String packagingType;
    private String price;
    private String priceUrl;

    public static ProductDto fromProduct(Product product) {

        ProductDto dto = new ProductDto();

        dto.setId(product.getId());
        dto.setVisible(product.isVisible());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setImgUrl(product.getImgUrl());
        dto.setPackagingType(product.getPackagingType());
        dto.setPrice(product.getPrice());
        dto.setPriceUrl(product.getPriceUrl());

        return dto;
    }

    public static Product fromProductDto(ProductDto productDto) {

        Product product = new Product();

        product.setId(productDto.getId());
        product.setVisible(productDto.isVisible());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setImgUrl(productDto.getImgUrl());
        product.setPackagingType(productDto.getPackagingType());
        product.setPrice(productDto.getPrice());
        product.setPriceUrl(productDto.getPriceUrl());

        return product;
    }

    public static List<ProductDto> fromProduct(List<Product> products) {
        return products.stream().map(ProductDto::fromProduct).toList();
    }

    public static List<Product> fromProductDto(List<ProductDto> products) {
        return products.stream().map(ProductDto::fromProductDto).toList();
    }
}
