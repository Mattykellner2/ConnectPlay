import MetricCard from '../MetricCard';
import { Users } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <MetricCard
      icon={Users}
      label="Active Students"
      value="1,248"
    />
  );
}
