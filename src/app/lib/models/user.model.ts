
export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  isBlocked?: boolean;
  isActive?: boolean;
  roles?: string[];
  profilePicture?: string;
  phone?: string;
  status?: string;
  online?: string;
  bio?: string;
  created?: string;
  isEmailSent?: boolean;
  userSystemLevelWarnings?: UserWarningType[];
  userWarnings?: UserWarningType[];
  imageURL?: string;
}

export interface UserWarningType {
  id?: string;
  updated?: string;
  message?: string;
  warnedBy?: User;
}
