import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover | Sentient Agent',
  description: 'Discover interesting conversations with Sentient',
};

const DiscoverPage = async () => {
  // [TEMP]
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Discover</h1>
      <p>
        Sentient&apos;s gears are turning rapidly to make this feature available soon. Stay
        tuned!
      </p>
    </div>
  );
};

export default DiscoverPage;
