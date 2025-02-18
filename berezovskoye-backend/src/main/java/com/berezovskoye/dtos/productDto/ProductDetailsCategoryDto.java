package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.CategoryDetails;
import com.berezovskoye.models.product.ProductDetailsCategory;
import com.berezovskoye.models.product.ProductDetailsTable;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProductDetailsCategoryDto {
    private String categoryName;
    private List<List<String>> categoryDetails;

    public static ProductDetailsCategoryDto fromProductDetailsCategory(
            ProductDetailsCategory productDetailsCategory){

        ProductDetailsCategoryDto productDetailsCategoryDto = new ProductDetailsCategoryDto();

        productDetailsCategoryDto.setCategoryName(productDetailsCategory.getCategoryName());

        List<List<String>> categoryDetailsDto = categoryDetailsToList(productDetailsCategory.getCategoryDetails());
        productDetailsCategoryDto.setCategoryDetails(categoryDetailsDto);

        return productDetailsCategoryDto;
    }

    public static List<ProductDetailsCategoryDto> fromProductDetailsCategory(
            List<ProductDetailsCategory> productDetailsCategoryList){

        return productDetailsCategoryList.stream()
                .map(ProductDetailsCategoryDto::fromProductDetailsCategory).toList();
    }

    private static List<List<String>> categoryDetailsToList(List<CategoryDetails> categoryDetails){
        List<List<String>> categoryDetailsList = new ArrayList<>();
        for(CategoryDetails currentDetails : categoryDetails){
            categoryDetailsList.add(currentDetails.getDetails());
        }

        return categoryDetailsList;
    }

    public static ProductDetailsCategory fromProductDetailsCategoryDto(
            ProductDetailsCategoryDto productDetailsCategoryDto,
            ProductDetailsTable productDetailsTable){

        ProductDetailsCategory productDetailsCategory = new ProductDetailsCategory();

        productDetailsCategory.setCategoryName(productDetailsCategoryDto.getCategoryName());
        productDetailsCategory.setProductDetailsTable(productDetailsTable);

        productDetailsCategory.setCategoryDetails(
                listToCategoryDetails(productDetailsCategoryDto.getCategoryDetails(), productDetailsCategory)
        );

        return productDetailsCategory;
    }

    private static List<CategoryDetails> listToCategoryDetails(
            List<List<String>> detailsCategoryDtoList,
            ProductDetailsCategory productDetailsCategory){

        List<CategoryDetails> categoryDetailsList = new ArrayList<>();

        for(List<String> currentCategoryDetails : detailsCategoryDtoList){
            CategoryDetails newCategoryDetails = new CategoryDetails();
            newCategoryDetails.setDetails(currentCategoryDetails);
            newCategoryDetails.setProductDetailsCategory(productDetailsCategory);
            categoryDetailsList.add(newCategoryDetails);
        }

        return categoryDetailsList;
    }

    public static List<ProductDetailsCategory> fromProductDetailsCategoryDto(
            List<ProductDetailsCategoryDto> productDetailsCategoryDtoList,
            ProductDetailsTable productDetailsTable){

        return productDetailsCategoryDtoList.stream()
                .map(p -> ProductDetailsCategoryDto.fromProductDetailsCategoryDto(p, productDetailsTable))
                .toList();
    }
}
