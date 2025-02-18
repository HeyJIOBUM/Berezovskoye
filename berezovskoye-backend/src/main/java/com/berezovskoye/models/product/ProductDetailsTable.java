package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "productDetailsTable")
    private List<ProductDetailsCategory> productDetailsCategories;
}
