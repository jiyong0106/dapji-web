# Dapji - 클라이밍 커뮤니티 플랫폼

클라이밍 영상공유 앱

- **배포 사이트:** [https://climbdapji.kr/](https://climbdapji.kr/)

---

## 🌐 Web (Next.js)

### 🛠️ 기술 스택

- **Next.js** - React 프레임워크
- **TypeScript** - 타입 안정성
- **SCSS** - 모듈 방식 스타일링
- **React Query** - 서버 상태 관리
- **Zustand** - 전역 상태 관리

### 📁 프로젝트 구조

```
front/
  ├─ src/
  │  ├─ app/                # Next.js App Router 페이지
  │  │  ├─ (home)/         # 랜딩 페이지
  │  │  ├─ (legal)/        # 약관 페이지
  │  │  └─ (main)/         # 메인 서비스 페이지
  │  ├─ components/        # 페이지별 컴포넌트
  │  │  ├─ common/         # 공통 컴포넌트
  │  │  ├─ landingPage/
  │  │  ├─ gymListPage/
  │  │  └─ ...
  │  ├─ hooks/             # 커스텀 훅
  │  ├─ utils/             # 유틸리티 및 스토어
  │  └─ styles/            # 전역 스타일
```

## 📱 App (EXPO)

### 🛠️ 기술 스택

- **React Native** - 크로스플랫폼 프레임워크
- **Expo** - 개발 도구 및 빌드 시스템
- **TypeScript** - 타입 안정성
- **React Query** - 서버 상태 관리
- **Zustand** - 전역 상태 관리
- **Expo FileSystem** - 스트리밍 업로드
- **expo-media-library** - 갤러리 최적화

### 📁 프로젝트 구조

```
dapji/
  ├─ app/                    # Expo Router 페이지
  │  ├─ (tabs)/             # 탭 네비게이션
  │  ├─ gym/                # 암장 관련
  │  └─ board/              # 게시판 관련
  │  └─ ...              
  ├─ components/            # UI 컴포넌트
  │  ├─ common/             # 공통 컴포넌트
  │  ├─ gymScreen/          # 암장 화면
  │  └─ ...
  ├─ hooks/                 # 커스텀 훅
  └─ utils/                 # 유틸 및 API
     ├─ api/                # API 함수
     ├─ store/              # Zustand 스토어
     └─ types/              # TypeScript 타입
```

### ✨ 주요 기능

#### 1️⃣ 동영상 업로드 최적화

- **스트리밍 업로드**: Presigned URL + `FileSystem.createUploadTask()`
- **실시간 진행률**: 네이티브 콜백으로 업로드 진행률 추적
- **메모리 효율**: JS 메모리 거치지 않고 직접 S3 전송

#### 2️⃣ 갤러리 성능 개선

- **expo-image-picker → expo-media-library** 전환
- **10배 성능 향상**: 재인코딩 제거 (5~10초 → 0.5~1초)
- **무한 스크롤**: 24개씩 페이징으로 메모리 절약

#### 3️⃣ iOS 파일 시스템 최적화

- **샌드박스 문제 해결**: `FileSystem.copyAsync()`로 캐시 복사
- **AVPlayer 재생 가능**: DCIM → Cache 디렉토리 이동

### 🎯 성능 최적화 사례

| 항목            | Before            | After                | 개선율          |
| --------------- | ----------------- | -------------------- | --------------- |
| **동영상 선택** | 5~10초 (재인코딩) | 0.5~1초 (단순 복사)  | **10배**        |
| **갤러리 로딩** | 전체 로드 (느림)  | 24개씩 페이징        | **메모리 절감** |
| **업로드 방식** | FormData (메모리) | 스트리밍 (직접 전송) | **대용량 처리** |

---


## 👥 팀 구성

- **Frontend 1명**
- **Backend 1명**

---
