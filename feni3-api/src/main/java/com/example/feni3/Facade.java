package com.example.feni3;

import com.example.feni3.models.FetchResponse;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Facade {

    @GetMapping("/mvv")
    public FetchResponse getMVV() {
        return new FetchResponse(execFile("train.sh"), execFile("bus.sh"));
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
