package com.finpay.transaction;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionRepository repository;

    public TransactionController(
            TransactionRepository repository) {

        this.repository = repository;
    }

    @GetMapping
    public List<Transaction> getTransactions() {
        return repository.findAll();
    }

    @PostMapping
    public Transaction createTransaction(
            @RequestBody Transaction transaction) {

        return repository.save(transaction);
    }
}
