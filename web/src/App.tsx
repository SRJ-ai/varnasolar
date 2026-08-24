import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { SmoothScroll } from './components/common/SmoothScroll';
import { ScrollProgress } from './components/common/ScrollProgress';
import { ExitIntentModal } from './components/common/ExitIntentModal';
import { AppSplash } from './components/common/AppSplash';
import { ThemeProvider } from './components/common/ThemeProvider';
import { PhotonBackground } from './components/common/PhotonBackground';
// Page Imports
import { Suspense, lazy } from 'react';
import { PageLoader } from './components/common/PageLoader';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage').then(module => ({ default: module.AboutUsPage })));
const WhyChooseUsPage = lazy(() => import('./pages/WhyChooseUsPage').then(module => ({ default: module.WhyChooseUsPage })));
const ResidentialSolarPage = lazy(() => import('./pages/ResidentialSolarPage').then(module => ({ default: module.ResidentialSolarPage })));
const CommercialSolarPage = lazy(() => import('./pages/CommercialSolarPage').then(module => ({ default: module.CommercialSolarPage })));
const IndustrialSolarPage = lazy(() => import('./pages/IndustrialSolarPage').then(module => ({ default: module.IndustrialSolarPage })));
const AgricultureSolarPage = lazy(() => import('./pages/AgricultureSolarPage').then(module => ({ default: module.AgricultureSolarPage })));
const PMSuryaGharPage = lazy(() => import('./pages/PMSuryaGharPage').then(module => ({ default: module.PMSuryaGharPage })));
const PMKusumPage = lazy(() => import('./pages/PMKusumPage').then(module => ({ default: module.PMKusumPage })));
const SolarCalculatorPage = lazy(() => import('./pages/SolarCalculatorPage').then(module => ({ default: module.SolarCalculatorPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(module => ({ default: module.BlogsPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(module => ({ default: module.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(module => ({ default: module.AdminDashboardPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const routeTitles: Record<string, string> = {
  '/': 'Varna Solar | Rooftop Solar EPC in Hyderabad & Telangana',
  '/about-us': 'About Us | Varna Solar',
  '/why-choose-us': 'Why Choose Us | Varna Solar',
  '/residential-solar': 'Residential Rooftop Solar | Varna Solar',
  '/commercial-solar': 'Commercial Solar Solutions | Varna Solar',
  '/industrial-solar': 'Industrial Solar Power | Varna Solar',
  '/agriculture-solar': 'Agricultural Solar Pumps (PM KUSUM) | Varna Solar',
  '/pm-surya-ghar-yojana': 'PM Surya Ghar Subsidy Guide | Varna Solar',
  '/pm-kusum-scheme': 'PM KUSUM Scheme | Varna Solar',
  '/solar-calculator': 'Solar Savings Calculator | Varna Solar',
  '/projects': 'Our Landmark Projects | Varna Solar',
  '/blogs': 'Solar Knowledge Hub | Varna Solar',
  '/contact': 'Contact Us | Varna Solar',
  '/admin/login': 'Admin Login | Varna Solar',
  '/admin': 'Admin Dashboard | Varna Solar',
};

const AnimatedRoutes = () => {
  const location = useLocation();

  React.useEffect(() => {
    let title = routeTitles[location.pathname];
    if (!title && location.pathname.startsWith('/blog/')) {
      title = 'Blog Post | Varna Solar';
    }
    document.title = title || 'Varna Solar';
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}><Routes key={location.pathname} location={location}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="/residential-solar" element={<ResidentialSolarPage />} />
          <Route path="/commercial-solar" element={<CommercialSolarPage />} />
          <Route path="/industrial-solar" element={<IndustrialSolarPage />} />
          <Route path="/agriculture-solar" element={<AgricultureSolarPage />} />
          <Route path="/pm-surya-ghar-yojana" element={<PMSuryaGharPage />} />
          <Route path="/pm-kusum-scheme" element={<PMKusumPage />} />
          <Route path="/solar-calculator" element={<SolarCalculatorPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          {/* Legacy aliases — prevent 404s from old footer/nav links & external bookmarks */}
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/agricultural-solar" element={<Navigate to="/agriculture-solar" replace />} />
          <Route path="/subsidies" element={<Navigate to="/pm-surya-ghar-yojana" replace />} />
          <Route path="/maintenance" element={<Navigate to="/why-choose-us" replace />} />
          <Route path="/privacy-policy" element={<Navigate to="/about-us" replace />} />
          <Route path="/terms" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes></Suspense>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="varna-ui-theme">
      <PhotonBackground />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppSplash />
        <ScrollProgress />
        <SmoothScroll>
          <AnimatedRoutes />
        </SmoothScroll>
        <ExitIntentModal />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
