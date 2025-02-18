package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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
}