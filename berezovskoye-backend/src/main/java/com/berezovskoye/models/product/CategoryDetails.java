package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
public class CategoryDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_details_category_id")
    private ProductDetailsCategory productDetailsCategory;

    @ElementCollection
    @CollectionTable(name = "category_details_items", joinColumns = @JoinColumn(name = "category_details_id"))
    @Column(name = "detail")
    private List<String> details;

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        CategoryDetails that = (CategoryDetails) object;
        return Objects.equals(id, that.id) &&
                Objects.equals(productDetailsCategory, that.productDetailsCategory) &&
                Objects.equals(details, that.details);
    }
}