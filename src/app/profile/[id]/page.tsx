'use client';

import { useRouter } from 'next/navigation';

export default function Page({ params }: any) {
  const router = useRouter();

  // Extract user ID and username from params.id
//   const [userId, username] = params.id.split('-');

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black p-6">
      <div className="flex flex-col items-center bg-gray-800 text-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-5xl font-bold mb-6 text-orange-400">Profile Page</h1>
        <div className=" text-lg font-semibold p-4 rounded-lg shadow-md mb-4  text-center hover:text-orange-500">
          User ID: {params.id}
        </div>
        {/* <div className="bg-blue-500 text-black text-xl font-semibold p-4 rounded-lg shadow-md mb-6 w-full text-center">
          {/* Username: {username} */}
        {/* </div>  */}
        <button
          className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
