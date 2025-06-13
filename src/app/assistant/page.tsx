
import AppLayout from '@/components/AppLayout';
import BoundaryAssistantForm from '@/components/assistant/BoundaryAssistantForm';

export default function AssistantPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <BoundaryAssistantForm />
      </div>
    </AppLayout>
  );
}
