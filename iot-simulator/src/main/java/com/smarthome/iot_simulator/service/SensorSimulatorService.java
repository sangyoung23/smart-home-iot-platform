package com.smarthome.iot_simulator.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.smarthome.iot_simulator.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SensorSimulatorService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    private double energyTotal = 0.0;

    @Scheduled(fixedRate = 7_200_000) // 2시간
    public void sendSensorData() throws JsonProcessingException {

        // 1. 온도 센서
        TemperatureSensorData temp = new TemperatureSensorData();
        temp.setDeviceId("device-01");
        temp.setTemperature(randomDouble(0, 40));
        temp.setTimestamp(LocalDateTime.now());

        kafkaTemplate.send("temperature-topic",
                objectMapper.writeValueAsString(temp));

        // 2. 습도 센서
        HumiditySensorData humidity = new HumiditySensorData();
        humidity.setDeviceId("device-01");
        humidity.setHumidity(randomDouble(0, 100));
        humidity.setTimestamp(LocalDateTime.now());

        kafkaTemplate.send("humidity-topic",
                objectMapper.writeValueAsString(humidity));

        // 3. 공기질 센서
        AirQualitySensorData air = new AirQualitySensorData();
        air.setDeviceId("device-01");
        air.setPm10(randomDouble(0, 150));
        air.setPm25(randomDouble(0, 80));
        air.setCo2(randomInt(400, 2000));
        air.setVoc(randomInt(0, 500));
        air.setLight(randomInt(0, 2000));
        air.setGasLeak(Math.random() < 0.05);
        air.setSmokeLevel(randomInt(0, 100));
        air.setTimestamp(LocalDateTime.now());

        kafkaTemplate.send("air-quality-topic",
                objectMapper.writeValueAsString(air));

        // 4. 전력 센서
        PowerSensorData power = new PowerSensorData();
        power.setDeviceId("device-01");

        double powerUsage = randomDouble(0, 300); // W
        power.setPowerUsage(powerUsage);
        power.setVoltage(randomDouble(200, 240));
        power.setCurrent(randomDouble(0, 10));

        energyTotal += powerUsage / 3600 / 1000; // W → kWh
        power.setEnergyTotal(energyTotal);

        power.setTimestamp(LocalDateTime.now());

        kafkaTemplate.send("power-topic",
                objectMapper.writeValueAsString(power));

        // 5. 배터리 센서
        BatterySensorData battery = new BatterySensorData();
        battery.setDeviceId("device-01");
        battery.setBattery(randomInt(50, 100));
        battery.setTimestamp(LocalDateTime.now());

        kafkaTemplate.send("battery-topic",
                objectMapper.writeValueAsString(battery));
    }

    private double randomDouble(double min, double max) {
        return min + (Math.random() * (max - min));
    }

    private int randomInt(int min, int max) {
        return (int) (min + (Math.random() * (max - min)));
    }
}
