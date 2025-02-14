package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.ProductDetailsCategory;
import lombok.Data;

import java.util.List;

@Data
public class ProductDetailsCategoryDto {
    private String categoryName;
    private List<CategoryDetailsDto> categoryDetails;

    public static ProductDetailsCategoryDto fromProductDetailsCategory(
            ProductDetailsCategory productDetailsCategory){

        ProductDetailsCategoryDto productDetailsCategoryDto = new ProductDetailsCategoryDto();

        productDetailsCategoryDto.setCategoryName(productDetailsCategory.getCategoryName());
        productDetailsCategoryDto.setCategoryDetails(
                CategoryDetailsDto.fromCategoryDetails(
                        productDetailsCategory.getCategoryDetails()
                )
        );

        return productDetailsCategoryDto;
    }

    public static List<ProductDetailsCategoryDto> fromProductDetailsCategory(
            List<ProductDetailsCategory> productDetailsCategoryList){

        return productDetailsCategoryList.stream()
                .map(ProductDetailsCategoryDto::fromProductDetailsCategory).toList();
    }
}
