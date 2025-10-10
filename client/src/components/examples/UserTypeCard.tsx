import UserTypeCard from '../UserTypeCard';
import { Building2 } from 'lucide-react';

export default function UserTypeCardExample() {
  return (
    <UserTypeCard
      icon={Building2}
      title="For Universities"
      description="Partner with ConnectPlay to provide your students with access to industry-leading professionals and curated content."
      buttonText="Explore Partnerships"
      onButtonClick={() => console.log('Partnership clicked')}
    />
  );
}
