import Image from "next/image";
import Header from "./components/header";

export default function Home() {
  return (
    <div>
      <Header/>
        <main className="flex min-h-screen flex-col justify-between p-24">        
          <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
              <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                  <img className="h-full w-full object-cover" src="https://picsum.photos/id/1018/2000" alt="Winding mountain road"/>
              </div>
              <div
                  className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
                  <div className="flex flex-col p-12 md:px-16">
                      <h2 className="text-2xl font-medium uppercase text-teal-600 lg:text-4xl">Winding Mountain Road</h2>
                      <p className="mt-4 text-black">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                      </p>
                      <div className="mt-8 flex flex-col items-center md:flex-row md:space-x-4">
                        <a href="/signin"
                            className="inline-block w-full text-center text-lg font-medium text-gray-100 bg-green-600 border-solid border-2 border-gray-600 py-4 px-10 hover:bg-green-800 hover:shadow-md rounded-lg mb-4 md:mb-0 md:w-48">
                              Login
                        </a>
                        <a href="/register"
                            className="inline-block w-full text-center text-lg font-medium text-gray-100 bg-green-600 border-solid border-2 border-gray-600 py-4 px-10 hover:bg-green-800 hover:shadow-md rounded-lg md:w-48">
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
