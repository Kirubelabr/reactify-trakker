import { environment } from "../../../../environments/environment";

export const accountEndpoint = {
  login: `${environment.urls.api}/users/login`,
  register: `${environment.urls.api}/users/signup`,
  resend: `${environment.urls.api}/users/resend`,
  resetPassword: `${environment.urls.api}/account/updateForgotPassword/`,
  forgotPassword: `${environment.urls.api}/account/forgotPassword/`,
  activate: `${environment.urls.api}/account/activate/`,
  googleLogin: `${environment.urls.api}/account/googleLogin`,
  facebookLogin: `${environment.urls.api}/account/facebookLogin`,
  isEmailExist: `${environment.urls.api}/account/isEmailExist`,
  phoneVerify: `${environment.urls.api}/account/verify-phone`,
};
