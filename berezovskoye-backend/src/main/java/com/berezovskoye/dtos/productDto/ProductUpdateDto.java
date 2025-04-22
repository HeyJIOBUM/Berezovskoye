package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.List;

@Data
public class ProductUpdateDto {
    private String name;
    private boolean isVisible;
    private String description;
    private String imgUrl;
    private List<String> packagingTypes;
    private List<String> qualityIndicators;
    private ProductDetailsTableDto productDetailsTable;

    public static ProductUpdateDto fromProduct(Product product) {

        ProductUpdateDto dto = new ProductUpdateDto();

        dto.setVisible(product.isVisible());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setImgUrl(product.getImgUrl());
        dto.setPackagingTypes(product.getPackagingTypes());
        dto.setQualityIndicators(product.getQualityIndicators());

        dto.setProductDetailsTable(
                ProductDetailsTableDto.fromProductDetailsTable(
                        product.getProductDetailsTable()
                ));

        return dto;
    }

    public static Product fromProductUpdateDto(ProductUpdateDto productDto) {

        Product product = new Product();

        product.setVisible(productDto.isVisible());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setImgUrl(productDto.getImgUrl());
        product.setPackagingTypes(productDto.getPackagingTypes());
        product.setQualityIndicators(productDto.getQualityIndicators());

        product.setProductDetailsTable(
                ProductDetailsTableDto.fromProductDetailsTableDto(
                        productDto.getProductDetailsTable()
                ));

        return product;
    }

    public static Product fromProductUpdateDto(String productUpdateDtoJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ProductUpdateDto productUpdateDto = objectMapper.readValue(productUpdateDtoJson, ProductUpdateDto.class);

            return fromProductUpdateDto(productUpdateDto);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Неверный формат JSON для ProductUpdateDto", e);
        }
    }

    public static List<ProductUpdateDto> fromProduct(List<Product> products) {
        return products.stream().map(ProductUpdateDto::fromProduct).toList();
    }

    public static List<Product> fromProductUpdateDto(List<ProductUpdateDto> products) {
        return products.stream().map(ProductUpdateDto::fromProductUpdateDto).toList();
    }
}
