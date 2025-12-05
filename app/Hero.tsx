import Link from "next/link";

export default function Hero() {
  return (
    // HERO Section
    <section
  className="relative overflow-hidden bg-gray-900 bg-cover bg-center bg-no-repeat bg-scroll min-h-[100svh] flex items-center justify-center text-white pt-20" // <-- ADD pt-20 HERE
  style={{
    backgroundImage: "url('/images/pexels-thatguycraig000-1588067.jpg')",
  }}
>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative  text-center max-w-4xl mx-auto px-6 pt-24 pb-24 lg:mr-96 lg:text-left">
        <h1 className="text-5xl sm:text-7xl font-extrabold uppercase mb-4 leading-tight">
          Apparatus<span className="text-red-500">360</span>
        </h1>

        <p className="text-xl sm:text-2xl mb-8 font-light max-w-2xl">
          Your comprehensive solution for truck inspections and fleet management.
          Streamline operations, ensure safety, and gain insights with ease.
        </p>

        <Link
          href="/hub"
          className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 border border-transparent text-lg sm:text-xl font-medium rounded-full shadow-lg text-white bg-red-600 hover:bg-red-700 transition duration-300 transform hover:scale-105 active:scale-95 animate-bounce-slow"
        >
          <i className="fa-solid fa-arrow-right-to-bracket mr-3"></i>
          Get Started
        </Link>
      </div>
    </section>
  );
}