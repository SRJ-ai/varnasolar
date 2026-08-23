// scripts/test-harness.mjs
// Lightweight, zero-dependency Node.js ES Module Test Harness for Varna Solar E2E Test Suite

import { performance } from 'node:perf_hooks';

export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  emerald: '\x1b[38;2;5;150;105m',
  coral: '\x1b[38;2;255;83;100m',
  solar: '\x1b[38;2;255;122;0m',
};

class TestHarness {
  constructor() {
    this.tiers = new Map();
    this.currentTier = null;
    this.totalTests = 0;
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.startTime = 0;
    this.tierFilter = null;
    this.nameFilter = null;
    this.failures = [];
  }

  setFilters({ tier, filter }) {
    if (tier !== undefined && tier !== null) {
      this.tierFilter = parseInt(tier, 10);
    }
    if (filter) {
      this.nameFilter = new RegExp(filter, 'i');
    }
  }

  describe(tierNumber, tierTitle, fn) {
    let tier = this.tiers.get(tierNumber);
    if (!tier) {
      tier = {
        number: tierNumber,
        title: tierTitle,
        tests: [],
        passed: 0,
        failed: 0,
        skipped: 0,
        durationMs: 0,
      };
      this.tiers.set(tierNumber, tier);
    } else {
      tier.title = `${tier.title} & ${tierTitle}`;
    }
    this.currentTier = tier;
    fn();
    this.currentTier = null;
  }

  test(name, fn) {
    if (!this.currentTier) {
      throw new Error(`Test "${name}" must be defined inside a describe block.`);
    }
    this.currentTier.tests.push({ name, fn });
  }

  async run() {
    this.startTime = performance.now();
    console.log(`\n${colors.bold}${colors.cyan}==============================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.coral}   🍉 VARNA SOLAR - AUTOMATED END-TO-END VERIFICATION TEST SUITE ☀️${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}==============================================================================${colors.reset}`);
    console.log(`${colors.dim}Target: Varna Solar Frontend Replica & Modern Watermelon UI Redesign${colors.reset}`);
    console.log(`${colors.dim}Environment: Node.js ${process.version} | Platform: ${process.platform}${colors.reset}\n`);

    const sortedTiers = Array.from(this.tiers.entries()).sort((a, b) => a[0] - b[0]);

    for (const [tierNumber, tier] of sortedTiers) {
      if (this.tierFilter && this.tierFilter !== tierNumber) {
        continue;
      }

      console.log(`${colors.bold}${colors.magenta}▶ TIER ${tierNumber}: ${tier.title.toUpperCase()}${colors.reset}`);
      const tierStartTime = performance.now();

      for (const t of tier.tests) {
        if (this.nameFilter && !this.nameFilter.test(t.name)) {
          this.skipped++;
          tier.skipped++;
          continue;
        }

        this.totalTests++;
        const testStart = performance.now();

        try {
          await t.fn();
          const elapsed = (performance.now() - testStart).toFixed(1);
          this.passed++;
          tier.passed++;
          console.log(`  ${colors.green}✓${colors.reset} ${t.name} ${colors.gray}(${elapsed}ms)${colors.reset}`);
        } catch (err) {
          const elapsed = (performance.now() - testStart).toFixed(1);
          this.failed++;
          tier.failed++;
          const failureRecord = {
            tier: tierNumber,
            name: t.name,
            error: err.message,
            stack: err.stack,
          };
          this.failures.push(failureRecord);
          console.log(`  ${colors.red}✖ ${t.name} (${elapsed}ms)${colors.reset}`);
          console.log(`    ${colors.red}Error: ${err.message}${colors.reset}`);
        }
      }

      tier.durationMs = (performance.now() - tierStartTime).toFixed(1);
      console.log(`  ${colors.dim}└─ Tier ${tierNumber} completed: ${tier.passed} passed, ${tier.failed} failed, ${tier.skipped} skipped in ${tier.durationMs}ms${colors.reset}\n`);
    }

    const totalDuration = ((performance.now() - this.startTime) / 1000).toFixed(2);
    this.printSummary(totalDuration);
    return this.failed === 0;
  }

  printSummary(durationSec) {
    console.log(`${colors.bold}${colors.cyan}==============================================================================${colors.reset}`);
    console.log(`${colors.bold}   TEST EXECUTION SUMMARY${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}==============================================================================${colors.reset}`);
    console.log(`  Total Tests Executed : ${colors.bold}${this.totalTests}${colors.reset}`);
    console.log(`  Passed               : ${colors.green}${colors.bold}${this.passed}${colors.reset}`);
    console.log(`  Failed               : ${this.failed > 0 ? colors.red : colors.green}${colors.bold}${this.failed}${colors.reset}`);
    console.log(`  Skipped              : ${this.skipped > 0 ? colors.yellow : colors.gray}${colors.bold}${this.skipped}${colors.reset}`);
    console.log(`  Total Execution Time : ${colors.bold}${durationSec}s${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}==============================================================================${colors.reset}`);

    if (this.failures.length > 0) {
      console.log(`\n${colors.red}${colors.bold}FAILURES DETAILS (${this.failures.length}):${colors.reset}`);
      for (const [idx, f] of this.failures.entries()) {
        console.log(`\n  ${colors.red}${idx + 1}) [Tier ${f.tier}] ${f.name}${colors.reset}`);
        console.log(`     ${colors.red}${f.error}${colors.reset}`);
        if (f.stack) {
          const cleanStack = f.stack.split('\n').slice(1, 4).map(l => `     ${colors.gray}${l.trim()}${colors.reset}`).join('\n');
          console.log(cleanStack);
        }
      }
      console.log(`\n${colors.red}${colors.bold}❌ TEST SUITE FAILED WITH ${this.failed} FAILURE(S) (Exit Code 1)${colors.reset}\n`);
    } else {
      console.log(`\n${colors.green}${colors.bold}🎉 ALL ${this.passed} TESTS PASSED PERFECTLY! 100% SPECIFICATION FIDELITY (Exit Code 0)${colors.reset}\n`);
    }
  }
}

export const harness = new TestHarness();
export const describe = harness.describe.bind(harness);
export const test = harness.test.bind(harness);

// Assertion Helpers
export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

export function assertNotEqual(actual, expected, message = '') {
  if (actual === expected) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected value NOT to equal ${JSON.stringify(expected)}`);
  }
}

export function assertDeepEqual(actual, expected, message = '') {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Deep equality mismatch:\nExpected: ${expectedStr}\nActual:   ${actualStr}`);
  }
}

export function assertIncludes(haystack, needle, message = '') {
  if (typeof haystack !== 'string' && !Array.isArray(haystack)) {
    throw new Error(`${message ? message + ' - ' : ''}Target must be string or array, got ${typeof haystack}`);
  }
  if (!haystack.includes(needle)) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected content to include ${JSON.stringify(needle)}`);
  }
}

export function assertMatches(str, regex, message = '') {
  if (typeof str !== 'string') {
    throw new Error(`${message ? message + ' - ' : ''}Target must be string, got ${typeof str}`);
  }
  if (!regex.test(str)) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected "${str}" to match pattern ${regex}`);
  }
}

export function assertGreaterThan(actual, threshold, message = '') {
  if (typeof actual !== 'number' || actual <= threshold) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected ${actual} > ${threshold}`);
  }
}

export function assertGreaterThanOrEqual(actual, threshold, message = '') {
  if (typeof actual !== 'number' || actual < threshold) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected ${actual} >= ${threshold}`);
  }
}

export function assertLessThan(actual, threshold, message = '') {
  if (typeof actual !== 'number' || actual >= threshold) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected ${actual} < ${threshold}`);
  }
}

export function assertBetween(actual, min, max, message = '') {
  if (typeof actual !== 'number' || actual < min || actual > max) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected ${actual} to be between [${min}, ${max}]`);
  }
}

export function assertThrows(fn, expectedRegex = null, message = '') {
  let threw = false;
  let caughtError = null;
  try {
    fn();
  } catch (err) {
    threw = true;
    caughtError = err;
  }
  if (!threw) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected function to throw an error, but it returned successfully`);
  }
  if (expectedRegex && !expectedRegex.test(caughtError.message)) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Error message "${caughtError.message}" did not match pattern ${expectedRegex}`);
  }
}

export async function assertAsyncThrows(asyncFn, expectedRegex = null, message = '') {
  let threw = false;
  let caughtError = null;
  try {
    await asyncFn();
  } catch (err) {
    threw = true;
    caughtError = err;
  }
  if (!threw) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Expected async function to throw an error, but it resolved successfully`);
  }
  if (expectedRegex && !expectedRegex.test(caughtError.message)) {
    const prefix = message ? `${message} - ` : '';
    throw new Error(`${prefix}Error message "${caughtError.message}" did not match pattern ${expectedRegex}`);
  }
}
