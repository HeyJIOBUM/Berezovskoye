package com.berezovskoye.dtos.news;

import com.berezovskoye.models.news.News;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NewsDto {
    private int id;
    private String title;
    private String text;
    private String imgUrl;
    private String postingDate;

    public static NewsDto fromNews(News news){
        return NewsDto.builder()
                .id(news.getId())
                .build();
    }

    public static List<NewsDto> fromNews(List<News> newsList){
        return newsList.stream().map(NewsDto::fromNews).toList();
    }
}
