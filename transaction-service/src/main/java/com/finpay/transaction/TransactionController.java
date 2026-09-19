package com.finpay.transaction;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {

    @GetMapping("/transactions")
    public String getTransactions() {
        return "Transaction Service is running";
    }
}
