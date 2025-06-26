import { type ToastOptions } from 'react-toastify';

import { type User } from '@/actions/users/users.types';

// Help make it explicit that different tooltip types should have appropriate description and goals.
export enum TooltipIds {
  CLICKABLE_NO_FOCUS = 'tooltip-clickable-no-focus',
};

// Explicit options are needed when modifying toasts. This will ensure options are consistent across global and individual toasts.
export const ToastConfigs: ToastOptions = {
  autoClose: 5000,
  closeButton: true,
  draggable: 'touch',
};

export const defaultUserAvatar = 'default.webp';

// Used when resetting DB and to infer user when cookie is not set.
export const defaultUser: User = {
  // Remember, there's an avatar in public/avatars that uses this ID.
  id: '34e9131f-d57b-4e31-85f2-a920c3d19878',
  name: 'Samagra Singh Tomar',
  email: 'hey@samagrasingh.com',
  tokens: ['29e48918-f884-4f0b-9d25-fbd24a2dd05a'],
};

// Auth constants
export const authTokenCookieName = 'sentient-auth-token';
export const isUnauthorizedParamName = 'is-unauthorized';
export const redirectUrlParamName = 'redirect-url';
export const homePagePathName = '/conversation';
export const signInPagePathName = '/signin';

export const fontVars: { [key: string]: `--${string}` } = {
  jakartaSans: '--font-jakarta',
  nunitoSans: '--font-nunito',
};
