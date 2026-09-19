package com.finpay.account;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AccountRepository
        extends MongoRepository<Account, String> {

    Optional<Account> findByAccountNumber(
            String accountNumber
    );
}
