package com.example.feni3;

import com.example.feni3.models.MVVResponse;
import com.example.feni3.models.XKCDResponse;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class Facade {

    RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/xkcd")
    public XKCDResponse getXkcd() {
        String url = String.format("https://xkcd.com/%d/info.0.json", (int) (Math.random() * 3277));
        System.out.println(url);
        return restTemplate.getForObject(url, XKCDResponse.class);
    }

    @GetMapping("/mvv")
    public MVVResponse getMVV() {
        return new MVVResponse(execFile("train.sh"), execFile("bus.sh"));
    }

    private String execFile(String filename) {
        try {
            Process s = Runtime.getRuntime().exec("./" + filename);
            s.waitFor();
            String stdout = new String(s.getInputStream().readAllBytes());
            String stderr = new String(s.getErrorStream().readAllBytes());
            if (!stderr.isEmpty()) {
                System.out.println("[ERROR] " + stderr);
            }
            return stdout;
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
