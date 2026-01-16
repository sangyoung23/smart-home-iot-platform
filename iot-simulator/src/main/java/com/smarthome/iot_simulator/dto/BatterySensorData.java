package com.smarthome.iot_simulator.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class BatterySensorData {
    // 배터리 센서

    private String deviceId; // 디바이스 ID
    private Integer battery; // 배터리 잔량(%)
    private LocalDateTime timestamp; // 데이터가 측정된 시간
}
