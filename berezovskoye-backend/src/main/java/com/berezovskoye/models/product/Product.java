package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Version
    private Integer version = 0;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    private String imgUrl;

    @ElementCollection
    @CollectionTable(name = "product_packaging_types", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "packaging_type")
    private List<String> packagingTypes;

    @ElementCollection
    @CollectionTable(name = "product_quality_indicators", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "quality_indicator")
    private List<String> qualityIndicators;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_details_table_id", referencedColumnName = "id")
    private ProductDetailsTable productDetailsTable;
}