/**
 * Interface for the author object in package.json
 */
export interface AuthorObject {
  name: string;
  email?: string;
  url?: string;
}

/**
 * Interface for the repository object in package.json
 */
export interface RepositoryObject {
  type: string;
  url: string;
}

/**
 * Interface for the bugs object in package.json
 */
export interface BugsObject {
  url?: string;
  email?: string;
}

export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  repository?: RepositoryObject | string;
  bugs?: BugsObject;
  homepage?: string;
  author: string | AuthorObject;
  license?: string;
}
