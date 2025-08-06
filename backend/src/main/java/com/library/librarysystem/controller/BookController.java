package com.library.librarysystem.controller;

import com.library.librarysystem.model.Book;
import com.library.librarysystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> optionalBook = bookService.getBookById(id);
        return optionalBook.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        Optional<Book> optionalBook = bookService.getBookById(id);
        if (!optionalBook.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Book book = optionalBook.get();
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setIsbn(updatedBook.getIsbn());
        book.setAvailable(updatedBook.isAvailable());

        Book savedBook = bookService.saveBook(book);
        return ResponseEntity.ok(savedBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        Optional<Book> optionalBook = bookService.getBookById(id);
        if (!optionalBook.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/borrow/{id}")
    public ResponseEntity<String> borrowBook(@PathVariable Long id) {
        Optional<Book> optionalBook = bookService.getBookById(id);
        if (!optionalBook.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Book book = optionalBook.get();
        if (!book.isAvailable()) {
            return ResponseEntity.badRequest().body("Book is already borrowed.");
        }

        book.setAvailable(false);
        bookService.saveBook(book);
        return ResponseEntity.ok("Book borrowed successfully.");
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<String> returnBook(@PathVariable Long id) {
        Optional<Book> optionalBook = bookService.getBookById(id);
        if (!optionalBook.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Book book = optionalBook.get();
        if (book.isAvailable()) {
            return ResponseEntity.badRequest().body("Book is not borrowed.");
        }

        book.setAvailable(true);
        bookService.saveBook(book);
        return ResponseEntity.ok("Book returned successfully.");
    }
}