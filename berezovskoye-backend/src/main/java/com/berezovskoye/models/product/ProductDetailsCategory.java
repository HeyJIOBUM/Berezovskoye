package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
public class ProductDetailsCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String categoryName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_details_table_id")
    private ProductDetailsTable productDetailsTable;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER, mappedBy = "productDetailsCategory")
    private List<CategoryDetails> categoryDetails;

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        ProductDetailsCategory that = (ProductDetailsCategory) object;
        return Objects.equals(categoryName, that.categoryName) &&
                Objects.equals(productDetailsTable, that.productDetailsTable) &&
                Objects.equals(categoryDetails, that.categoryDetails);
    }

    @Override
    public String toString() {
        return "ProductDetailsCategory{" +
                "id=" + id +
                ", categoryName='" + categoryName + '\'' +
                ", categoryDetails=" + categoryDetails +
                '}';
    }
}
