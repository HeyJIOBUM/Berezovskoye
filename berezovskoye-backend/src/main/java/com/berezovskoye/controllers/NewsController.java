package com.berezovskoye.controllers;

import com.berezovskoye.dtos.news.NewsDto;
import com.berezovskoye.dtos.news.NewsProcessDto;
import com.berezovskoye.services.NewsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/{id}")
    public ResponseEntity<NewsDto> getNews(@PathVariable int id){
        return newsService.getNews(id);
    }

    @GetMapping
    public ResponseEntity<List<NewsDto>> getAllNews(){
        return newsService.getAllNews();
    }

    @PostMapping
    public ResponseEntity<NewsProcessDto> addNews(
            //@RequestParam("news") String newsDataJson,
            @RequestPart("news") @Valid NewsProcessDto newsDto,
            @RequestPart(value = "imgFile", required = false) @Valid MultipartFile imgFile) throws IOException {
        return newsService.addNews(NewsProcessDto.fromNewsDto(newsDto), imgFile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsProcessDto> updateNews(
            @PathVariable int id,
            @RequestPart("news") @Valid NewsProcessDto newsDto,
            @RequestPart(value = "imgFile", required = false) @Valid MultipartFile imgFile) throws IOException {
        return newsService.updateNews(
                id,
                NewsProcessDto.fromNewsDto(newsDto),
                imgFile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable int id){
        return newsService.deleteNews(id);
    }
}
