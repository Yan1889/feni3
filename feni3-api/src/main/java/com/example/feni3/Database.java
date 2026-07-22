package com.example.feni3;

import java.io.IOException;
import java.io.InputStream;

public class Database {
    public static String getTrainInfo() {
        try {
            Process s = Runtime.getRuntime().exec("./trains.sh");
            InputStream stdout = s.getInputStream();
            s.waitFor();
            return new String(stdout.readAllBytes());
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
