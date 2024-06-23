"use client";

import AnimatedSection from "../components/Home/AnimatedSection";
import Hero from "../components/Home/Hero";
import InvoiceStatus from "../components/Home/InvoiceStatus";
import ManageInvoices from "../components/Home/ManageInvoices";
import FilterInvoices from "../components/Home/FilterInvoices";
import Flexibility from "../components/Home/Flexibility";
import PersonalizeWorkspace from "../components/Home/PersonalizeWorkspace";
import ResponsiveDesign from "../components/Home/ResponsiveDesign";
import CreateFirstInvoice from "../components/Home/CreateFirstInvoice";

export default function Home() {
  return (
    <div className="container mx-auto space-y-8">
      <AnimatedSection delay={0}>
        <Hero />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <InvoiceStatus />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <ManageInvoices />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <FilterInvoices />
      </AnimatedSection>
      <AnimatedSection delay={0.8}>
        <Flexibility />
      </AnimatedSection>
      <AnimatedSection delay={1.0}>
        <PersonalizeWorkspace />
      </AnimatedSection>
      <AnimatedSection delay={0.7}>
        <ResponsiveDesign />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CreateFirstInvoice />
      </AnimatedSection>
    </div>
  );
}
