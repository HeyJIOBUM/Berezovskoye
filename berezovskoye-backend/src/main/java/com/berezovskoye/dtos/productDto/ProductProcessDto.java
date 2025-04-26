package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.List;

@Data
public class ProductProcessDto {
    private String name;
    private boolean isVisible;
    private String description;
    private String imgUrl;
    private String packagingType;
    private String price;

    public static ProductProcessDto fromProduct(Product product) {

        ProductProcessDto dto = new ProductProcessDto();

        dto.setVisible(product.isVisible());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setImgUrl(product.getImgUrl());
        dto.setPackagingType(product.getPackagingType());
        dto.setPrice(product.getPrice());

        return dto;
    }

    public static Product fromProductUpdateDto(ProductProcessDto productDto) {

        Product product = new Product();

        product.setVisible(productDto.isVisible());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setImgUrl(productDto.getImgUrl());
        product.setPackagingType(productDto.getPackagingType());
        product.setPrice(product.getPrice());

        return product;
    }

    public static Product fromProductUpdateDto(String productUpdateDtoJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ProductProcessDto productUpdateDto = objectMapper.readValue(productUpdateDtoJson, ProductProcessDto.class);

            return fromProductUpdateDto(productUpdateDto);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Неверный формат JSON для ProductUpdateDto", e);
        }
    }

    public static List<ProductProcessDto> fromProduct(List<Product> products) {
        return products.stream().map(ProductProcessDto::fromProduct).toList();
    }

    public static List<Product> fromProductUpdateDto(List<ProductProcessDto> products) {
        return products.stream().map(ProductProcessDto::fromProductUpdateDto).toList();
    }
}
