package com.berezovskoye.repositories;

import com.berezovskoye.models.product.Product;
import com.berezovskoye.models.users.SystemUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemUserRepository extends JpaRepository<SystemUser, Integer> {
    SystemUser findByLogin(String login);
}
