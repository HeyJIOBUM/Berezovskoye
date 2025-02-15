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

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "headers", joinColumns = @JoinColumn(name = "product_details_table_id"))
    @Column(name = "header")
    private List<String> header;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_details_table_id")
    private List<ProductDetailsCategory> productDetailsCategories;
}
