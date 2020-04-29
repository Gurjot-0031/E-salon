package com.jot.Esalon.Repository;

import com.jot.Esalon.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products,Integer> {
}
