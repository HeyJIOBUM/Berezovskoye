package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private String id;

    @Version
    private Integer version = 0;

    private boolean isVisible;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    private String imgUrl;

    private String packagingType;

    private String price;

    private String priceUrl;

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Product product = (Product) object;
        return Objects.equals(isVisible, product.isVisible) &&
                Objects.equals(name, product.name) &&
                Objects.equals(description, product.description) &&
                Objects.equals(packagingType, product.packagingType) &&
                Objects.equals(price, product.price);
    }

    public Product update(Product newProductData){
        Optional.of(newProductData.isVisible()).ifPresent(this::setVisible);
        Optional.ofNullable(newProductData.getName()).ifPresent(this::setName);
        Optional.ofNullable(newProductData.getDescription()).ifPresent(this::setDescription);
        //Optional.ofNullable(newProductData.getImgUrl()).ifPresent(this::setImgUrl);
        Optional.ofNullable(newProductData.getPackagingType()).ifPresent(this::setPackagingType);
        Optional.ofNullable(newProductData.getPrice()).ifPresent(this::setPrice);

        return this;
    }

}