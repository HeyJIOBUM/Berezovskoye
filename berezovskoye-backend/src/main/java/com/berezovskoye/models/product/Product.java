package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    private String imgUrl;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "packaging_types", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "packaging_type")
    private List<String> packagingTypes;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "quality_indicators", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "quality_indicator")
    private List<String> qualityIndicators;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_details_table_id")
    private ProductDetailsTable productDetailsTable;
}