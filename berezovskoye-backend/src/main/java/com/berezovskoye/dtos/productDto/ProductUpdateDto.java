package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductUpdateDto {
    private String name;
    private String description;
    private String imgUrl;
    private List<String> packagingTypes;
    private List<String> qualityIndicators;
    private ProductDetailsTableDto productDetailsTable;

    public static ProductUpdateDto fromProduct(Product product) {

        ProductUpdateDto dto = new ProductUpdateDto();

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

    public static List<ProductUpdateDto> fromProduct(List<Product> products) {
        return products.stream().map(ProductUpdateDto::fromProduct).toList();
    }

    public static List<Product> fromProductDto(List<ProductUpdateDto> products) {
        return products.stream().map(ProductUpdateDto::fromProductUpdateDto).toList();
    }
}
