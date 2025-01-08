import { title } from 'process';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { link } from 'fs';

export const climbLists = [
  {
    gym_idx: 1,
    name: '락랜드',
    adress: '서울특별시 강북구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcCa4na%2FbtsIMxBjSX8%2Fmy6IojkItzLjKZ1WoWAIzK%2Fimg.jpg',
    notice: '8월 30일부터 다음셋팅입니다',
  },
  {
    gym_idx: 2,
    name: '클라이밍월드',
    adress: '서울특별시 종로구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYptzI%2FbtsIMCWFQ9C%2FA38QkNnQQ1KePj7K0ZtWz0%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 3,
    name: '볼더파크',
    adress: '서울특별시 용산구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FwLygU%2FbtsINu4VkwW%2FWdNfcOvdzGXNIiOmq1qIpk%2Fimg.jpg',
    notice: '9월 5일 신규 루트 세팅 예정',
  },
  {
    gym_idx: 4,
    name: '클라임존',
    adress: '서울특별시 서대문구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8t6sg%2FbtsIOoJCGoE%2FVoXB0BL7tKW7N0NOUXXtGK%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 5,
    name: '알피니스트',
    adress: '서울특별시 강남구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '10월 1일부터 대회 준비로 인해 일시 휴업',
  },
  {
    gym_idx: 6,
    name: '클라임스페이스',
    adress: '서울특별시 마포구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 7,
    name: '볼더랜드',
    adress: '서울특별시 성북구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '8월 25일 새로운 회원 모집',
  },
  {
    gym_idx: 8,
    name: '클라이머즈',
    adress: '서울특별시 은평구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 9,
    name: '클라이밍하우스',
    adress: '서울특별시 강서구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '9월 10일 이벤트 공지 예정',
  },
  {
    gym_idx: 10,
    name: '락하우스',
    adress: '서울특별시 동대문구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 11,
    name: '클라이밍아레나',
    adress: '서울특별시 중랑구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '8월 20일부터 신규 루트 오픈',
  },
  {
    gym_idx: 12,
    name: '클라임파크',
    adress: '서울특별시 노원구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 13,
    name: '볼더짐',
    adress: '서울특별시 구로구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '9월 1일 클라이밍 강좌 개설',
  },
  {
    gym_idx: 14,
    name: '클라이밍랜드',
    adress: '서울특별시 금천구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 15,
    name: '클라임업',
    adress: '서울특별시 영등포구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '10월 5일부터 운영 시간 변경',
  },
  {
    gym_idx: 16,
    name: '볼더클럽',
    adress: '서울특별시 양천구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 17,
    name: '클라이밍펀',
    adress: '서울특별시 도봉구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '8월 15일 회원 이벤트',
  },
  {
    gym_idx: 18,
    name: '락펀',
    adress: '서울특별시 동작구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 19,
    name: '클라임아카데미',
    adress: '서울특별시 관악구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '9월 20일부터 강습 시작',
  },
  {
    gym_idx: 20,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 21,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 22,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 23,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 24,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 25,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 26,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 27,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 28,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 29,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 230,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
];

export const contentDetailData = [
  {
    post_idx: '1',
    user_idx: 1,
    gym_idx: 2,
    clearday: '2024-07-01',
    content:
      '오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1',
    media: 'www.example1.com',
    color: 'red',
    username: '박지용',
    created_at: '2024-07-01 00:00:00',
  },
  {
    post_idx: '2',
    user_idx: 2,
    gym_idx: 3,
    clearday: '2024-07-02',
    content: '오늘 성공했어요 2',
    media: 'www.example2.com',
    color: 'blue',
    username: '박지용',
    created_at: '2024-07-02 00:00:00',
  },
  {
    post_idx: '3',
    user_idx: 3,
    gym_idx: 1,
    clearday: '2024-07-03',
    content: '오늘 성공했어요 3',
    media: 'www.example3.com',
    color: 'green',
    username: '박지용',
    created_at: '2024-07-03 00:00:00',
  },
  {
    post_idx: '4',
    user_idx: 4,
    gym_idx: 4,
    clearday: '2024-07-04',
    content: '오늘 성공했어요 4',
    media: 'www.example4.com',
    color: 'yellow',
    username: '박지용',
    created_at: '2024-07-04 00:00:00',
  },
  {
    post_idx: '5',
    user_idx: 5,
    gym_idx: 5,
    clearday: '2024-07-05',
    content: '오늘 성공했어요 5',
    media: 'www.example5.com',
    color: 'pink',
    username: '박지용',
    created_at: '2024-07-05 00:00:00',
  },
  {
    post_idx: '6',
    user_idx: 6,
    gym_idx: 6,
    clearday: '2024-07-06',
    content: '오늘 성공했어요 6',
    media: 'www.example6.com',
    color: 'purple',
    username: '박지용',
    created_at: '2024-07-06 00:00:00',
  },
  {
    post_idx: '7',
    user_idx: 7,
    gym_idx: 7,
    clearday: '2024-07-07',
    content: '오늘 성공했어요 7',
    media: 'www.example7.com',
    color: 'white',
    username: '박지용',
    created_at: '2024-07-07 00:00:00',
  },
  {
    post_idx: '8',
    user_idx: 8,
    gym_idx: 8,
    clearday: '2024-07-08',
    content: '오늘 성공했어요 8',
    media: 'www.example8.com',
    color: 'gray',
    username: '박지용',
    created_at: '2024-07-08 00:00:00',
  },
  {
    post_idx: '9',
    user_idx: 9,
    gym_idx: 9,
    clearday: '2024-07-09',
    content: '오늘 성공했어요 9',
    media: 'www.example9.com',
    color: 'black',
    username: '박지용',
    created_at: '2024-07-09 00:00:00',
  },
  {
    post_idx: '10',
    user_idx: 10,
    gym_idx: 10,
    clearday: '2024-07-10',
    content: '오늘 성공했어요 10',
    media: 'www.example10.com',
    color: 'white',
    username: '박지용',
    created_at: '2024-07-10 00:00:00',
  },
  //   {
  //     post_idx: '11',
  //     user_idx: 1,
  //     gym_idx: 2,
  //     clearday: '2024-07-11',
  //     content: '오늘 성공했어요 11',
  //     media: 'www.example11.com',
  //     color: 'blue',
  // username:'박지용',
  // created_at: '2024-07-11 00:00:00'
  //   },
  //   {
  //     post_idx: '12',
  //     user_idx: 2,
  //     gym_idx: 3,
  //     clearday: '2024-07-12',
  //     content: '오늘 성공했어요 12',
  //     media: 'www.example12.com',
  //     color: 'pink',
  // username:'박지용',
  // created_at: '2024-07-12 00:00:00'
  //   },
  //   {
  //     post_idx: '13',
  //     user_idx: 3,
  //     gym_idx: 4,
  //     clearday: '2024-07-13',
  //     content: '오늘 성공했어요 13',
  //     media: 'www.example13.com',
  //     color: 'pink',
  // username:'박지용',
  // created_at: '2024-07-13 00:00:00'
  //   },
  //   {
  //     post_idx: '14',
  //     user_idx: 4,
  //     gym_idx: 5,
  //     clearday: '2024-07-14',
  //     content: '오늘 성공했어요 14',
  //     media: 'www.example14.com',
  //     color: 'green',
  // username:'박지용',
  // created_at: '2024-07-14 00:00:00'
  //   },
  //   {
  //     post_idx: '15',
  //     user_idx: 5,
  //     gym_idx: 6,
  //     clearday: '2024-07-15',
  //     content: '오늘 성공했어요 15',
  //     media: 'www.example15.com',
  //     color: 'yellow',
  // username:'박지용',
  // created_at: '2024-07-15 00:00:00'
  //   },
  //   {
  //     post_idx: '16',
  //     user_idx: 6,
  //     gym_idx: 7,
  //     clearday: '2024-07-16',
  //     content: '오늘 성공했어요 16',
  //     media: 'www.example16.com',
  //     color: 'purple',
  // username:'박지용',
  // created_at: '2024-07-16 00:00:00'
  //   },
  //   {
  //     post_idx: '17',
  //     user_idx: 7,
  //     gym_idx: 8,
  //     clearday: '2024-07-17',
  //     content: '오늘 성공했어요 17',
  //     media: 'www.example17.com',
  //     color: 'gray',
  // username:'박지용',
  // created_at: '2024-07-17 00:00:00'
  //   },
  //   {
  //     post_idx: '18',
  //     user_idx: 8,
  //     gym_idx: 9,
  //     clearday: '2024-07-18',
  //     content: '오늘 성공했어요 18',
  //     media: 'www.example18.com',
  //     color: 'black',
  // username:'박지용',
  // created_at: '2024-07-18 00:00:00'
  //   },
  //   {
  //     post_idx: '19',
  //     user_idx: 9,
  //     gym_idx: 10,
  //     clearday: '2024-07-19',
  //     content: '오늘 성공했어요 19',
  //     media: 'www.example19.com',
  //     color: 'white',
  // username:'박지용',
  // created_at: '2024-07-19 00:00:00'
  //   },
  //   {
  //     post_idx: '20',
  //     user_idx: 10,
  //     gym_idx: 1,
  //     clearday: '2024-07-20',
  //     content: '오늘 성공했어요 20',
  //     media: 'www.example20.com',
  //     color: 'indigo',
  // username:'박지용',
  // created_at: '2024-07-20 00:00:00'
  //   }
];

export const BoardDatas = [
  {
    board_idx: 1,
    user_idx: 5,
    title: '이거 진짜 진짜 좋음 왜냐하면',
    category: '장비',
    username: '박지용',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 2,
    user_idx: 2,
    title: '이 제품 완전 추천합니다',
    category: '용품',
    username: '김민수',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 3,
    user_idx: 3,
    title: '정말 편리한 아이템이에요',
    category: '기타',
    username: '이서연',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 4,
    user_idx: 4,
    title: '효율이 정말 좋습니다',
    category: '장비',
    username: '최재혁',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 5,
    user_idx: 1,
    title: '강력 추천하는 아이템',
    category: '용품',
    username: '박서준',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 6,
    user_idx: 6,
    title: '정말 유용한 제품입니다',
    category: '기타',
    username: '김지수',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 7,
    user_idx: 7,
    title: '쓰고나서 만족도가 높아요',
    category: '장비',
    username: '장예은',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 8,
    user_idx: 8,
    title: '다른 사람에게도 추천합니다',
    category: '용품',
    username: '윤하준',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 9,
    user_idx: 9,
    title: '기대 이상으로 좋습니다',
    category: '기타',
    username: '서지훈',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 10,
    user_idx: 10,
    title: '다시 사고 싶은 제품입니다',
    category: '장비',
    username: '한예지',
    created_at: '2024-07-30T02:48:05.000Z',
  },
];

export const PostDatas = [
  {
    thumbnail_idx: 1,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 2,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 3,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 4,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 5,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 6,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 7,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 8,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 9,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 10,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 11,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
];

export const categoryListData = [
  { category_idx: 1, category: '전체' },
  { category_idx: 2, category: '장비' },
  { category_idx: 3, category: '부상및치료' },
  { category_idx: 4, category: '암장 리뷰' },
  { category_idx: 5, category: '잡담' },
];

export type metaType = {
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type UserType = {
  nickname: string;
  img: string;
};

export type LinkPreviewType = {
  title: string | null;
  img: string | null;
  link?: string | null;
};

export type BoardListDataType = {
  board_idx: number;
  user_idx: number;
  user: UserType;
  category: string;
  create_At: any;
  likeCount: number;
  commentCount: number;
  boardImg: string[];
  title: string;
  content: string;
  linkPreview?: LinkPreviewType;
};

export type BoardResponseType = {
  boards: BoardListDataType[];
  meta: metaType;
};

export const boardListData = {
  boards: [
    {
      board_idx: 1,
      user_idx: 1,
      user: {
        nickname: '지이용',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '장비',
      create_At: '2024-07-21T13:00:00.000Z',
      likeCount: 10,
      commentCount: 15,
      boardImg: [
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      ],
      title: '여러분 답지를 사용하는게 얼마나 이득이냐면요',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',

      linkPreview: {
        title:
          '네이버 매출 구글 턱밑까지 쫓아왔다! 글로벌 기업 1위 네이버의 근황',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        link: 'https://www.naver.com',
      },
    },
    {
      board_idx: 2,
      user_idx: 2,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '부상',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 8,
      commentCount: 30,
      boardImg: [
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      ],
      title: '여러분 답지를 사용하는게 얼마나 이득이냐면요',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 3,
      user_idx: 3,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 4,
      user_idx: 4,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 5,
      user_idx: 5,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 6,
      user_idx: 6,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 7,
      user_idx: 7,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 8,
      user_idx: 8,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 9,
      user_idx: 9,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
  ],
  meta: {
    page: 0,
    take: 10,
    totalCount: 3,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

export const noticeListData = [
  {
    subtitle: '야구선수 황재균과 그룹 티아라 출신 지연의 이혼',
    contents: [
      '✅9월 운영 안내',
      '🤫 엄마 몰래 하는 클라이밍, ',
      '9월의 강습 확인해보세요',
    ],
    links: [
      'https://www.naver.com',
      'https://www.google.com',
      'https://www.youtube.com',
    ],
  },
  {
    subtitle: '이 위원은 "황재균 이혼한 것 아냐',
    contents: [
      'Most core web frameworks do not come with an opinionated way of fetching or updating data in a holistic way. Because of this developers end up building either meta-frameworks which encapsulate strict opinions about data-fetching, or they invent their own ways of fetching data. This usually means cobbling together component-based state and side-effects, or using more general purpose state management libraries to store and',
    ],
    link: [],
  },
  {
    subtitle: '#구독자 여러분',
    contents: [
      'If youre not overwhelmed by that list, then that must mean that youve probably solved all of your server state problems already and deserve an award. However, if you are like a vast majority of people, you either have yet to tackle all or most of these challenges and were only scratching the surf',
    ],
    link: [],
  },
  {
    subtitle: '부탁드린다"라며 "밝은 모습으로 돌아오겠',
    contents: [
      'Most core web frameworks do not come with an opinionated way of fetching or updating data in a holistic way. Because of this developers end up building either meta-frameworks which encapsulate strict opinions about data-fetching, or they invent their own ways of fetching data. This usually means cobbling together component-based state and side-effects, or using more general purpose state management libraries to store and',
    ],
    link: [],
  },
  {
    subtitle: '세계최고 뉴진스 8월 뉴진스 소식 ',
    contents: [
      '5명의 멤버가 모여 어딘가 자유분방하면서도 결합력 있는 독특한 퍼포먼스를 선보인다. 소녀들이 재밌게 즐긴다란 표현이 어울리는 뉴진스만의 청춘 하이틴스러운 컨셉은 자연스럽다라는 느낌을 주어, 뉴진스가 많은 대중들에게 사랑 받는 데에 크게 기여한다.데뷔곡 Attention과 Hype Boy에서부터 대중들의 눈길을 사로잡는 참신한 군무로 자칫하면 어려보이기만 할 수 있는 십대들을 데리고 최적의 컨셉으로 밀고나갔다라는 평을 받으며 그룹의 이미지를 확실하게 각인시켰다. 이후 발매된 Ditto와 Super Shy 등 여러 곡에서 역시 무대를 순수하게 즐기며 뛰노는듯한 멤버들의 모습으로 좋은 평가를 받았다',
    ],
    link: [],
  },
];


export type noticeDummyType = {
  notice_idx: number;
  title: string;
  content: string;
  createdAt: any;
  type: string;
};

export const noticeDummy: noticeDummyType[] = [
  {
    notice_idx: 1,
    title:
      "version 1.1.0업데이트 안내,version 1.1.0업데이트 안내version 1.1.0업데이트 안내version 1.1.0업데이트 안내",
    content:
      "안녕하세요 오늘부로 답지 앱 최신 버전업데이트 했습니다. 좋댓글, 많관부~~",
    createdAt: "2024-12-30T06:31:47.000Z",
    type: "일반",
  },
  {
    notice_idx: 2,
    title: "답지 콜라보 이벤트",
    content:
      "안녕하세요 다음주부터 답지랑 콜라보 굿즈 및 클라이밍장 할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요  할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요 할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요 할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요 할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요 할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요 할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요 할인권 이벤트 시작합니다! 많은 이벤트 참여여 부탁드려요",
    createdAt: "2024-12-31T08:10:47.000Z",
    type: "긴급",
  },
  {
    notice_idx: 3,
    title: "새해 맞이 특별 이벤트",
    content:
      "안녕하세요! 새해를 맞아 특별 이벤트를 진행합니다. 다양한 선물이 기다리고 있으니 꼭 참여해주세요!",
    createdAt: "2025-01-01T09:00:00.000Z",
    type: "일반",
  },
  {
    notice_idx: 4,
    title: "서버 점검 안내",
    content:
      "안녕하세요, 1월 5일 새벽 2시부터 4시까지 서버 점검이 예정되어 있습니다. 서비스 이용에 참고 부탁드립니다.",
    createdAt: "2025-01-02T14:00:00.000Z",
    type: "일반",
  },
  {
    notice_idx: 5,
    title: "사용자 피드백 요청",
    content:
      "안녕하세요! 여러분의 소중한 피드백을 기다리고 있습니다. 앱 사용 중 불편한 점이나 개선사항을 알려주세요.",
    createdAt: "2025-01-03T11:00:00.000Z",
    type: "긴급",
  },
  {
    notice_idx: 6,
    title: "1월 신규 기능 안내",
    content:
      "안녕하세요! 이번 달 새롭게 추가된 기능을 소개합니다. 자세한 내용은 앱 내 공지사항을 확인해주세요.",
    createdAt: "2025-01-04T10:00:00.000Z",
    type: "일반",
  },
  {
    notice_idx: 7,
    title: "이벤트 당첨자 발표",
    content:
      "안녕하세요! 지난 이벤트 당첨자를 발표합니다. 당첨되신 분들께는 개별적으로 연락드릴 예정입니다.",
    createdAt: "2025-01-05T12:30:00.000Z",
    type: "일반",
  },
  {
    notice_idx: 8,
    title: "겨울 할인 프로모션",
    content:
      "안녕하세요! 이번 겨울 특별 할인 프로모션을 진행합니다. 할인 내용은 앱 내 프로모션 페이지에서 확인하세요.",
    createdAt: "2025-01-06T08:20:00.000Z",
    type: "긴급",
  },
  {
    notice_idx: 9,
    title: "서비스 약관 변경 안내",
    content:
      "안녕하세요! 2025년 2월 1일부터 변경되는 서비스 약관 내용을 공지드립니다. 변경된 내용을 꼭 확인해주세요.",
    createdAt: "2025-01-07T09:00:00.000Z",
    type: "일반",
  },
  {
    notice_idx: 10,
    title: "고객센터 운영시간 변경",
    content:
      "안녕하세요! 고객센터 운영시간이 변경되었습니다. 평일 오전 9시부터 오후 6시까지 운영됩니다.",
    createdAt: "2025-01-08T08:00:00.000Z",
    type: "일반",
  },
  {
    notice_idx: 11,
    title: "추천 기능 업데이트",
    content:
      "안녕하세요! 추천 기능이 새롭게 업데이트되었습니다. 관심 있는 콘텐츠를 더 쉽게 찾아보세요!",
    createdAt: "2025-01-09T07:45:00.000Z",
    type: "일반",
  },
  {
    notice_idx: 12,
    title: "사용자 가이드 추가",
    content:
      "안녕하세요! 앱 사용법을 더 쉽게 이해할 수 있도록 사용자 가이드를 추가했습니다. 확인해보세요!",
    createdAt: "2025-01-10T10:30:00.000Z",
    type: "일반",
  },
];
