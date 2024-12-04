import { baseURL } from '@/src/utils/axios';

const OauthPopup = (authType: string) => {
  window.location.href = `${baseURL}/api/auth/web/${authType}`;
};

export default OauthPopup;
