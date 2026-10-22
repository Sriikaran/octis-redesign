import SpotlightPos from "@/components/SpotlightPos";
import SpotlightInventory from "@/components/SpotlightInventory";

export default function SpotlightSection() {
  return (
    <section
      className="py-20 md:py-28 landing-section-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24 md:space-y-32">
        <SpotlightPos />
        <SpotlightInventory />
      </div>
    </section>
  );
}
