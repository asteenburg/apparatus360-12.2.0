export default function InfoCard() {
  return (
    // Right-side floating info card (Desktop View)
    <div className="absolute top-17 right-10 z-30 hidden lg:flex flex-col w-80 bg-white rounded-2xl shadow-2xl text-left p-6 card-glow mx-6 mt-6 overflow-hidden">
      <div className="m-6">
        <h1 className="text-xl text-gray-800 font-semibold uppercase mt-2 flex items-center justify-left">
          <i className="fa-solid fa-fire-flame-curved text-xl pr-3 text-red-500"></i>
          Built by Firefighters
        </h1>
      </div>

      <p className="text-sm text-gray-600">
        Most of the site was hand-coded, but a majority of the complex
        features were built using AI technology. Although, we are still
        learning, we also find value in productivity to deploy quickly while
        keeping quality in mind.
      </p>

      <div className="mt-4 relative h-72">
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