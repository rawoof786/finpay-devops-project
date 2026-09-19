package com.finpay.payment;

public class TransactionRequest {

    private String transactionId;

    private String fromAccount;

    private String toAccount;

    private double amount;

    private String status;

    public TransactionRequest(
            String transactionId,
            String fromAccount,
            String toAccount,
            double amount,
            String status) {

        this.transactionId = transactionId;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
        this.status = status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getFromAccount() {
        return fromAccount;
    }

    public String getToAccount() {
        return toAccount;
    }

    public double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }
}
