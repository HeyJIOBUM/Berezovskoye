package com.berezovskoye.services;

import com.berezovskoye.dtos.news.NewsDto;
import com.berezovskoye.models.news.News;
import com.berezovskoye.models.product.Product;
import com.berezovskoye.models.users.SystemUser;
import com.berezovskoye.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Cacheable(value = "news", key = "#id")
    public ResponseEntity<NewsDto> getNews(int id) {
        Optional<News> news = newsRepository.findById(id);
        if(news.isEmpty()){
            //TODO handle missing news + log
        }
        return new ResponseEntity<>(NewsDto.fromNews(news.get()), HttpStatus.OK);
    }

    @Cacheable(value = "news")
    public ResponseEntity<List<NewsDto>> getAllNews() {
        //TODO handle news search + log
        List<News> allNews = newsRepository.findAll();
        return new ResponseEntity<>(NewsDto.fromNews(allNews), HttpStatus.OK);
    }

    @CacheEvict(value = "news", allEntries = true)
    public ResponseEntity<NewsDto> updateNews(int id, News newNewsData) {
        Optional<News> existingNew = newsRepository.findById(id);
        if(existingNew.isEmpty()){
            //TODO handle news edit response + log
        }
        News newToChange = existingNew.get();
        updateNewsFields(newToChange, newNewsData);
        return new ResponseEntity<>(NewsDto.fromNews(newsRepository.save(newToChange)), HttpStatus.OK);
    }

    private void updateNewsFields(News existingNew, News newNew) {
        Optional.ofNullable(newNew.getTitle()).ifPresent(existingNew::setTitle);
        Optional.ofNullable(newNew.getText()).ifPresent(existingNew::setText);
        Optional.ofNullable(newNew.getImgUrl()).ifPresent(existingNew::setImgUrl);
        Optional.ofNullable(newNew.getPostingDate()).ifPresent(existingNew::setPostingDate);
    }

    @CacheEvict(value = "news", allEntries = true)
    public ResponseEntity<String> deleteNews(int id) {
        //TODO handle news delete + log
        newsRepository.deleteById(id);
        return new ResponseEntity<>("Success", HttpStatus.OK); //TODO get message from .properties
    }
}
