import { baseURL } from '@/src/utils/axios';

const OauthPopup = (authType: string) => {
  window.location.href = `${baseURL}/auth/web/${authType}`;
};

export default OauthPopup;
