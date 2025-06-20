import fs from 'fs';
import { execSync } from 'child_process';

export const getNPMScriptOutput = (scriptName) => {
  const outputFileName = `${scriptName.replace(':', '-')}-${new Date().getTime()}.log`;
  execSync(`npm run ${scriptName} 2>&1 | tee ${outputFileName}`, {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  return fs.readFileSync(outputFileName, 'utf8');
};

/**
 * Validates command output against expected patterns
 * @param {string} output - Raw command output
 * @param {Array<{pattern: RegExp, expectMany?: boolean, optional?: boolean}>} expectedPatterns
 * - `expectMany` and `optional` can't both be `true`. Not supported yet.
 * @param {string} scriptName - Name of the script for error messages
 */
export const validateOutputPatterns = (output, expectedPatterns, scriptName) => {
  const outputWithLineNumbers = formatOutputWithLineNumbers(output);

  // Check patterns in exact order
  const linesInOutput = output.split('\n').map(line => line.trim());
  let lineIndex = 0;
  let patternIndex = 0;

  while (patternIndex < expectedPatterns.length && lineIndex < linesInOutput.length) {
    if (linesInOutput[lineIndex] === '') {
      lineIndex++;
      continue;
    }

    const { pattern, expectMany = false, optional = false } = expectedPatterns[patternIndex];

    if (optional) {
      if (!pattern.test(linesInOutput[lineIndex])) {
        console.warn(`❌ ${scriptName} output missing expected pattern (optional):`);
        console.warn(`  - Expected pattern: ${pattern.source}`);
        console.warn(`  - Received at line ${lineIndex + 1}: "${linesInOutput[lineIndex] || 'EOF'}"`);
      } else {
        lineIndex++;
      }
      patternIndex++;
    } else if (expectMany) {
      // For expectMany patterns, keep matching until we find a line that doesn't match
      // Must match at least once
      let matchCount = 0;
      while (lineIndex < linesInOutput.length && pattern.test(linesInOutput[lineIndex])) {
        lineIndex++;
        matchCount++;
      }
      if (matchCount === 0) {
        console.error(`❌ ${scriptName} output missing expected pattern (expectMany requires at least one match):`);
        console.error(`  - ${pattern.source}`);
        console.error(`  - Expected at line ${lineIndex + 1}: "${linesInOutput[lineIndex] || 'EOF'}"`);
        console.error('\nActual output:');
        console.error(outputWithLineNumbers);
        process.exit(1);
      }
      patternIndex++;
    } else {
      // For single patterns, check if current line matches
      if (pattern.test(linesInOutput[lineIndex])) {
        lineIndex++;
        patternIndex++;
      } else {
        console.error(`❌ ${scriptName} output missing expected pattern in order:`);
        console.error(`  - Expected pattern: ${pattern.source}`);
        console.error(`  - Received at line ${lineIndex + 1}: "${linesInOutput[lineIndex] || 'EOF'}"`);
        console.error('\nActual output:');
        console.error(outputWithLineNumbers);
        process.exit(1);
      }
    }
  }

  // Check if we've processed all patterns
  if (patternIndex < expectedPatterns.length) {
    console.error(`❌ ${scriptName} output missing expected patterns:`);
    for (let i = patternIndex; i < expectedPatterns.length; i++) {
      console.error(`  - ${expectedPatterns[i].pattern.source}`);
    }
    console.error('\nActual output:');
    console.error(outputWithLineNumbers);
    process.exit(1);
  }

  // Check for unexpected messages (remaining lines after all patterns)
  const unexpectedLines = linesInOutput.slice(lineIndex);
  // Any remaining lines must be empty
  if (unexpectedLines.filter(line => line !== '').length > 0) {
    console.error(`❌ ${scriptName} output contains unexpected messages:`);
    unexpectedLines.forEach(line => {
      console.error(`  - ${line}`);
    });
    console.error('\nFull output:');
    console.error(outputWithLineNumbers);
    process.exit(1);
  }

  console.log(`✅ ${scriptName} passed with expected output.`);
  console.log(outputWithLineNumbers);
};

/**
 * Formats output with line numbers for display
 * @param {string} output - Raw command output
 * @returns {string} - Formatted output with line numbers
 */
export const formatOutputWithLineNumbers = (output) => {
  return output.split('\n').map((line, index) => `[${`   ${(index + 1).toString()}`.slice(-4)}] ${line}`).join('\n');
};
