/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { FeaturedWorks } from './components/FeaturedWorks';
import { Capabilities } from './components/Capabilities';
import { Philosophy } from './components/Philosophy';
import { ImpactMetrics } from './components/ImpactMetrics';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ShowreelModal } from './components/ShowreelModal';
import { InquiryDrawer } from './components/InquiryDrawer';
import { SpatialScrollScene } from './components/SpatialScrollScene';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { useScroll3D } from './hooks/useScroll3D';
import { Project } from './types';

export default function App() {
  // Studio Interactive States
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Real-time 3D Scroll State Tracker (progress, velocity, activeSection)
  const { progress, velocity, activeSection } = useScroll3D();

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col selection:bg-white selection:text-black relative">
      {/* Background 3D Interactive WebGL Spatial Reactor Canvas */}
      <SpatialScrollScene
        scrollProgress={progress}
        scrollVelocity={velocity}
        activeSection={activeSection}
      />

      {/* Left Vertical 3D Chapter Navigation Spine */}
      <ScrollProgressIndicator
        progress={progress}
        activeSection={activeSection}
      />

      {/* Primary Fixed Navigation Bar */}
      <Navbar onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Studio Content */}
      <main className="flex-1 relative z-10">
        {/* Cinematic Hero Section with 3D Parallax Banner */}
        <Hero
          scrollProgress={progress}
          onOpenInquiry={() => setIsInquiryOpen(true)}
          onOpenShowreelModal={() => setIsShowreelOpen(true)}
        />

        {/* Kinetic Infinite Marquee Banner */}
        <MarqueeBanner />

        {/* Featured Projects with 3D Hover Tilt & Filter System */}
        <FeaturedWorks
          scrollProgress={progress}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Studio Core Capabilities & Interactive Disciplines */}
        <Capabilities />

        {/* Design Manifesto & Architecture Philosophy */}
        <Philosophy />

        {/* Verified Impact Metrics & Recognition */}
        <ImpactMetrics />
      </main>

      {/* Studio Global Footer with Synchronized Clocks */}
      <Footer onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Deep-Dive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Master Showreel Video Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* Project Commission Inquiry Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
