import ContentLibraryCard from '../ContentLibraryCard';

export default function ContentLibraryCardExample() {
  return (
    <ContentLibraryCard
      title="Leadership in Tech Industry"
      description="Comprehensive guide to developing leadership skills in technology companies, featuring insights from Fortune 500 CTOs."
      type="Course"
      price={49.99}
      onPurchase={() => console.log('Purchase clicked')}
    />
  );
}
