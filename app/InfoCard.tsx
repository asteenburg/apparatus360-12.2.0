export default function InfoCard() {
  return (
    // Right-side floating info card (Desktop View)
    <div className="absolute top-17 right-10 z-30 hidden lg:flex flex-col w-80 bg-transparent rounded-md text-left p-6 card-glow mx-6 mt-6 overflow-hidden">
      <div className="m-6">
        <h1 className="text-xl text-gray-300 text-left font-semibold uppercase mt-2 flex justify-left">
          <i className="fa-solid fa-fire-flame-curved text-xl pr-3 text-red-500"></i>
          Built by Firefighters
        </h1>
      </div>

      <p className="text-sm text-gray-300">
        Most of the site was hand-coded such as HTML elements, Tailwind CSS, and some Javascript, but a majority of the complex features
          were built by leveraging the power of AI to create React and Typescript components within NEXT.js framework. We still take pride in designing every feature to
          look and function exactly the way we want.
      </p>

      <div className="mt-4 relative h-52">
        <img
          src="/images/data.png"
          alt="Apparatus360 Checklist Screenshot"
          className="mt-4 rounded-xl shadow-lg w-64 block h-auto max-w-full transition duration-300 hover:scale-125"
        />

        <img
          src="/images/middle-2.png"
          alt="Checklist Screenshot"
          className="rounded-xl shadow-lg w-64 block h-auto absolute max-w-full transition duration-300 hover:scale-125"
          style={{ top: 25, right: -25, zIndex: 10 }}
        />

        <img
          src="/images/middle.png"
          alt="Checklist Screenshot"
          className="rounded-xl shadow-lg w-64 block h-auto absolute max-w-full transition duration-300 hover:scale-125"
          style={{ top: 50, right: -50, zIndex: 20 }}
        />
      </div>
    </div>
  );
}