package com.berezovskoye.dtos.news;

import com.berezovskoye.models.news.News;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NewsDto {
    private String title;
    private String text;
    private String imgUrl;
    private String postingDate;

    public static NewsDto fromNews(News news){
        return NewsDto.builder()
                .title(news.getTitle())
                .imgUrl(news.getImgUrl())
                .postingDate(news.getPostingDate())
                .build();
    }

    public static News fromNewsDto(NewsDto newsDto){
        return News.builder()
                .title(newsDto.getTitle())
                .imgUrl(newsDto.getImgUrl())
                .postingDate(newsDto.getPostingDate())
                .build();
    }

    public static News fromNewsDto(String newsDtoJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            NewsDto newsDto = objectMapper.readValue(newsDtoJson, NewsDto.class);

            return fromNewsDto(newsDto);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Неверный формат JSON для NewsDto", e);
        }
    }

    public static List<NewsDto> fromNews(List<News> newsList){
        return newsList.stream().map(NewsDto::fromNews).toList();
    }

    public static List<News> fromNewsDto(List<NewsDto> newsDtoList){
        return newsDtoList.stream().map(NewsDto::fromNewsDto).toList();
    }
}
