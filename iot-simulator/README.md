# 📡 Smart Home Sensor Simulator

## 1. 프로젝트 개요
본 프로젝트는 **Smart Home Backend와 연동되는 IoT 센서 데이터 시뮬레이터**입니다.  
실제 IoT 장비 대신 **Java 기반 시뮬레이터**를 통해  
센서 데이터를 주기적으로 생성하고 **Kafka로 전송**하는 역할을 담당합니다.

백엔드 시스템에서  
실시간 데이터 처리, 메시지 소비, 통계 배치 처리를  
**실제 서비스 환경과 유사하게 테스트하기 위해** 독립된 모듈로 구성되었습니다.

---

## 2. 프로젝트 목적

이 시뮬레이터는 다음과 같은 목적을 가지고 제작되었습니다.

- 실제 IoT 장비 없이도 **센서 데이터 수집 환경을 재현**
- Kafka Producer 구현을 통한 **메시지 발행 흐름 이해**
- 센서 타입 및 장치(Device) 단위 데이터 구조 설계 연습
- Backend, Kafka와의 연동을 포함한  
  **Docker 기반 멀티 서비스 환경 구성 연습**

본 시뮬레이터는 단독 실행이 아닌,  
`docker-compose.simulator.yml` 파일을 통해  
**Kafka 및 Backend와 동일한 Docker 네트워크에서 함께 실행되는 것을 전제로 설계**되었습니다.

---

## 3. 기술 스택
- Java 17
- Kafka (Producer)
- Docker

---

## 4. 주요 기능

### 4.1 센서 데이터 생성
- 온도(Temperature), 습도(Humidity), 배터리(Battery), 공기질(AirQuality), 전력(Power) 센서 데이터 생성
- 장치(Device) 단위 센서 값 시뮬레이션
- 센서 타입별 데이터 범위 및 형식 정의

---

### 4.2 Kafka 메시지 전송
- 센서 타입별 Kafka Topic으로 메시지 전송
- Kafka Producer를 이용한 **비동기 메시지 발행**
- JSON 형태의 메시지 구조 사용

---

### 4.3 주기적 데이터 전송
- 일정 주기로 센서 데이터 생성 및 전송
- 실시간 데이터 흐름을 가정한 **연속적인 메시지 발행 구조**

---

## 5. 메시지 구조 예시

```json
{
  "deviceId": "device-01",
  "temperature": 23.5,
  "timestamp": "2026-01-12T08:16:46"
}
