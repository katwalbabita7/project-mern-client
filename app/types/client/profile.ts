export interface UserImage {
  path: string;
}

export interface User {
  _id: string;
  full_name: string;
  email: string;
  phone?: string;
  role?: string;
  profile_image?: UserImage;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ProfileHeaderProps {
  user: any;
}
export interface ChangeEmailFormProps {
  onSuccess?: () => void;
}
export interface AccountOverviewProps {
  user?: User | null;
  onDeleteAccount: () => void;
  isDeleting: boolean;
}