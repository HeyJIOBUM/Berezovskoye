package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.ProductDetailsTable;
import lombok.Data;

import java.util.List;

@Data
public class ProductDetailsTableDto {
    private List<String> header;
    private List<ProductDetailsCategoryDto> productDetailsCategories;

    public static ProductDetailsTableDto fromProductDetailsTable(
            ProductDetailsTable productDetailsTable){

        ProductDetailsTableDto productDetailsTableDto = new ProductDetailsTableDto();

        productDetailsTableDto.setHeader(productDetailsTable.getHeader());

        productDetailsTableDto.setProductDetailsCategories(
                ProductDetailsCategoryDto.fromProductDetailsCategory(
                        productDetailsTable.getProductDetailsCategories()
                ));

        return productDetailsTableDto;
    }
}
