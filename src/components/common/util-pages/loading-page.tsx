import SentientIcon from '@/components/base/icons/sentient.svg';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center justify-center gap-6 animate-pulse">
        <SentientIcon className="size-21 inline-block fill-current" />
        <p className="text-2xl text-center">
          Summoning <span className="font-black">Sentient</span> intelligence ...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
