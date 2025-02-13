package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.ProductDetailsCategory;
import lombok.Data;

import java.util.List;

@Data
public class ProductDetailsCategoryDto {
    private int id;
    private String categoryName;
    private List<String> categoryDetails;

    public static ProductDetailsCategoryDto fromProductDetailsCategory(
            ProductDetailsCategory productDetailsCategory){

        ProductDetailsCategoryDto productDetailsCategoryDto = new ProductDetailsCategoryDto();

        productDetailsCategoryDto.setCategoryName(productDetailsCategory.getCategoryName());
        productDetailsCategoryDto.setCategoryDetails(productDetailsCategory.getCategoryDetails());

        return productDetailsCategoryDto;
    }

    public static List<ProductDetailsCategoryDto> fromProductDetailsCategory(
            List<ProductDetailsCategory> productDetailsCategoryList){

        return productDetailsCategoryList.stream()
                .map(ProductDetailsCategoryDto::fromProductDetailsCategory).toList();
    }
}
