package com.berezovskoye.models.product;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class ProductDetailsCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String categoryName;

    @OneToMany(mappedBy = "productDetailsCategory", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CategoryDetails> categoryDetails;
}
