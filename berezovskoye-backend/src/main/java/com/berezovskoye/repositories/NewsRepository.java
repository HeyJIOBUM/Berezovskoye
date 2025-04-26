package com.berezovskoye.repositories;

import com.berezovskoye.models.news.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Integer> {
}
