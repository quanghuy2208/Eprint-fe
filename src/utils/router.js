export const ROUTERS = {
  USER: {
    LOGIN: 'login',
    HOME: '',
    PROFILE: 'Thong-tin-ca-nhan',
    ABOUT: {
      PATH: 'About-us',
      RECRUIT: {
        PATH: 'About-us/recruit',
        POSITION: 'About-us/recruit/position',
      },
    },
    CATEGORY: {
      PATH: 'category',
      DETAIL: 'category/Product-type/Product-detail',
      TYPE: 'category/Product-type',
    },
    DESIGN: {
      PATH: 'design',
      LOGO: 'design/logo',
    },
    PROJECT: 'Dự-án',
    SOURCE: 'Tài-nguyên',
    POLICY: 'policy',
    ORDER: 'order',
  },
  ADMIN: {
    PATH: 'system/admin',
  },
};
export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
