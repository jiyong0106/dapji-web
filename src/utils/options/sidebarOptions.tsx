import {
  HomeIcon,
  UserIcon,
  BordIcon,
  SettingIcon,
  PictureIcon,
  UploadIcon,
} from '@/public/icon';

export const pageMenuItems = (id: number) => [
  { label: '홈', icon: <HomeIcon />, path: '/gym' },
  { label: '게시판', icon: <BordIcon />, path: '/board' },
  // { label: '검색', icon: <HomeIcon />, path: '/search' },
  {
    label: '프로필',
    icon: <UserIcon />,
    path: (id: number) => `/profile/${id}`,
  },
];

export const bottomMenuItems = [
  { label: '설정', icon: <SettingIcon />, path: '/settings' },
  { label: '문의', icon: <PictureIcon />, path: '/contact' },
];
