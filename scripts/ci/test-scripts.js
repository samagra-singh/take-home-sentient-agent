import { execSync } from 'child_process';

function testLintScript() {
  console.log('🧪 Testing lint script...');

  try {
    // Test with actual lint command
    const output = execSync('node scripts/ci/run-lint.js', {
      encoding: 'utf8',
      stdio: 'pipe',
    });

    if (output.includes('✅ Lint passed with expected output')) {
      console.log('✅ Lint script test passed');
      return true;
    } else {
      console.log('❌ Lint script test failed - unexpected output');
      return false;
    }
  } catch (error) {
    console.log('❌ Lint script test failed:', error.message);
    return false;
  }
}

function testTestScript() {
  console.log('🧪 Testing test script...');

  try {
    // Test with actual test command
    const output = execSync('node scripts/ci/run-tests.js', {
      encoding: 'utf8',
      stdio: 'pipe',
    });

    if (output.includes('✅ Test passed with expected output')) {
      console.log('✅ Test script test passed');
      return true;
    } else {
      console.log('❌ Test script test failed - unexpected output');
      return false;
    }
  } catch (error) {
    console.log('❌ Test script test failed:', error.message);
    return false;
  }
}

function testBuildScript() {
  console.log('🧪 Testing build script...');

  try {
    // Test with actual build command
    const output = execSync('node scripts/ci/run-build.js', {
      encoding: 'utf8',
      stdio: 'pipe',
    });

    if (output.includes('✅ Build passed with expected output')) {
      console.log('✅ Build script test passed');
      return true;
    } else {
      console.log('❌ Build script test failed - unexpected output');
      return false;
    }
  } catch (error) {
    console.log('❌ Build script test failed:', error.message);
    return false;
  }
}

function runAllTests() {
  console.log('🚀 Running all CI script tests...\n');

  const tests = [
    { name: 'Lint Script', fn: testLintScript },
    { name: 'Test Script', fn: testTestScript },
    { name: 'Build Script', fn: testBuildScript },
  ];

  const results = tests.map(test => {
    const passed = test.fn();
    return { name: test.name, passed };
  });

  console.log('\n📊 Test Results:');
  console.log('================');

  results.forEach(result => {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.name}`);
  });

  const allPassed = results.every(result => result.passed);

  if (allPassed) {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('\n💥 Some tests failed!');
    process.exit(1);
  }
}

runAllTests();
