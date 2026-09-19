package com.finpay.payment;

public class Account {

    private String id;

    private String accountNumber;

    private String customerName;

    private double balance;

    private String status;

    public Account() {
    }

    public String getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public double getBalance() {
        return balance;
    }

    public String getStatus() {
        return status;
    }
}
