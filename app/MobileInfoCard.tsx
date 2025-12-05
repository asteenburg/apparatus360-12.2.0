export default function MobileInfoCard() {
  return (
    // Mobile version of right-side card
    <section className="lg:hidden mx-auto max-w-xl px-6 py-8">
      <div className="bg-white rounded-2xl shadow-xl text-left p-6 card-glow overflow-hidden">
        <div className="mb-6">
          <h1 className="text-3xl text-gray-800 font-extrabold uppercase mb-2 flex items-center">
            <i className="fa-solid fa-fire-flame-curved text-xl pr-3 text-red-500"></i>
          </h1>
        </div>

        <p className="text-sm">
          Most of the site was hand-coded, but a majority of the complex features
          were built using AI. We still take pride in designing every feature to
          look and function exactly the way we want.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 justify-items-center">
          <img src="/images/data.png" className="rounded-xl shadow-lg w-full" />
          <img src="/images/middle-2.png" className="rounded-xl shadow-lg w-full" />
          <img
            src="/images/middle.png"
            className="rounded-xl shadow-lg w-full col-span-2 sm:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}