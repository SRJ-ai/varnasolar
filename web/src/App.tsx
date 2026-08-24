import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { SmoothScroll } from './components/common/SmoothScroll';
// Page Imports
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { ResidentialSolarPage } from './pages/ResidentialSolarPage';
import { CommercialSolarPage } from './pages/CommercialSolarPage';
import { IndustrialSolarPage } from './pages/IndustrialSolarPage';
import { AgricultureSolarPage } from './pages/AgricultureSolarPage';
import { PMSuryaGharPage } from './pages/PMSuryaGharPage';
import { PMKusumPage } from './pages/PMKusumPage';
import { SolarCalculatorPage } from './pages/SolarCalculatorPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
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
      </Routes>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SmoothScroll>
        <AnimatedRoutes />
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
