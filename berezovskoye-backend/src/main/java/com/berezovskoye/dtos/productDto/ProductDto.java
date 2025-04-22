package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private String uid;
    private boolean isVisible;
    private String name;
    private String description;
    private String imgUrl;
    private List<String> packagingTypes;
    private List<String> qualityIndicators;
    private ProductDetailsTableDto productDetailsTable;

    public static ProductDto fromProduct(Product product) {

        ProductDto dto = new ProductDto();

        dto.setUid(product.getUid());
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

    public static Product fromProductDto(ProductDto productDto) {

        Product product = new Product();

        product.setUid(productDto.getUid());
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

    public static List<ProductDto> fromProduct(List<Product> products) {
        return products.stream().map(ProductDto::fromProduct).toList();
    }

    public static List<Product> fromProductDto(List<ProductDto> products) {
        return products.stream().map(ProductDto::fromProductDto).toList();
    }
}
