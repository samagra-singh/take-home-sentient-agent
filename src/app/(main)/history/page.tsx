import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'History | Sentient Agent',
  description: 'All your conversations with Sentient',
};

const HistoryPage = async () => {
  // [TEMP]
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">History</h1>
      <p>
        Sentient&apos;s gears are turning rapidly to make this feature available soon. Stay
        tuned!
      </p>
    </div>
  );
};

export default HistoryPage;
