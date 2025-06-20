import { getNPMScriptOutput, validateOutputPatterns } from './utils.js';

const scriptName = 'Test';

const runTests = () => {
  try {
    console.log(`🧪 Running ${scriptName} ...`);

    // Run the test command and capture output
    const output = getNPMScriptOutput('test:coverage');

    // Asserted in order
    const expectedPatterns = [
      // Package and command info - flexible version
      { pattern: /^> take-home-sentient-agent@\d+\.\d+\.\d+ test:coverage$/ },
      { pattern: /^> jest --coverage$/ },

      // Test results - flexible file paths
      { pattern: /^PASS .+\.(spec|test)\.(tsx|jsx|ts|js)$/, expectMany: true },

      // Coverage table header
      { pattern: /^-+\|-+\|-+\|-+\|-+\|-+$/ },
      { pattern: /^File\s+\|\s+% Stmts\s+\|\s+% Branch\s+\|\s+% Funcs\s+\|\s+% Lines\s+\|\s+Uncovered Line #s$/ },
      { pattern: /^-+\|-+\|-+\|-+\|-+\|-+$/ },

      // Coverage table rows - flexible file paths and percentages
      { pattern: /^All files\s+\|\s+\d+(\.\d+)?\s+\|\s+\d+(\.\d+)?\s+\|\s+\d+(\.\d+)?\s+\|\s+\d+(\.\d+)?\s+\|$/ },
      { pattern: /^.+(\.(tsx|jsx|ts|js))?\s+\|\s+\d+(\.\d+)?\s+\|\s+\d+(\.\d+)?\s+\|\s+\d+(\.\d+)?\s+\|\s+\d+(\.\d+)?\s+\|(\s+((\d+)|(\d+-\d+))(,((\d+)|(\d+-\d+)))*)?$/, expectMany: true },

      // Coverage table footer
      { pattern: /^-+\|-+\|-+\|-+\|-+\|-+$/ },

      // Jest summary patterns - flexible counts
      { pattern: /^Test Suites:\s+\d+ passed, \d+ total$/ },
      { pattern: /^Tests:\s+\d+ passed, \d+ total$/ },
      { pattern: /^Snapshots:\s+\d+ total$/ },
      { pattern: /^Time:\s+\d+\.\d+ s$/ },
      { pattern: /^Ran all test suites\.$/ },
    ];

    // Validate output against expected patterns
    validateOutputPatterns(output, expectedPatterns, 'Test');
  } catch (error) {
    console.error(`❌ ${scriptName} failed:`, error.message);
    if (error.stdout) {
      console.error('Output:', error.stdout);
    }
    process.exit(1);
  }
};

runTests();
