'use server';

import { promises as fs } from 'fs';
import * as path from 'path';

import type {
  AuthorObject,
  GetProjectInfoResponse,
  PackageJSON,
} from './project-info.types';
import { ZPackageJSON } from './project-info.types';

/**
 * Parses author information from package.json format
 */
const parseAuthor = (author: PackageJSON['author']): AuthorObject => {
  if (typeof author !== 'string') {
    return author;
  }

  const emailFirstMatch = author.match(/^([^<(]+)\s*<([^>]+)>(\s*\(([^)]+)\))?$/);
  if (emailFirstMatch !== null) {
    const email = emailFirstMatch[2] !== undefined ? emailFirstMatch[2] : undefined;
    const url = emailFirstMatch[4] !== undefined ? emailFirstMatch[4] : undefined;

    return {
      name: emailFirstMatch[1].trim(),
      email: email,
      url: url,
    };
  }

  const urlFirstMatch = author.match(/^([^<(]+)\s*\(([^)]+)\)(\s*<([^>]+)>)?$/);
  if (urlFirstMatch !== null) {
    const email = urlFirstMatch[4] !== undefined ? urlFirstMatch[4] : undefined;
    const url = urlFirstMatch[2] !== undefined ? urlFirstMatch[2] : undefined;

    return {
      name: urlFirstMatch[1].trim(),
      email: email,
      url: url,
    };
  }

  return { name: author };
};

const getProjectInfo = async (): Promise<GetProjectInfoResponse> => {
  const response: GetProjectInfoResponse = {
    error: null,
  };

  try {
    const packageJSONPath = path.join(process.cwd(), 'package.json');
    const packageJSON = ZPackageJSON.parse(
      JSON.parse(await fs.readFile(packageJSONPath, 'utf8')),
    );

    response.projectInfo = {
      ...packageJSON,
      author: parseAuthor(packageJSON.author),
    };
  } catch (error) {
    console.error('Error getting project info.', error);
    response.error = new Error('Error getting project information.');
  }

  console.info('getProjectInfo', 'response', response);
  return response;
};

export default getProjectInfo;
