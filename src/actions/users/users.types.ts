import { z as zod } from 'zod';

export const ZUser = zod.object({
  id: zod.string().trim().uuid({
    // version: 'v4',
    message: 'User ID is required and must be a valid UUID v4.',
  }),
  name: zod.string().trim().min(1, 'User name is required and can not be empty'),
  email: zod.string().trim().email('User email must be a valid email address'),
  tokens: zod.array(
    zod.string().trim().uuid({
      // version: 'v4',
      message: 'Token ID must be a valid UUID v4.',
    }),
  ),
});
export type User = zod.infer<typeof ZUser>;

export const ZUsers = zod.array(ZUser);
export type Users = zod.infer<typeof ZUsers>;

export type AuthenticatedUser = Omit<User, 'tokens'>;
export type GetCurrentUserResponse =
  { error: Error } |
  { error: null; user: AuthenticatedUser };

export type SigninAsDefaultUserResponse = {
  error: null | Error;
  success?: boolean;
};

export type SignOutResponse = {
  error: null | Error;
  success?: boolean;
};
