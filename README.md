# Smart Home IoT Platform – Docker Environment
<img width="2087" height="1255" alt="스마트 홈 IoT 시스템 구성도" src="https://github.com/user-attachments/assets/5eb96fa4-1e58-46aa-a659-47b52e5993bf" />

본 저장소는 **스마트 홈 IoT 실시간 모니터링 시스템**을  
로컬 환경에서 **실제 운영 환경과 유사하게 실행하기 위한 Docker Compose 구성 레포지토리**입니다.

Kafka 기반 실시간 데이터 처리 구조와  
MongoDB, Redis, MySQL 등 **다중 데이터 저장소 아키텍처**를  
단일 Docker 네트워크 내에서 실행·검증할 수 있도록 구성하였습니다.

---

## 프로젝트 목적

- 실시간 센서 데이터 수집 및 처리 흐름 검증
- Kafka 기반 **비동기 메시징(Pub/Sub) 구조** 학습
- 조회 목적에 따른 데이터 저장소 역할 분리
  - 실시간 상태 조회: Redis
  - 원본 센서 데이터 저장: MongoDB
  - 통계 데이터 조회: MySQL
- Docker 환경에서 **운영 환경과 유사한 서비스 간 통신 구조** 구현

---

## 구성 서비스

- **Backend**
  - Spring Boot 기반 API 서버
- **Simulator**
  - IoT 센서 데이터 생성 및 전송 시뮬레이터
- **Kafka**
  - 실시간 메시지 브로커
- **MongoDB**
  - 원본 센서 데이터 저장소
- **Redis**
  - 실시간 상태 조회용 In-Memory Cache
- **MySQL**
  - 통계 데이터 및 배치 메타 정보 저장소
- **Frontend**
  - 실시간 모니터링 대시보드 UI
