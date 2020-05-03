package com.jot.Esalon.Repository;

import com.jot.Esalon.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductsRepository extends JpaRepository<Products,Integer> {
}
