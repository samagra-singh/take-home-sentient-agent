import { getNPMScriptOutput, validateOutputPatterns } from './utils.js';

const scriptName = 'Lint';

const runLint = () => {
  try {
    console.log(`🔍 Running ${scriptName} ...`);

    // Run the lint command and capture output
    const output = getNPMScriptOutput('lint');

    // Expected patterns for successful linting
    const expectedPatterns = [
      // Package and command info - flexible version
      { pattern: /^> take-home-sentient-agent@\d+\.\d+\.\d+ lint$/ },
      { pattern: /^> next lint$/ },

      // Next telemetry warning
      { pattern: /^Attention: Next\.js now collects completely anonymous telemetry regarding usage\.$/, optional: true },
      { pattern: /^This information is used to shape Next\.js' roadmap and prioritize features\.$/, optional: true },
      { pattern: /^You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:$/, optional: true },
      { pattern: /^https:\/\/nextjs\.org\/telemetry$/, optional: true },

      // ESLint output - should be clean with no issues
      { pattern: /^✔ No ESLint warnings or errors$/ },
    ];

    // Validate output against expected patterns
    validateOutputPatterns(output, expectedPatterns, 'Lint');
  } catch (error) {
    console.error(`❌ ${scriptName} failed:`, error.message);
    if (error.stdout) {
      console.error('Output:', error.stdout);
    }
    process.exit(1);
  }
};

runLint();
