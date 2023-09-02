const devMode: boolean = 
  Number(import.meta.env.VITE_APP_DEV_MODE) === 1 
    ? true 
    : false;

export const serverUri: string = 
  devMode
    ? import.meta.env.VITE_APP_URI_DEV 
    : import.meta.env.VITE_APP_URI_PROD;

export const basename: string = 
  devMode 
    ? ''
    : import.meta.env.VITE_APP_BASENAME;
