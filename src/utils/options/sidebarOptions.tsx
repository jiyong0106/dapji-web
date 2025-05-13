import {
  HomeIcon,
  UserIcon,
  BordIcon,
  SettingIcon,
  PictureIcon,
  UploadIcon,
} from '@/public/icon';

export const pageMenuItems = (id?: number | null) => [
  { label: '홈', icon: <HomeIcon />, path: '/gym' },
  { label: '게시판', icon: <BordIcon />, path: '/board' },
  {
    label: '프로필',
    icon: <UserIcon />,
    path: id ? `/profile/${id}` : '/signin',
  },
];

export const bottomMenuItems = [
  { label: '설정', icon: <SettingIcon />, path: '/settings' },
  { label: '문의', icon: <PictureIcon />, path: '/contact' },
];
