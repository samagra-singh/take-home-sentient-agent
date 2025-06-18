import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type {
  PackageJson,
  AuthorObject,
  RepositoryObject,
  BugsObject,
} from './project-info.types';

// --- Helper Validation Functions ---

/**
 * Validates if a value is a non-empty string.
 * @param value The value to validate.
 * @returns True if the value is a non-empty string, false otherwise.
 */
const isValidNonEmptyString = (value: unknown): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validates if a string is a basic URL format.
 * @param url The URL string to validate.
 * @returns True if the URL matches a basic pattern, false otherwise.
 */
const isValidUrl = (url: unknown): boolean => {
  if (typeof url !== 'string') return false;
  try {
    new URL(url as string); // Type assertion as it's already checked for string
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates if a string is a basic email format.
 * @param email The email string to validate.
 * @returns True if the email matches a basic pattern, false otherwise.
 */
const isValidEmail = (email: unknown): boolean => {
  if (typeof email !== 'string') return false;
  // Basic email regex (not exhaustive but covers common cases)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email as string); // Type assertion
};

export interface ProjectInfoAPIResponse {
  name: string;
  version: string;
  description?: string;
  repository?: RepositoryObject;
  bugs?: BugsObject;
  homepage?: string;
  author?: AuthorObject;
  license?: string;
}

/**
 * Handles GET requests to the /api/project-info endpoint.
 * This API reads the project's package.json file, extracts relevant information,
 * validates required fields, and returns it as a JSON response.
 */
export async function GET() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const fileContents = await fs.readFile(packageJsonPath, 'utf8');
    const pkg: PackageJson = JSON.parse(fileContents);

    const errors: string[] = [];

    // Validate 'name'
    if (!isValidNonEmptyString(pkg.name)) {
      errors.push("Property 'name' is missing or empty in package.json.");
    }

    // Validate 'version'
    if (!isValidNonEmptyString(pkg.version)) {
      errors.push("Property 'version' is missing or empty in package.json.");
    }

    // Validate 'author'
    let authorInfo: AuthorObject | undefined;
    if (!pkg.author) {
      errors.push("Property 'author' is missing in package.json.");
    } else {
      if (typeof pkg.author === 'string') {
        const authorString = pkg.author as string; // Assert to string
        const match = authorString.match(/(.*?)\s*<(.*?)>(?:\s*\((.*?)\))?/);
        if (match) {
          authorInfo = {
            name: match[1].trim(),
            email:
              match[2] && isValidEmail(match[2])
                ? (match[2] as string)
                : undefined,
            url:
              match[3] && isValidUrl(match[3])
                ? (match[3] as string)
                : undefined,
          };
          if (!isValidNonEmptyString(authorInfo.name)) {
            errors.push('Author name derived from string format is empty.');
          }
        } else {
          authorInfo = { name: authorString.trim() };
          if (!isValidNonEmptyString(authorInfo.name)) {
            errors.push('Author name from string format is empty.');
          }
        }
      } else if (typeof pkg.author === 'object' && pkg.author !== null) {
        authorInfo = {
          name: pkg.author.name,
          email: pkg.author.email || undefined,
          url: pkg.author.url || undefined,
        };
        if (!isValidNonEmptyString(authorInfo.name)) {
          errors.push("Author object's 'name' is missing or empty.");
        }
        if (authorInfo.email && !isValidEmail(authorInfo.email)) {
          errors.push("Author object's 'email' is invalid.");
        }
        if (authorInfo.url && !isValidUrl(authorInfo.url)) {
          errors.push("Author object's 'url' is invalid.");
        }
      } else {
        errors.push(
          "Property 'author' has an invalid format (must be string or object).",
        );
      }
    }

    // Validate 'description'
    if (pkg.description !== undefined && typeof pkg.description !== 'string') {
      errors.push("Property 'description' must be a string if provided.");
    }

    // Validate 'repository'
    let repositoryInfo: RepositoryObject | undefined;
    if (pkg.repository !== undefined) {
      if (typeof pkg.repository === 'string') {
        const repoString = pkg.repository as string; // Assert to string
        if (!isValidUrl(repoString) && !repoString.startsWith('git+')) {
          errors.push(
            "Property 'repository' (string) is not a valid URL or git+ URL format.",
          );
        }
        repositoryInfo = { type: 'git', url: repoString };
      } else if (
        typeof pkg.repository === 'object' &&
        pkg.repository !== null
      ) {
        if (!isValidNonEmptyString(pkg.repository.type)) {
          errors.push("Repository object's 'type' is missing or empty.");
        }
        const repoUrl = pkg.repository.url;
        if (!isValidUrl(repoUrl) && !repoUrl.startsWith('git+')) {
          errors.push(
            "Repository object's 'url' is missing, empty, or invalid.",
          );
        }
        repositoryInfo = {
          type: pkg.repository.type || 'unknown',
          url: repoUrl,
        };
      } else {
        errors.push(
          "Property 'repository' has an invalid format (must be string or object).",
        );
      }
    }

    // Validate 'bugs'
    let bugsInfo: BugsObject | undefined;
    if (pkg.bugs !== undefined) {
      if (typeof pkg.bugs === 'object' && pkg.bugs !== null) {
        bugsInfo = {
          url: pkg.bugs.url || undefined,
          email: pkg.bugs.email || undefined,
        };
        if (bugsInfo.url && !isValidUrl(bugsInfo.url)) {
          errors.push("Bugs object's 'url' is invalid.");
        }
        if (bugsInfo.email && !isValidEmail(bugsInfo.email)) {
          errors.push("Bugs object's 'email' is invalid.");
        }
      } else {
        errors.push(
          "Property 'bugs' has an invalid format (must be an object).",
        );
      }
    }

    // Validate 'homepage'
    if (pkg.homepage !== undefined && !isValidUrl(pkg.homepage)) {
      errors.push("Property 'homepage' is not a valid URL.");
    }

    // Validate 'license'
    if (pkg.license !== undefined && !isValidNonEmptyString(pkg.license)) {
      errors.push("Property 'license' must be a non-empty string if provided.");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed for package.json fields', details: errors },
        { status: 400 },
      );
    }

    const apiResponse: ProjectInfoAPIResponse = {
      name: pkg.name!,
      version: pkg.version!,
      description: pkg.description,
      repository: repositoryInfo,
      bugs: bugsInfo,
      homepage: pkg.homepage,
      author: authorInfo,
      license: pkg.license,
    };

    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error) {
    console.error('Failed to read or parse package.json:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 },
    );
  }
}
