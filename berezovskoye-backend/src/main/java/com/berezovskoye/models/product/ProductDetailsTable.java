package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
public class ProductDetailsTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ElementCollection
    @CollectionTable(name = "product_details_headers", joinColumns = @JoinColumn(name = "product_details_table_id"))
    @Column(name = "header")
    private List<String> header;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER, mappedBy = "productDetailsTable")
    private List<ProductDetailsCategory> productDetailsCategories;

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        ProductDetailsTable that = (ProductDetailsTable) object;
        return Objects.equals(header, that.header) &&
                Objects.equals(productDetailsCategories, that.productDetailsCategories);
    }
}
