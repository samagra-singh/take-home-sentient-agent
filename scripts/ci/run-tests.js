import { getNPMScriptOutput, validateOutputPatterns } from './utils.js';

const scriptName = 'Test';

const runTests = () => {
  try {
    console.log(`🧪 Running ${scriptName} ...`);

    // Run the test command and capture output
    const output = getNPMScriptOutput('test');

    // Asserted in order
    const expectedPatterns = [
      // Package and command info - flexible version
      { pattern: /^> take-home-sentient-agent@\d+\.\d+\.\d+ test$/ },
      { pattern: /^> jest$/ },

      // Test results - flexible file paths
      { pattern: /^PASS .+\.(spec|test)\.(tsx|jsx|ts|js)$/, expectMany: true },

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
