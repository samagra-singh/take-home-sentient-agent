import Link from 'next/link';

const DevOnlyHomePage = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Internal Dev Pages
        </h1>
        <div className="space-y-4">
          <Link
            href="/dev-only/component-demos"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md text-center transition-colors duration-200"
          >
            Component Demos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DevOnlyHomePage;
