import PartnershipTierCard from '../PartnershipTierCard';

export default function PartnershipTierCardExample() {
  return (
    <PartnershipTierCard
      title="School Partnership"
      description="Perfect for individual schools within larger institutions"
      features={[
        "Unlimited guest speakers per semester",
        "Advanced analytics and reporting",
        "Dedicated account manager",
        "Custom branding options",
        "Priority support"
      ]}
      isPopular={true}
      onSelect={() => console.log('School partnership selected')}
    />
  );
}
