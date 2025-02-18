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
                .title(news.getTitle())
                .imgUrl(news.getImgUrl())
                .postingDate(news.getPostingDate())
                .build();
    }

    public static News fromNewsDto(NewsDto newsDto){
        return News.builder()
                .id(newsDto.getId())
                .title(newsDto.getTitle())
                .imgUrl(newsDto.getImgUrl())
                .postingDate(newsDto.getPostingDate())
                .build();
    }

    public static List<NewsDto> fromNews(List<News> newsList){
        return newsList.stream().map(NewsDto::fromNews).toList();
    }

    public static List<News> fromNewsDto(List<NewsDto> newsDtoList){
        return newsDtoList.stream().map(NewsDto::fromNewsDto).toList();
    }
}
