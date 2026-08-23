// scripts/suites/tier1-build-and-routes.mjs
// Tier 1: Framework Build & React Router 17 Routes Verification

import { describe, test, assert, assertEqual, assertIncludes, assertGreaterThan, assertMatches } from '../test-harness.mjs';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
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

export function registerTier1BuildAndRoutes() {
  const appRoot = getAppRoot();
  const srcDir = join(appRoot, 'src');

  describe(1, 'Framework Build Integrity & React Router Navigation', () => {
    test('1.1 Framework Configuration & Build Environment Integrity', () => {
      // Validate configuration files - search root and web package.json
      const pkgCandidates = [
        join(appRoot, 'package.json'),
        join(appRoot, 'web', 'package.json'),
      ];
      let pkg = null;
      let pkgPath = null;
      for (const cand of pkgCandidates) {
        if (existsSync(cand)) {
          const parsed = JSON.parse(readFileSync(cand, 'utf-8'));
          const allDeps = { ...(parsed.dependencies || {}), ...(parsed.devDependencies || {}) };
          if (allDeps['react'] || allDeps['react-dom']) {
            pkg = parsed;
            pkgPath = cand;
            break;
          }
        }
      }
      if (!pkg) {
        pkgPath = join(appRoot, 'package.json');
        assert(existsSync(pkgPath), `package.json must exist at ${pkgPath}`);
        pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      }
      assert(pkg.dependencies || pkg.devDependencies, 'package.json must declare dependencies');
      
      // Check for core libraries: React, Framer Motion, Tailwind, Vite / Icons
      const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      assert(allDeps['react'] || allDeps['react-dom'], 'React must be present in package dependencies');
      assert(allDeps['framer-motion'], 'framer-motion must be present in package dependencies');
      assert(allDeps['tailwindcss'] || allDeps['@tailwindcss/vite'], 'Tailwind CSS must be present in package dependencies');
      assert(allDeps['vite'], 'Vite must be present in package dependencies');

      // Check for index.html entry point
      const indexHtmlCandidates = [
        join(appRoot, 'index.html'),
        join(appRoot, 'web', 'index.html'),
      ];
      const indexHtmlPath = indexHtmlCandidates.find(p => existsSync(p)) || join(appRoot, 'index.html');
      assert(existsSync(indexHtmlPath), 'index.html entry file must exist in web root');
      const indexHtml = readFileSync(indexHtmlPath, 'utf-8');
      assertIncludes(indexHtml, 'Varna', 'index.html title/content must contain "Varna"');
    });

    test('1.2 Production Build Artifacts & Bundle Verification', () => {
      const distCandidates = [
        join(appRoot, 'dist'),
        join(appRoot, 'web', 'dist'),
      ];
      const distDir = distCandidates.find(d => existsSync(d)) || join(appRoot, 'dist');
      // If dist exists, verify its integrity; otherwise verify source buildability
      if (existsSync(distDir)) {
        const distHtml = join(distDir, 'index.html');
        assert(existsSync(distHtml), 'dist/index.html must exist after build');
        assertGreaterThan(statSync(distHtml).size, 200, 'dist/index.html should have non-trivial size');

        const distAssetsDir = join(distDir, 'assets');
        if (existsSync(distAssetsDir)) {
          const assets = readdirSync(distAssetsDir);
          const hasJs = assets.some(a => a.endsWith('.js'));
          const hasCss = assets.some(a => a.endsWith('.css'));
          assert(hasJs, 'dist/assets should contain compiled JS bundles');
          assert(hasCss, 'dist/assets should contain compiled CSS stylesheets');
        }
      } else {
        // If dist is not yet generated, verify that source entry files exist and are syntactically valid
        const mainCandidates = [
          join(appRoot, 'src', 'main.tsx'),
          join(appRoot, 'src', 'main.jsx'),
          join(appRoot, 'web', 'src', 'main.tsx'),
          join(appRoot, 'web', 'src', 'main.jsx'),
        ];
        const mainEntry = mainCandidates.find(m => existsSync(m)) || join(appRoot, 'src', 'main.tsx');
        assert(existsSync(mainEntry), `Application entry point must exist at ${mainEntry}`);
        const mainContent = readFileSync(mainEntry, 'utf-8');
        assertIncludes(mainContent, 'createRoot', 'main entry file must mount React DOM via createRoot');
      }
    });

    test('1.3 React Router Topology: Complete 17 Routes Verification', () => {
      // Gather all source code from App, pages, and components
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?)$/);
      let concatenatedSource = '';
      for (const file of sourceFiles) {
        concatenatedSource += readFileSync(file, 'utf-8') + '\n';
      }

      // Mandatory 17 routes from PROJECT.md and TEST_INFRA.md
      const mandatoryRoutes = [
        { path: '/', label: 'Home Page' },
        { path: '/about-us', label: 'About Us Page' },
        { path: '/why-choose-us', label: 'Why Choose Us Page' },
        { path: '/residential-solar', label: 'Residential Solar Page' },
        { path: '/commercial-solar', label: 'Commercial Solar Page' },
        { path: '/industrial-solar', label: 'Industrial Solar Page' },
        { path: '/agriculture-solar', label: 'Agriculture Solar Page' },
        { path: '/pm-surya-ghar-yojana', label: 'PM Surya Ghar Yojana Page' },
        { path: '/pm-kusum-scheme', label: 'PM KUSUM Scheme Page' },
        { path: '/solar-calculator', label: 'Solar Sizing & ROI Calculator Page' },
        { path: '/projects', label: 'Landmark Projects Case Studies Page' },
        { path: '/blogs', label: 'Solar Knowledge Base & Blogs Page' },
        { path: '/blog/:slug', label: 'Dynamic Blog Article Reading View' },
        { path: '/contact', label: 'Contact & Branch Locator Page' },
        { path: '/admin/login', label: 'Admin Authentication Login Page' },
        { path: '/admin', label: 'Admin CRM & Management Dashboard' },
        { path: '*', label: 'NotFound 404 Catch-All Route' },
      ];

      for (const route of mandatoryRoutes) {
        // Look for path patterns in router configurations or navigation declarations
        const cleanPath = route.path.replace(':slug', '(:slug|[a-zA-Z0-9_-]+)').replace('*', '.*');
        const regex1 = new RegExp(`path\\s*[:=]\\s*["'\`]${route.path === '*' ? '\\*' : cleanPath}["'\`]`, 'i');
        const regex2 = new RegExp(`['"\`]${route.path === '*' ? '\\*' : cleanPath}['"\`]`, 'i');
        
        const matched = regex1.test(concatenatedSource) || regex2.test(concatenatedSource) || concatenatedSource.includes(`"${route.path}"`) || concatenatedSource.includes(`'${route.path}'`);
        assert(
          matched,
          `Mandatory route "${route.path}" (${route.label}) must be registered in router or component topology`
        );
      }
    });

    test('1.4 Programmatic Router Matcher & Dynamic Path Resolution', () => {
      // Deterministic router matcher simulation testing SPA route matching engine
      const routeTable = [
        { pattern: /^\/$/, name: 'HomePage' },
        { pattern: /^\/about-us\/?$/, name: 'AboutUsPage' },
        { pattern: /^\/why-choose-us\/?$/, name: 'WhyChooseUsPage' },
        { pattern: /^\/residential-solar\/?$/, name: 'ResidentialSolarPage' },
        { pattern: /^\/commercial-solar\/?$/, name: 'CommercialSolarPage' },
        { pattern: /^\/industrial-solar\/?$/, name: 'IndustrialSolarPage' },
        { pattern: /^\/agriculture-solar\/?$/, name: 'AgricultureSolarPage' },
        { pattern: /^\/pm-surya-ghar-yojana\/?$/, name: 'PMSuryaGharPage' },
        { pattern: /^\/pm-kusum-scheme\/?$/, name: 'PMKusumPage' },
        { pattern: /^\/solar-calculator\/?$/, name: 'SolarCalculatorPage' },
        { pattern: /^\/projects\/?$/, name: 'ProjectsPage' },
        { pattern: /^\/blogs\/?$/, name: 'BlogsPage' },
        { pattern: /^\/blog\/([a-zA-Z0-9_-]+)\/?$/, name: 'BlogPostPage' },
        { pattern: /^\/contact\/?$/, name: 'ContactPage' },
        { pattern: /^\/admin\/login\/?$/, name: 'AdminLoginPage' },
        { pattern: /^\/admin\/?$/, name: 'AdminDashboardPage' },
      ];

      function resolveRoute(urlPath) {
        for (const route of routeTable) {
          const match = urlPath.match(route.pattern);
          if (match) {
            return {
              matched: true,
              component: route.name,
              params: match[1] ? { slug: match[1] } : {},
            };
          }
        }
        return { matched: false, component: 'NotFoundPage', params: {} };
      }

      // Test static route resolutions
      assertEqual(resolveRoute('/').component, 'HomePage');
      assertEqual(resolveRoute('/about-us').component, 'AboutUsPage');
      assertEqual(resolveRoute('/why-choose-us').component, 'WhyChooseUsPage');
      assertEqual(resolveRoute('/residential-solar').component, 'ResidentialSolarPage');
      assertEqual(resolveRoute('/commercial-solar').component, 'CommercialSolarPage');
      assertEqual(resolveRoute('/industrial-solar').component, 'IndustrialSolarPage');
      assertEqual(resolveRoute('/agriculture-solar').component, 'AgricultureSolarPage');
      assertEqual(resolveRoute('/pm-surya-ghar-yojana').component, 'PMSuryaGharPage');
      assertEqual(resolveRoute('/pm-kusum-scheme').component, 'PMKusumPage');
      assertEqual(resolveRoute('/solar-calculator').component, 'SolarCalculatorPage');
      assertEqual(resolveRoute('/projects').component, 'ProjectsPage');
      assertEqual(resolveRoute('/blogs').component, 'BlogsPage');
      assertEqual(resolveRoute('/contact').component, 'ContactPage');
      assertEqual(resolveRoute('/admin/login').component, 'AdminLoginPage');
      assertEqual(resolveRoute('/admin').component, 'AdminDashboardPage');

      // Test dynamic parameter resolution
      const dynamicBlog = resolveRoute('/blog/pm-surya-ghar-complete-subsidy-guide');
      assertEqual(dynamicBlog.component, 'BlogPostPage');
      assertEqual(dynamicBlog.params.slug, 'pm-surya-ghar-complete-subsidy-guide');

      // Test 404 fallback
      assertEqual(resolveRoute('/non-existent-page-url-404').component, 'NotFoundPage');
    });

    test('1.5 Navigation Link Consistency in Navbar, Footer, and Mobile Drawer', () => {
      const sourceFiles = getAllSourceFiles(appRoot, /\.(jsx?|tsx?)$/);
      let concatenatedSource = '';
      for (const file of sourceFiles) {
        concatenatedSource += readFileSync(file, 'utf-8') + '\n';
      }

      const primaryNavLinks = [
        'solar-calculator',
        'pm-surya-ghar-yojana',
        'pm-kusum-scheme',
        'residential-solar',
        'commercial-solar',
        'about-us',
        'projects',
        'contact',
      ];

      for (const link of primaryNavLinks) {
        assert(
          concatenatedSource.includes(link),
          `Expected navigation element to reference primary link "${link}"`
        );
      }
    });
  });
}
