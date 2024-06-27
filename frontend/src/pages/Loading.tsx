

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10h4zm2 5.292A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.646z"></path>
        </svg>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
