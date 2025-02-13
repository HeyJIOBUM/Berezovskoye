package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private int id;
    private String name;
    private String description;
    private String imgUrl;
    private List<String> packagingTypes;
    private List<String> qualityIndicators;
    private ProductDetailsTableDto productDetailsTable;

    public static ProductDto fromProduct(Product product) {

        ProductDto dto = new ProductDto();

        dto.setId(product.getId());
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

    public static List<ProductDto> fromProduct(List<Product> products) {
        return products.stream().map(ProductDto::fromProduct).toList();
    }
}
