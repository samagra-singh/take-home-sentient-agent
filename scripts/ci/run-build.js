import { getNPMScriptOutput, validateOutputPatterns } from './utils.js';

const scriptName = 'Build';

const runBuild = () => {
  try {
    console.log(`🏗️  Running ${scriptName} ...`);

    // Run the build command and capture output
    const output = getNPMScriptOutput('build');

    // Expected patterns with flexible matching
    const expectedPatterns = [
      // Package and command info - flexible version
      { pattern: /^> take-home-sentient-agent@\d+\.\d+\.\d+ build$/ },
      { pattern: /^> next build$/ },

      // Next.js version and build process
      { pattern: /^▲ Next\.js \d+\.\d+\.\d+$/ },
      { pattern: /^- Environments: .env$/, optional: true },
      { pattern: /^Creating an optimized production build \.\.\.$/ },
      { pattern: /^Retrying\s+\d+\/\d+\.\.\.$/, optional: true },
      { pattern: /^✓ Compiled successfully in \d+(\.\d+)?m?s$/ },
      { pattern: /^Linting and checking validity of types \.\.\.$/ },
      // [TODO] Add handling for console logs from server actions.
      { pattern: /^Collecting page data \.\.\.$/ },
      { pattern: /^Generating static pages \(\d+\/\d+\) \.\.\.$/ },
      { pattern: /^Generating static pages \(\d+\/\d+\)$/, expectMany: true },
      { pattern: /^✓ Generating static pages \(\d+\/\d+\)$/ },
      { pattern: /^Finalizing page optimization \.\.\.$/ },
      { pattern: /^Collecting build traces \.\.\.$/ },

      // Route table header
      { pattern: /^Route \(app\)\s+Size\s+First Load JS$/ },
      // Route patterns - flexible paths and sizes
      { pattern: /^┌ [○ƒ] \/\s+\d+(\.\d+)? [k|m]?B\s+\d+(\.\d+)? [k|m]?B$/ },
      { pattern: /^├ [○ƒ] \/[^\s]*\s+\d+(\.\d+)? [k|m]?B\s+\d+(\.\d+)? [k|m]?B$/, expectMany: true },
      { pattern: /^└ [○ƒ] \/[^\s]*\s+\d+(\.\d+)? [k|m]?B\s+\d+(\.\d+)? [k|m]?B$/ },
      // Chunk information - flexible chunk names and sizes
      { pattern: /^\+ First Load JS shared by all\s+\d+(\.\d+)? [k|m]?B$/ },
      { pattern: /^├ chunks\/[a-f0-9-]+\.js\s+\d+(\.\d+)? [k|m]?B$/, expectMany: true },
      { pattern: /^└ other shared chunks \(total\)\s+\d+(\.\d+)? [k|m]?B$/ },

      // Rendering indicators
      { pattern: /^[○ƒ]\s+\(Static\)\s+prerendered as static content$/ },
      { pattern: /^[○ƒ]\s+\(Dynamic\)\s+server-rendered on demand$/ },
    ];

    // Validate output against expected patterns
    validateOutputPatterns(output, expectedPatterns, 'Build');
  } catch (error) {
    console.error(`❌ ${scriptName} failed:`, error.message);
    if (error.stdout) {
      console.error('Output:', error.stdout);
    }
    process.exit(1);
  }
};

runBuild();
