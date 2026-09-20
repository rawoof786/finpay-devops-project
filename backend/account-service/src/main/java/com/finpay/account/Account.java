package com.finpay.account;

public class Account {

    private Long id;
    private String holderName;
    private String accountNumber;
    private String bankName;
    private String type;
    private double balance;

    public Account() {
    }

    public Account(
            Long id,
            String holderName,
            String accountNumber,
            String bankName,
            String type,
            double balance) {

        this.id = id;
        this.holderName = holderName;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.type = type;
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHolderName() {
        return holderName;
    }

    public void setHolderName(String holderName) {
        this.holderName = holderName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
