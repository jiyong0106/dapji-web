//랜딩헤더 옵션들
export const landingHeaderOptions = [
  {
    title: '브랜드 소개',
    sectionId: 'brand',
  },
  {
    title: '기능',
    sectionId: 'features',
  },
  {
    title: '사용 방법',
    sectionId: 'howto',
  },
  {
    title: '문의하기',
    sectionId: 'contact',
  },
];

//메인헤더 옵션들

export const mainHeaderOptions = [
  {
    title: '게시판',
    sectionId: 'brand',
  },
  {
    title: '클라이밍장 목록',
    sectionId: 'features',
  },
  {
    title: '클라이밍 기록',
    sectionId: 'howto',
  },
  {
    title: '마이페이지',
    sectionId: 'contact',
  },
];
//랜딩퓨처 옵션들
export const landingFeaturesOptions = [
  {
    cardImage: '/images/illustration1.png',
    title: '답지 검색',
    desc: '쉽고 빠른 클라이밍 영상 찾기 ',
  },
  {
    cardImage: '/images/illustration2.png',
    title: '캘린더 기록',
    desc: '내 클라이밍 기록 한눈에 확인!',
  },
  {
    cardImage: '/images/illustration3.png',
    title: '프로필',
    desc: '조금씩 쌓아가는 클라이밍 프로필',
  },
  {
    cardImage: '/images/illustration4.png',
    title: '커뮤니티',
    desc: '각종 정보와 꿀팁 공유, 여기서!',
  },
];

//랜딩하우 옵션들
export const landingHowOptions = [
  {
    icon: '/images/landingFilter.png',
    title: '암장별 필터',
    desc: '원하는 클라이밍장 선택, 쉽고 빠르게 답지를 볼 수 있어요. ',
    features: [
      '색상별 난이도로 답지 찾기',
      '영상으로 보고 싶은 문제 확인',
      '친구들과 찾고있던 답지 공유',
    ],
  },
  {
    icon: '/images/landingUpload.png',
    title: '답지 업로드',
    desc: '답지를 쉽게 업로드할 수 있어요. 나만의 클라이밍 기록을 남기거나 다른 사람들에게 자랑해보세요',
    features: [
      '대용량 영상도 문제없이!',
      '직접 촬영한 영상 및 인스타그램 링크로 업로드',
      '난이도 선택 및 꿀팁 텍스트 작성',
      '등반 날짜와 함께 기록 저장',
    ],
  },
  {
    icon: '/images/landingCalendar.png',
    title: '클라이밍 기록',
    desc: '운동 일정을 추가하고, 기록을 한눈에 관리하세요. 내가 언제, 어디서 얼마나 클라이밍을 했는지 한눈에 정리돼요.',
    features: [
      '캘린더 기반 클라이밍 기록 확인',
      '클라이밍 일정 직접 등록 및 알림 설정',
      '영상 없이도 운동 기록 추가 가능',
      '과거 기록 열람 및 일별 히스토리 조회',
    ],
  },
  {
    icon: '/images/landingProfile.png',
    title: '프로필 꾸미기',
    desc: '키와 리치부터 등반 스타일, 영상까지! 나만의 클라이머 프로필을 만들고, 성장 과정을 자연스럽게 보여줄 수 있어요.',
    features: [
      '자기소개 및 클라이밍 목표 설정',
      '완등 영상과 암장별 활동 정리',
      '내가 클리어한 난이도/문제 한눈에 보기',
      '클라이머 간 팔로우 및 답지 교류',
    ],
  },
  {
    icon: '/images/landingCommu.png',
    title: '답지 커뮤니티',
    desc: '운동 얘기부터 장비 추천, 오늘의 TMI까지! 클라이머들끼리 모여 자유롭게 소통해요. 답지는 아지트 그 자체.',
    features: [
      '질문, 정보, 잡담 등 자유게시판 운영',
      '주제별 카테고리 필터링 (장비, 부상, 암장, 훈련 등)',
      '좋아요, 댓글, 반응으로 소통 ',
      '링크나 이미지 등 외부 콘텐츠도 공유',
    ],
  },
];

//랜딩푸터 옵션들
export const landingFooterOptions = [
  {
    title: '처리방침',
    links: [
      { label: '개인정보처리방침', url: 'https://dap-ji.github.io/privacy/' },
      { label: '이용약관', url: 'https://dap-ji.github.io/privacy/terms' },
      {
        label: '삭제약관',
        url: 'https://dap-ji.github.io/privacy/deletionpolicy',
      },
    ],
  },
  {
    title: '고객 지원',
    links: [{ label: '문의하기', url: 'https://forms.gle/w9QGRZcp1RhyJJrj6' }],
  },
  {
    title: '소통',
    links: [
      { label: '카카오톡', url: 'http://pf.kakao.com/_Avsxdn' },
      {
        label: '인스타그램',
        url: 'https://www.instagram.com/dapji_official/?igsh=MWozanozMnVpMTFqYQ%3D%3D',
      },
    ],
  },
];
