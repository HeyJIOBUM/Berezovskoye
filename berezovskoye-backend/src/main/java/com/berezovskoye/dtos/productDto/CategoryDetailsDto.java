package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.CategoryDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CategoryDetailsDto {
    private List<String> categoryDetails;

    public static CategoryDetailsDto fromCategoryDetails(CategoryDetails categoryDetails) {
        return new CategoryDetailsDto(categoryDetails.getCategoryDetails());
    }

    public static List<CategoryDetailsDto> fromCategoryDetails(List<CategoryDetails> categoryDetails) {
        return categoryDetails.stream().map(CategoryDetailsDto::fromCategoryDetails).toList();
    }
}
