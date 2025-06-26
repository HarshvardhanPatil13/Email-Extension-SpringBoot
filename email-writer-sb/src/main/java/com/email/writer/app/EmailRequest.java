package com.email.writer.app;

import lombok.Data;

@Data
public class EmailRequest {

    private  String emailContent;
    private  String tone;


    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }


}
