package com.finpay.payment;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final RestTemplate restTemplate;

    private final String accountServiceUrl;

    private final String transactionServiceUrl;

    public PaymentController(
            RestTemplate restTemplate,
            @Value("${account.service.url}")
            String accountServiceUrl,
            @Value("${transaction.service.url}")
            String transactionServiceUrl) {

        this.restTemplate = restTemplate;

        this.accountServiceUrl = accountServiceUrl;

        this.transactionServiceUrl =
                transactionServiceUrl;
    }

    @PostMapping
    public ResponseEntity<PaymentResponse> makePayment(
            @RequestBody PaymentRequest request) {

        // 1. Validate amount

        if (request.getAmount() <= 0) {

            return ResponseEntity.badRequest()
                    .body(
                        new PaymentResponse(
                            null,
                            "FAILED",
                            "Amount must be greater than zero",
                            request.getAmount()
                        )
                    );
        }

        // 2. Validate accounts

        if (request.getFromAccount() == null ||
            request.getToAccount() == null) {

            return ResponseEntity.badRequest()
                    .body(
                        new PaymentResponse(
                            null,
                            "FAILED",
                            "Account numbers are required",
                            request.getAmount()
                        )
                    );
        }

        // 3. Sender and receiver cannot be same

        if (request.getFromAccount()
                .equals(request.getToAccount())) {

            return ResponseEntity.badRequest()
                    .body(
                        new PaymentResponse(
                            null,
                            "FAILED",
                            "Sender and receiver cannot be same",
                            request.getAmount()
                        )
                    );
        }

        // 4. Get sender account

        String senderUrl =
                accountServiceUrl
                + "/accounts/"
                + request.getFromAccount();

        Account sender =
                restTemplate.getForObject(
                    senderUrl,
                    Account.class
                );

        if (sender == null) {

            return ResponseEntity.badRequest()
                    .body(
                        new PaymentResponse(
                            null,
                            "FAILED",
                            "Sender account not found",
                            request.getAmount()
                        )
                    );
        }

        // 5. Get receiver account

        String receiverUrl =
                accountServiceUrl
                + "/accounts/"
                + request.getToAccount();

        Account receiver =
                restTemplate.getForObject(
                    receiverUrl,
                    Account.class
                );

        if (receiver == null) {

            return ResponseEntity.badRequest()
                    .body(
                        new PaymentResponse(
                            null,
                            "FAILED",
                            "Receiver account not found",
                            request.getAmount()
                        )
                    );
        }

        // 6. Check account status

        if (!"ACTIVE".equals(sender.getStatus()) ||
            !"ACTIVE".equals(receiver.getStatus())) {

            return ResponseEntity.badRequest()
                    .body(
                        new PaymentResponse(
                            null,
                            "FAILED",
                            "Account is not active",
                            request.getAmount()
                        )
                    );
        }

        // 7. Check balance

        if (sender.getBalance() <
                request.getAmount()) {

            return ResponseEntity.badRequest()
                    .body(
                        new PaymentResponse(
                            null,
                            "FAILED",
                            "Insufficient balance",
                            request.getAmount()
                        )
                    );
        }

        // 8. Generate transaction ID

        String transactionId =
                "TXN-" +
                UUID.randomUUID()
                    .toString()
                    .substring(0, 8)
                    .toUpperCase();

        /*
         * At this point the request is valid.
         *
         * For our first lab version we will record
         * the transaction.
         */

        String transactionUrl =
                transactionServiceUrl
                + "/transactions";

        TransactionRequest transaction =
                new TransactionRequest(
                    transactionId,
                    request.getFromAccount(),
                    request.getToAccount(),
                    request.getAmount(),
                    "SUCCESS"
                );

        restTemplate.postForObject(
                transactionUrl,
                transaction,
                Object.class
        );

        return ResponseEntity.ok(
                new PaymentResponse(
                    transactionId,
                    "SUCCESS",
                    "Payment processed successfully",
                    request.getAmount()
                )
        );
    }
}
