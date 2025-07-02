export let HOST_NAME: any = "https://apibeta.uiwiki.co";
export let FRONTEND_HOST_NAME: any = "https://beta.uiwiki.co";
export let CLOUDFRONT_DOMAIN: string = "https://d2viq8pnr9yec8.cloudfront.net";


export const handleGoogleSignIn = () => {
  window.location.href = `${HOST_NAME}/auth/google`;
};