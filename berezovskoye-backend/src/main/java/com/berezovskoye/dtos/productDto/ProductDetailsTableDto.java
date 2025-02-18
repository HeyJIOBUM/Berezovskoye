package com.berezovskoye.dtos.productDto;

import com.berezovskoye.models.product.ProductDetailsTable;
import lombok.Data;

import java.util.List;

@Data
public class ProductDetailsTableDto {
    private List<String> header;
    private List<ProductDetailsCategoryDto> categories;

    public static ProductDetailsTableDto fromProductDetailsTable(
            ProductDetailsTable productDetailsTable){

        ProductDetailsTableDto productDetailsTableDto = new ProductDetailsTableDto();

        productDetailsTableDto.setHeader(productDetailsTable.getHeader());

        productDetailsTableDto.setCategories(
                ProductDetailsCategoryDto.fromProductDetailsCategory(
                        productDetailsTable.getProductDetailsCategories()
                ));

        return productDetailsTableDto;
    }

    public static ProductDetailsTable fromProductDetailsTableDto(
            ProductDetailsTableDto detailsTableDto){

        ProductDetailsTable productDetailsTable = new ProductDetailsTable();

        productDetailsTable.setHeader(detailsTableDto.getHeader());

        productDetailsTable.setProductDetailsCategories(
                ProductDetailsCategoryDto.fromProductDetailsCategoryDto(
                        detailsTableDto.getCategories(),
                        productDetailsTable
                ));

        return productDetailsTable;
    }
}
