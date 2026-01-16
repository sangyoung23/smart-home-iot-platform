# 1. Node 이미지
FROM node:20

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. 패키지 정보만 먼저 복사 후 설치 (빌드 캐시 활용)
COPY package*.json ./
RUN npm install

# 4. 소스 코드 복사
COPY . .

# 5. 개발 모드 실행
CMD ["npm", "run", "dev"]
