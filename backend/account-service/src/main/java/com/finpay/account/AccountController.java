package com.finpay.account;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @GetMapping
    public List<Account> getAccounts() {

        List<Account> accounts = new ArrayList<>();

        accounts.add(
            new Account(
                1L,
                "Rawoof Shaik",
                "FINPAY10001",
                "FinPay Bank",
                "Savings Account",
                50000
            )
        );

        accounts.add(
            new Account(
                2L,
                "Mohammed Ali",
                "HDFC10001",
                "HDFC Bank",
                "Savings Account",
                25000
            )
        );

        accounts.add(
            new Account(
                3L,
                "Rahul Kumar",
                "SBI10001",
                "State Bank of India",
                "Savings Account",
                30000
            )
        );

        accounts.add(
            new Account(
                4L,
                "Priya Sharma",
                "ICICI10001",
                "ICICI Bank",
                "Current Account",
                40000
            )
        );

        return accounts;
    }
}
