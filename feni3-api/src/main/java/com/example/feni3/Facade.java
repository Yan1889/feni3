package com.example.feni3;

import com.example.feni3.models.FetchResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Facade {
    @GetMapping("/train")
    public FetchResponse handleTrains() {
        return new FetchResponse(Database.getTrainInfo());
    }
}
