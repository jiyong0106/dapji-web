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

# 빌드 타임에 필요한 환경 변수 정의
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_IOS_URL  # (추가) iOS URL을 빌드 아규먼트로 선언

# ENV 설정 (Docker 컨테이너 내에서 빌드 시 반영되도록)
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_IOS_URL=$NEXT_PUBLIC_IOS_URL

# 빌드
RUN npm run build

# Next.js 앱 실행
CMD [ "npm", "start", "--", "-H", "0.0.0.0" ]

# 포트 노출
EXPOSE 3000
