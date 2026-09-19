package com.finpay.payment;

public class PaymentResponse {

    private String transactionId;

    private String status;

    private String message;

    private double amount;

    public PaymentResponse(
            String transactionId,
            String status,
            String message,
            double amount) {

        this.transactionId = transactionId;
        this.status = status;
        this.message = message;
        this.amount = amount;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public double getAmount() {
        return amount;
    }
}
