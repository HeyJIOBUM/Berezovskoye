package com.berezovskoye.controllers;

import com.berezovskoye.dtos.news.NewsDto;
import com.berezovskoye.models.news.News;
import com.berezovskoye.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<NewsDto> addNews(@RequestBody NewsDto news){
        return newsService.addNews(NewsDto.fromNewsDto(news));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsDto> updateNews(
            @PathVariable int id,
            @RequestParam("product") String newNewsDataJson,
            @RequestParam("imgFile") MultipartFile imgFile) throws IOException {
        return newsService.updateNews(
                id,
                NewsDto.fromNewsDto(newNewsDataJson),
                imgFile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable int id){
        return newsService.deleteNews(id);
    }
}
