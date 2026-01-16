package com.smarthome.iot_simulator.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class HumiditySensorData {
    // 습도 센서

    private String deviceId; // 디바이스 ID
    private Double humidity; // 습도
    private LocalDateTime timestamp; // 데이터가 측정된 시간
}
