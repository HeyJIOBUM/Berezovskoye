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

    @ManyToOne
    @JoinColumn(name = "product_details_category_id")
    private ProductDetailsCategory productDetailsCategory;

    @ElementCollection
    private List<String> categoryDetails;
}
