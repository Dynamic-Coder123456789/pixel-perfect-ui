import HeroSection from "@/components/HeroSection";
import AIMedicineSection from "@/components/AIMedicineSection";
import RemoteMonitoringSection from "@/components/RemoteMonitoringSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <AIMedicineSection />
      <RemoteMonitoringSection />
    </div>
  );
};

export default Index;
