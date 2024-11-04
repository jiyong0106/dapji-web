# 베이스 이미지 설정
FROM node:20

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 빌드
RUN npm run build

# Next.js 앱 실행
CMD [ "npm", "start" ]

# 포트 노출
EXPOSE 3000
