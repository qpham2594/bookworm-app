import Image from "next/image";
import Header from "./components/header";

export default function Home() {
  return (
    <div>
      <Header/>
        <main className="flex min-h-screen flex-col justify-between p-24 bg-lightbrown">        
          <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
              <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                  <img className="h-full w-full object-cover rounded-lg" src="/dog1.jpg" alt="Brown golden retriever wearing glasses looking at the camera in front of a book with dogs on it"/>
              </div>
              <div
                  className="max-w-lg bg-white rounded-lg md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
                  <div className="flex flex-col p-16 md:px-16">
                      <h2 className="text-2xl font-medium uppercase text-amber-700 lg:text-4xl">Your Private Book World </h2>
                      <p className="mt-4 text-black">
                          Have you ever been self concious of people knowing what you read and what you want to read? Want to have a little bit of a privacy when it comes to your little book haven?
                      </p>
                      <div className="mt-8 flex flex-col items-center md:flex-row md:space-x-4">
                        <a href="/signin"
                            className="inline-block w-full text-center text-lg font-medium text-gray-100 bg-amber-900 border-solid border-2 border-gray-600 py-4 px-10 hover:bg-green-800 hover:shadow-md rounded-lg mb-4 md:mb-0 md:w-48">
                              Login
                        </a>
                        <a href="/register"
                            className="inline-block w-full text-center text-lg font-medium text-gray-100 bg-amber-900 border-solid border-2 border-gray-600 py-4 px-10 hover:bg-green-800 hover:shadow-md rounded-lg md:w-48">
                              Register
                        </a>
                      </div>
                  </div>
              </div>
          </div>
      </main>
    </div>    
  );
}
