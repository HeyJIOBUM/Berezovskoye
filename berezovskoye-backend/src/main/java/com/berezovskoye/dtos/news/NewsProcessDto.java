package com.berezovskoye.dtos.news;

import com.berezovskoye.models.news.News;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NewsProcessDto {
    private String title;
    private String text;
    private String imgUrl;
    private String postingDate;

    public static NewsProcessDto fromNews(News news){
        return NewsProcessDto.builder()
                .title(news.getTitle())
                .text(news.getText())
                .imgUrl(news.getImgUrl())
                .postingDate(news.getPostingDate())
                .build();
    }

    public static News fromNewsDto(NewsProcessDto newsDto){
        return News.builder()
                .title(newsDto.getTitle())
                .text(newsDto.getText())
                .imgUrl(newsDto.getImgUrl())
                .postingDate(newsDto.getPostingDate())
                .build();
    }

    public static News fromNewsDto(String newsDtoJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            NewsProcessDto newsDto = objectMapper.readValue(newsDtoJson, NewsProcessDto.class);

            return fromNewsDto(newsDto);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Неверный формат JSON для NewsDto", e);
        }
    }

    public static List<NewsProcessDto> fromNews(List<News> newsList){
        return newsList.stream().map(NewsProcessDto::fromNews).toList();
    }

    public static List<News> fromNewsDto(List<NewsProcessDto> newsDtoList){
        return newsDtoList.stream().map(NewsProcessDto::fromNewsDto).toList();
    }
}

