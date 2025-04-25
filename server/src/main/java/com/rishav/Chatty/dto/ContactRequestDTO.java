package com.rishav.Chatty.dto;

public class ContactRequestDTO {
    private String senderEmail;
    private String receiverEmail;

    // Getters and Setters
    public String getSenderEmail() {
        return senderEmail;
    }
    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }
    public String getReceiverEmail() {
        return receiverEmail;
    }
    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }
}

