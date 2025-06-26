import { z as zod } from 'zod';

export const ZPackageJSON = zod.object({
  name: zod.string().trim().min(1, 'Project name is required and can not be empty'),
  version: zod.string().trim().min(1, 'Version is required and can not be empty'),
  author: zod.union([
    zod.string().trim().min(1, 'Author info is required and can not be empty'),
    zod.object({
      name: zod.string().trim().min(1, 'Author name is required and can not be empty'),
      email: zod.string().trim().email('Author email must be a valid email').optional(),
      url: zod.string().trim().url('Author URL must be a valid URL').optional(),
    }),
  ]),
  description: zod.string().trim().optional(),
  homepage: zod.string().trim().url('Homepage must be a valid URL').optional(),
});
export type PackageJSON = zod.infer<typeof ZPackageJSON>;

// Normalized author object
export type AuthorObject = {
  name: string;
  email?: string;
  url?: string;
};

export type GetProjectInfoResponse = {
  error: null | Error;
  projectInfo?: Omit<PackageJSON, 'author'> & { author: AuthorObject };
};
