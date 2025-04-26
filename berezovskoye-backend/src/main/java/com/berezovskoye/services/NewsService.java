package com.berezovskoye.services;

import com.berezovskoye.dtos.news.NewsDto;
import com.berezovskoye.exceptions.errors.database.EntityAbnormalBehaviorException;
import com.berezovskoye.exceptions.errors.global.BadRequestException;
import com.berezovskoye.exceptions.errors.database.EntityNotFoundException;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

@Slf4j
@Service
public class NewsService {

    private static final String MODEL_NAME = "News";
    private static final String CACHE_NAME = "news";

    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Autowired
    private ImageService imageService;

    @Autowired
    private NewsRepository newsRepository;

    @Cacheable(value = CACHE_NAME, key = "#id")
    public ResponseEntity<NewsDto> getNews(int id) {
        Optional<News> newsOptional = newsRepository.findById(id);

        if(newsOptional.isEmpty()){
            throw EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id+"");
        }

        return new ResponseEntity<>(NewsDto.fromNews(newsOptional.get()), HttpStatus.OK);
    }

    @Cacheable(value = CACHE_NAME)
    public ResponseEntity<List<NewsDto>> getAllNews() {
        List<News> allNews = newsRepository.findAll();

        if(allNews.isEmpty()){
            String empty = messages.getString("entities.empty");
            String emptyMessage = String.format(empty, MODEL_NAME);
            log.warn("{}{}", emptyMessage, LocalDateTime.now());
        }

        return new ResponseEntity<>(NewsDto.fromNews(allNews), HttpStatus.OK);
    }

    @Transactional
    @CacheEvict(value = CACHE_NAME, allEntries = true)
    public ResponseEntity<NewsDto> addNews(News newToAdd) {
        BadRequestException.checkObject("default.bad.request", newToAdd);

        if(newToAdd.getId() != null){
            throw BadRequestException.throwAndLogBadRequest("entity.wrong.key", MODEL_NAME);
        }

        News addedNew = newsRepository.save(newToAdd);

        return logAndReturnObject("entity.saved", addedNew);
    }

    @Transactional
    @CacheEvict(value = CACHE_NAME, allEntries = true)
    public ResponseEntity<NewsDto> updateNews(int id, News newNewsData, MultipartFile imgFile) throws IOException {
        BadRequestException.checkObject("default.bad.request", newNewsData);

        String newImageName = null;
        if(imgFile != null){
            newImageName = imageService.uploadImage(imgFile, newNewsData.getImgUrl()).getBody();
            newNewsData.setImgUrl(newImageName);
        }

        Optional<News> newsOptional = newsRepository.findById(id);

        News existingNew = newsOptional.orElseThrow(() ->
                EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id + "")
        );

        if(existingNew.equals(newNewsData)){
            String sameData = messages.getString("entity.same.data");
            String sameDataMessage = String.format(sameData, MODEL_NAME, existingNew.getId());
            log.warn("{} {}", sameDataMessage, LocalDateTime.now());
            return new ResponseEntity<>(NewsDto.fromNews(existingNew), HttpStatus.OK);
        }

        newNewsData.setId(existingNew.getId());
        News updatedNews = newsRepository.save(newNewsData);

        if(!newNewsData.equals(updatedNews)){
            String notUpdated = messages.getString("entity.not.updated");
            String notUpdatedMessage = String.format(notUpdated, MODEL_NAME, existingNew.getId());
            log.error("{} {}", notUpdatedMessage, LocalDateTime.now());
            if(imgFile != null){
                imageService.deleteImage(newImageName);
            }
            throw new EntityAbnormalBehaviorException(notUpdatedMessage);
        }

        return logAndReturnObject("entity.updated", updatedNews);
    }

    @CacheEvict(value = CACHE_NAME, allEntries = true)
    public ResponseEntity<String> deleteNews(int id) {
        Optional<News> newsOptional = newsRepository.findById(id);

        if(newsOptional.isEmpty()){
            throw EntityNotFoundException.throwAndLogNotFound(MODEL_NAME, id+"");
        }

        newsRepository.deleteById(id);

        newsOptional = newsRepository.findById(id);
        if(newsOptional.isPresent()){
            throw EntityAbnormalBehaviorException.throwAndLogNotDeleted(MODEL_NAME, id+"");
        }

        return logAndReturnText("entity.deleted", id);
    }

    private ResponseEntity<String> logAndReturnText(String key, Integer id){
        String success = messages.getString(key);
        String successMessage = String.format(success, MODEL_NAME, id);
        log.info("{}{}", successMessage, LocalDateTime.now());

        return new ResponseEntity<>(successMessage,
                HttpStatus.OK);
    }

    private ResponseEntity<NewsDto> logAndReturnObject(String key, News news){
        String success = messages.getString(key);
        String successMessage = String.format(success, MODEL_NAME, news.getId());
        log.info("{}{}", successMessage, LocalDateTime.now());

        return new ResponseEntity<>(NewsDto.fromNews(news),
                HttpStatus.OK);
    }
}
