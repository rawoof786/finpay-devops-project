package com.finpay.payment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @GetMapping("/payments")
    public String getPayments() {
        return "Payment Service is running";
    }
}
