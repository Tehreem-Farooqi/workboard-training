import { Card } from '@/components/ui/Card';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Project #{params.id}</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <p className="text-gray-600">Coming soon...</p>
      </Card>
    </div>
  );
}
