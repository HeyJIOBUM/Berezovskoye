package com.berezovskoye.services;

import com.berezovskoye.dtos.news.NewsDto;
import com.berezovskoye.exceptions.global.BadRequestException;
import com.berezovskoye.exceptions.global.EntityNotDeletedException;
import com.berezovskoye.exceptions.global.EntityNotFoundException;
import com.berezovskoye.exceptions.global.EntityNotSavedException;
import com.berezovskoye.models.news.News;
import com.berezovskoye.repositories.NewsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

@Slf4j
@Service
public class NewsService {

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Autowired
    private NewsRepository newsRepository;

    @Cacheable(value = "news", key = "#id")
    public ResponseEntity<NewsDto> getNews(int id) {
        Optional<News> newsOptional = newsRepository.findById(id);

        News news = newsOptional.orElseThrow(() -> {
            String errorMessage = messages.getString("news.not.found");
            log.error("{} {}", String.format(errorMessage, id), LocalDateTime.now());
            return new EntityNotFoundException(errorMessage);
        });

        return new ResponseEntity<>(NewsDto.fromNews(news), HttpStatus.OK);
    }

    @Cacheable(value = "news")
    public ResponseEntity<List<NewsDto>> getAllNews() {
        List<News> allNews = newsRepository.findAll();

        if(allNews.isEmpty()){
            String newsEmpty = messages.getString("news.empty");
            log.warn("{}{}", newsEmpty, LocalDateTime.now());
        }

        return new ResponseEntity<>(NewsDto.fromNews(allNews), HttpStatus.OK);
    }

    @Transactional
    @CacheEvict(value = "news", allEntries = true)
    public ResponseEntity<NewsDto> addNews(News newToAdd) {
        BadRequestException.checkObject("default.bad.request", newToAdd);

        News addedNew = newsRepository.save(newToAdd);

        Optional<News> savedNew = newsRepository.findById(addedNew.getId());
        News newToChange = savedNew.orElseThrow(() -> {
            String newsNotSaved = messages.getString("news.not.saved");
            log.error("{} {}", String.format(newsNotSaved, addedNew.getId()), LocalDateTime.now());
            return new EntityNotSavedException(newsNotSaved);
        });

        String newsSaved = messages.getString("news.saved");
        log.info("{} {}", String.format(newsSaved, addedNew.getId()), LocalDateTime.now());
        return new ResponseEntity<>(NewsDto.fromNews(addedNew), HttpStatus.OK);
    }

    @Transactional
    @CacheEvict(value = "news", allEntries = true)
    public ResponseEntity<NewsDto> updateNews(int id, News newNewsData) {
        BadRequestException.checkObject("default.bad.request", newNewsData);
        News newBeforeUpdate;
        News newAfterUpdate;

        Optional<News> existingNew = newsRepository.findById(id);
        News newToChange = existingNew.orElseThrow(() -> {
            String newsNotFound = messages.getString("news.not.found");
            log.error("{} {}", String.format(newsNotFound, id), LocalDateTime.now());
            return new EntityNotFoundException(newsNotFound);
        });
        newBeforeUpdate = newToChange;

        updateNewsFields(newToChange, newNewsData);

        existingNew = newsRepository.findById(id);
        newToChange = existingNew.orElseThrow(() -> {
            String newsNotFound = messages.getString("news.not.found");
            log.error("{} {}", String.format(newsNotFound, id), LocalDateTime.now());
            return new EntityNotFoundException(newsNotFound);
        });
        newAfterUpdate = newToChange;

        if(newBeforeUpdate.equals(newAfterUpdate)){
            String newsNotUpdated = messages.getString("news.not.updated");
            log.warn("{} {}", String.format(newsNotUpdated, id), LocalDateTime.now());
        }

        String newsUpdated = messages.getString("news.updated");
        log.info("{} {}", String.format(newsUpdated, id), LocalDateTime.now());
        return new ResponseEntity<>(NewsDto.fromNews(newsRepository.save(newToChange)), HttpStatus.OK);
    }

    private void updateNewsFields(News existingNew, News newNew) {
        Optional.ofNullable(newNew.getTitle()).ifPresent(existingNew::setTitle);
        Optional.ofNullable(newNew.getText()).ifPresent(existingNew::setText);
        Optional.ofNullable(newNew.getImgUrl()).ifPresent(existingNew::setImgUrl);
        Optional.ofNullable(newNew.getPostingDate()).ifPresent(existingNew::setPostingDate);
    }

    @Transactional
    @CacheEvict(value = "news", allEntries = true)
    public ResponseEntity<String> deleteNews(int id) {
        Optional<News> newsOptional = newsRepository.findById(id);

        if(newsOptional.isEmpty()){
            String newNotFound = messages.getString("default.delete.not.found");
            String newNotFoundMessage = String.format(newNotFound, "New", id);
            log.warn("{}{}", newNotFoundMessage, LocalDateTime.now());
            return new ResponseEntity<>(newNotFoundMessage,
                    HttpStatus.OK);
        }

        newsRepository.deleteById(id);

        newsOptional = newsRepository.findById(id);
        if(newsOptional.isEmpty()){
            String newDeleted = messages.getString("default.delete.success");
            String newDeletedMessage = String.format(newDeleted, "New", id);
            log.info("{}{}", newDeletedMessage, LocalDateTime.now());
            return new ResponseEntity<>(newDeletedMessage,
                    HttpStatus.OK);
        }

        String newNotDeleted = messages.getString("default.delete.error");
        String newNotDeletedMessage = String.format(newNotDeleted, "New", id);
        log.error(newNotDeletedMessage);
        throw new EntityNotDeletedException(newNotDeletedMessage);
    }
}
