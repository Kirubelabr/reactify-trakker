import { User } from "../../../lib/models/user.model";
import { httpService } from "../../../lib/services/http.service";
import { accountEndpoint } from "./account.endpoints";


export const loginApi = (username: string, password: string) => {
  return httpService
    .post(accountEndpoint.login, {
      username,
      password,
    })
    .then((response) => {
      return response?.data;
    });
};

export const googleLoginApi = (tokenId: string) => {
  return httpService
    .post(`${accountEndpoint.googleLogin}/${tokenId}`)
    .then((response) => {
      return response?.data;
    });
};

export const facebookLoginApi = (tokenId: string) => {
  return httpService
    .post(`${accountEndpoint.facebookLogin}/${tokenId}`)
    .then((response) => {
      return response?.data;
    });
};

export const forgotPasswordApi = (forgotUser: any) => {
  return httpService
    .post(accountEndpoint.forgotPassword, forgotUser)
    .then((response) => {
      return response?.data;
    });
};

export const registerApi = (user: User) => {
  return httpService.post(accountEndpoint.register, user).then(
    (response) => {
      return response?.data;
    },
    (error) => {
      throw error;
    }
  );
};

export const accountResendAPI = (email: string) => {
  return httpService
    .post(accountEndpoint.resend, {
      email: email,
      clientId: 'accounts',
    })
    .then((response) => {
      return response?.data;
    });
};

export const resetPasswordApi = (
  userId: string,
  token: string,
  password: string
): any => {
  return httpService
    .put(`${accountEndpoint.resetPassword}${userId}/${token}`, {
      password: password,
    })
    .then((response) => {
      return response?.data;
    });
};

export const activateApi = (userId: string, token: string): any => {
  return httpService
    .put(`${accountEndpoint.activate}${userId}/${token}`)
    .then((response) => {
      return response?.data;
    });
};

export const isEmailExistApi = (email: string) => {
  return httpService
    .post(`${accountEndpoint.isEmailExist}`, { email: email })
    .then((response) => {
      return response?.data;
    });
};
export const verifyPhoneApi = (userDetail: any) => {
  return httpService
    .post(accountEndpoint.phoneVerify, userDetail)
    .then((response) => {
      return response?.data;
    });
};
