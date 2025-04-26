package com.berezovskoye.models.news;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Objects;
import java.util.Optional;

@Data
@Entity
@Builder
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
    private String postingDate;

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        News news = (News) object;
        return Objects.equals(title, news.title) && Objects.equals(text, news.text) && Objects.equals(imgUrl, news.imgUrl) && Objects.equals(postingDate, news.postingDate);
    }

    public News update(News newNewsData){
        Optional.ofNullable(newNewsData.getTitle()).ifPresent(this::setTitle);
        Optional.ofNullable(newNewsData.getText()).ifPresent(this::setText);
        Optional.ofNullable(newNewsData.getImgUrl()).ifPresent(this::setImgUrl);
        Optional.ofNullable(newNewsData.getPostingDate()).ifPresent(this::setPostingDate);

        return this;
    }
}
