package com.finpay.account;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "http://35.154.42.201:5173")
public class AccountController {

    private final AccountRepository repository;

    public AccountController(AccountRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Account> getAccounts() {
        return repository.findAll();
    }

    @GetMapping("/{accountNumber}")
    public Account getAccount(
            @PathVariable String accountNumber) {

        return repository
                .findByAccountNumber(accountNumber)
                .orElse(null);
    }

    @PostMapping
    public Account createAccount(
            @RequestBody Account account) {

        return repository.save(account);
    }
}
