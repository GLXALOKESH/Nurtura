package com.springbootbackend.demo.serviceImp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsServiceImp {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    public String sendSms(String toPhoneNumber, String messageBody) {
        Twilio.init(accountSid, authToken);

        Message message = Message.creator(
                new PhoneNumber(toPhoneNumber),       // Receiver's number
                new PhoneNumber(twilioPhoneNumber),   // Twilio number
                messageBody
        ).create();

        return "Message sent with SID: " + message.getSid();
    }

}