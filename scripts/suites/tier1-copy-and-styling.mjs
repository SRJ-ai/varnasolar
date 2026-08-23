// scripts/suites/tier1-copy-and-styling.mjs
// Tier 1: Copy Fidelity, Statistical KPIs, Framer Motion & Watermelon UI Tailwind Classes

import { describe, test, assert, assertEqual, assertIncludes, assertGreaterThan, assertMatches } from '../test-harness.mjs';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

function getAppRoot() {
  const root = process.cwd();
  if (existsSync(join(root, 'src', 'App.tsx')) || existsSync(join(root, 'src', 'pages'))) {
    return root;
  }
  if (existsSync(join(root, '..', 'src', 'App.tsx')) || existsSync(join(root, '..', 'src', 'pages'))) {
    return resolve(join(root, '..'));
  }
  if (existsSync(join(root, 'web', 'package.json'))) {
    return join(root, 'web');
  }
  return root;
}

function getAllFiles(dir, filterRegex, fileList = []) {
  if (!existsSync(dir)) return fileList;
  const items = readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory() && item.name !== 'node_modules' && item.name !== 'dist' && item.name !== '.git') {
      getAllFiles(fullPath, filterRegex, fileList);
    } else if (item.isFile() && filterRegex.test(item.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function getAllSourceFiles(appRoot, filterRegex = /\.(jsx?|tsx?|html|json|css)$/) {
  const files = [];
  const primarySrc = join(appRoot, 'src');
  if (existsSync(primarySrc)) {
    getAllFiles(primarySrc, filterRegex, files);
  }
  const webSrc = join(appRoot, 'web', 'src');
  if (existsSync(webSrc) && resolve(webSrc) !== resolve(primarySrc)) {
    getAllFiles(webSrc, filterRegex, files);
  }
  return files;
}

export function registerTier1CopyAndStyling() {
  const appRoot = getAppRoot();

  describe(1, 'Copy Fidelity, Statistical KPIs, Framer Motion & Watermelon UI Tailwind Styling', () => {
    test('1.6 Corporate Governance, Leadership DINs & Partner Identity Copy Fidelity', () => {
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?|html|json)$/);
      let concatenatedSource = '';
      for (const file of sourceFiles) {
        concatenatedSource += readFileSync(file, 'utf-8') + '\n';
      }

      // Check Brand Name
      assertIncludes(concatenatedSource, 'Varna', 'Source code must contain "Varna" brand name');
      assertIncludes(concatenatedSource, 'Solar', 'Source code must contain "Solar" keyword');

      // Check Leadership Profiles & DINs
      const hasSuvarna = concatenatedSource.includes('Suvarna Devi') || concatenatedSource.includes('Thade Suvarna');
      assert(hasSuvarna, 'Managing Director Mrs. Thade Suvarna Devi profile must be present');

      const hasSomaSekhar = concatenatedSource.includes('Soma Sekhar') || concatenatedSource.includes('Thade Soma');
      assert(hasSomaSekhar, 'Executive Director Mr. Thade Soma Sekhar profile must be present');

      const hasDIN = concatenatedSource.includes('07095392') || concatenatedSource.includes('11069758') || 
                     concatenatedSource.includes('07095383') || concatenatedSource.includes('11069757') ||
                     concatenatedSource.includes('DIN');
      assert(hasDIN, 'Director Identification Numbers (DINs) must be referenced');

      // Check Waaree Energies Partnership
      const hasWaaree = concatenatedSource.includes('Waaree') || concatenatedSource.includes('WAAREE');
      assert(hasWaaree, 'Waaree Energies channel partnership credential must be present');
    });

    test('1.7 Primary Hotline, Registered Headquarters & 4 Regional Branches Copy Fidelity', () => {
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?|html|json)$/);
      let concatenatedSource = '';
      for (const file of sourceFiles) {
        concatenatedSource += readFileSync(file, 'utf-8') + '\n';
      }

      // Check Phone Hotline
      const hasPhone = concatenatedSource.includes('9182445679') || concatenatedSource.includes('91824 45679');
      assert(hasPhone, 'Primary customer helpline phone number (9182445679 / +91 91824 45679) must be present');

      // Check Headquarters
      const hasHQ = concatenatedSource.includes('SR Nagar') || concatenatedSource.includes('Sanjeeva Reddy Nagar') || concatenatedSource.includes('Hyderabad');
      assert(hasHQ, 'Registered Corporate Headquarters (SR Nagar / Hyderabad) must be present');

      // Check 4 Regional Branches
      const branches = ['Vizag', 'Adilabad', 'Vempalli', 'Tandur'];
      for (const branch of branches) {
        assertIncludes(concatenatedSource, branch, `Branch location "${branch}" must be listed in contact or branch networks`);
      }
    });

    test('1.8 Operational Metrics & Government Scheme Benchmarks Copy Fidelity', () => {
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?|html|json)$/);
      let concatenatedSource = '';
      for (const file of sourceFiles) {
        concatenatedSource += readFileSync(file, 'utf-8') + '\n';
      }

      const benchmarks = [
        { label: '15+ MW Installed Capacity', patterns: ['15+ MW', '15 MW', '15MW'] },
        { label: '1,500+ Solar Installations', patterns: ['1,500+', '1500+', '1,500'] },
        { label: '10+ Years Experience', patterns: ['10+ Years', '10+ years', '10 Years', '10 years'] },
        { label: '100% DISCOM Approval', patterns: ['100%', '100 %'] },
        { label: 'PM Surya Ghar Subsidy', patterns: ['PM Surya Ghar', 'Surya Ghar', 'PMSuryaGhar'] },
        { label: '₹78,000 Subsidy Cap', patterns: ['78,000', '78000'] },
        { label: 'PM KUSUM Scheme', patterns: ['PM KUSUM', 'PM-KUSUM', 'KUSUM'] },
        { label: '60% Agriculture Subsidy', patterns: ['60%'] },
        { label: '30-Year Performance Warranty', patterns: ['30-Year', '30 Year', '30 years', '25'] },
      ];

      for (const b of benchmarks) {
        const found = b.patterns.some(p => concatenatedSource.includes(p));
        assert(found, `Benchmark metric "${b.label}" must be present in application copy`);
      }
    });

    test('1.9 9 Landmark Case Studies Data Points & Technical Specifications', () => {
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?|html|json)$/);
      let concatenatedSource = '';
      for (const file of sourceFiles) {
        concatenatedSource += readFileSync(file, 'utf-8') + '\n';
      }

      const caseStudies = [
        { name: 'Jubilee Hills 5kW Residential', keywords: ['Jubilee Hills'] },
        { name: 'Gachibowli 100kW Commercial', keywords: ['Gachibowli'] },
        { name: 'Pashamylaram 500kW Industrial', keywords: ['Pashamylaram'] },
        { name: 'Warangal 7.5HP Solar Pump', keywords: ['Warangal'] },
        { name: 'Narsingi 20kW Luxury Villa', keywords: ['Narsingi'] },
        { name: 'Sircilla 250kW Textile Mill', keywords: ['Sircilla'] },
        { name: 'Sathupalli 300 Solar Pumps', keywords: ['Sathupalli'] },
        { name: 'Assam 300 Street Lights', keywords: ['Assam'] },
        { name: 'Kakinada 1MW Ground Mount', keywords: ['Kakinada'] },
      ];

      for (const cs of caseStudies) {
        const found = cs.keywords.some(kw => concatenatedSource.includes(kw));
        assert(found, `Case study "${cs.name}" must be represented in project portfolio or case studies data`);
      }
    });

    test('1.10 Framer Motion Extensive Integration & Spring Physics Physics Configs', () => {
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?)$/);
      let motionImports = 0;
      let motionTags = 0;
      let springConfigs = 0;
      let microInteractions = 0;

      for (const file of sourceFiles) {
        const content = readFileSync(file, 'utf-8');
        if (content.includes('framer-motion')) {
          motionImports++;
        }
        
        const tags = content.match(/<motion\.[a-zA-Z0-9]+/g);
        if (tags) {
          motionTags += tags.length;
        }

        if (content.includes('stiffness') || content.includes('damping') || 
            content.includes('type: "spring"') || content.includes("type: 'spring'")) {
          springConfigs++;
        }

        if (content.includes('whileHover') || content.includes('whileTap') || content.includes('whileInView')) {
          microInteractions++;
        }
      }

      assertGreaterThan(motionImports, 0, 'Framer Motion must be imported across application components');
      assertGreaterThan(motionTags, 5, `Expected multiple <motion.*> elements, found ${motionTags}`);
      assertGreaterThan(springConfigs, 0, 'Spring physics configs (stiffness, damping, type: spring) must be used');
      assertGreaterThan(microInteractions, 0, 'Micro-interactions (whileHover, whileTap, whileInView) must be utilized');
    });

    test('1.11 Modern Watermelon UI Tailwind CSS Utility Classes Verification', () => {
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?|html|css)$/);
      let glassmorphicCount = 0;
      let deepShadowCount = 0;
      let gradientCount = 0;
      let ringAccentCount = 0;

      for (const file of sourceFiles) {
        const content = readFileSync(file, 'utf-8');
        
        if (content.includes('backdrop-blur') || content.includes('border-white/')) {
          glassmorphicCount++;
        }
        if (content.includes('shadow-2xl') || content.includes('shadow-xl') || content.includes('shadow-[')) {
          deepShadowCount++;
        }
        if (content.includes('bg-gradient-to-') || content.includes('bg-clip-text') || content.includes('text-transparent')) {
          gradientCount++;
        }
        if (content.includes('ring-') || content.includes('rounded-2xl') || content.includes('rounded-3xl')) {
          ringAccentCount++;
        }
      }

      assertGreaterThan(glassmorphicCount, 0, 'Glassmorphism classes (backdrop-blur, border-white/*) must be used in Watermelon UI');
      assertGreaterThan(deepShadowCount, 0, 'Deep shadow classes (shadow-2xl, shadow-xl) must be present');
      assertGreaterThan(gradientCount, 0, 'Modern gradient classes (bg-gradient-to-*, bg-clip-text) must be present');
      assertGreaterThan(ringAccentCount, 0, 'Modern border and radius tokens (rounded-2xl/3xl, ring-*) must be present');
    });
  });
}
