package com.smarthome.iot_simulator.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class AirQualitySensorData {
    // 공기질 센서

    private String deviceId; // 디바이스 ID
    private Double pm10; // 미세먼지 PM10
    private Double pm25; // 미세먼지 PM2.5
    private Integer co2; // CO2 농도
    private Integer voc; // VOC 수치
    private Integer light; // 조도
    private Boolean gasLeak; // 가스 감지 여부
    private Integer smokeLevel; // 연기 농도
    private LocalDateTime timestamp; // 데이터가 측정된 시간
}
