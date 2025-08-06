package com.library.librarysystem.repository;

import com.library.librarysystem.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
