// scripts/run-e2e-tests.mjs
// Master Entry Point for Varna Solar Automated E2E Verification Test Suite

import { harness, colors } from './test-harness.mjs';
import { registerTier1BuildAndRoutes } from './suites/tier1-build-and-routes.mjs';
import { registerTier1CopyAndStyling } from './suites/tier1-copy-and-styling.mjs';
import { registerTier2BoundaryCases } from './suites/tier2-boundary-cases.mjs';
import { registerTier3CalculationEngine } from './suites/tier3-calculation-engine.mjs';
import { registerTier3ChatbotAndForms } from './suites/tier3-chatbot-and-forms.mjs';
import { registerTier4WorkloadScenarios } from './suites/tier4-workload-scenarios.mjs';

// CLI Help Output
function printHelp() {
  console.log(`
${colors.bold}${colors.cyan}VARNA SOLAR - AUTOMATED E2E TEST RUNNER CLI${colors.reset}

${colors.bold}Usage:${colors.reset}
  node scripts/run-e2e-tests.mjs [options]

${colors.bold}Options:${colors.reset}
  --tier=<1|2|3|4>      Execute only a specific test tier
  --filter=<pattern>    Execute only tests matching the regex/string pattern
  --help, -h            Show this help message

${colors.bold}Tiers Description:${colors.reset}
  ${colors.magenta}Tier 1${colors.reset} : Production build integrity, 17 React routes, exact copy fidelity, Framer Motion, Watermelon UI classes
  ${colors.magenta}Tier 2${colors.reset} : Boundary conditions (₹0 to ₹1 Cr bills), subsidy caps (₹78k), 38-state matrix, phone regex, 404 handler
  ${colors.magenta}Tier 3${colors.reset} : Solar calculations, PM Surya Ghar DBT, PM KUSUM, Chatbot 13 NLP intents, WhatsApp URI builder, CRM state
  ${colors.magenta}Tier 4${colors.reset} : Real-world customer workloads (Residential homeowner, Commercial factory, Agri pump, Portfolio, Admin)

${colors.bold}Examples:${colors.reset}
  node scripts/run-e2e-tests.mjs
  node scripts/run-e2e-tests.mjs --tier=1
  node scripts/run-e2e-tests.mjs --filter="subsidy"
  node scripts/run-e2e-tests.mjs --tier=3 --filter="chatbot"
`);
}

// Parse Command Line Arguments
const args = process.argv.slice(2);
let tierFilter = null;
let nameFilter = null;

for (const arg of args) {
  if (arg === '--help' || arg === '-h') {
    printHelp();
    process.exit(0);
  } else if (arg.startsWith('--tier=')) {
    tierFilter = arg.split('=')[1];
  } else if (arg.startsWith('--filter=')) {
    nameFilter = arg.split('=')[1];
  }
}

harness.setFilters({ tier: tierFilter, filter: nameFilter });

// Register All Test Suites
registerTier1BuildAndRoutes();
registerTier1CopyAndStyling();
registerTier2BoundaryCases();
registerTier3CalculationEngine();
registerTier3ChatbotAndForms();
registerTier4WorkloadScenarios();

// Execute Test Runner
const success = await harness.run();
process.exit(success ? 0 : 1);
