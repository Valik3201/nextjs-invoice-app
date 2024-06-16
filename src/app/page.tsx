"use client";

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
      <Hero />
      <InvoiceStatus />
      <ManageInvoices />
      <FilterInvoices />
      <Flexibility />
      <PersonalizeWorkspace />
      <ResponsiveDesign />
      <CreateFirstInvoice />
    </div>
  );
}
