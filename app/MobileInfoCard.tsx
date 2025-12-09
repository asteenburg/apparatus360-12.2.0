export default function MobileInfoCard() {
  return (
    // Mobile version of right-side card
    <section className="lg:hidden mx-auto max-w-xl px-6 py-8">
      <div className="bg-white rounded-md shadow-xl text-left p-6 card-glow overflow-hidden">
        <div className="mb-6">
          <h1 className="text-xl text-gray-800 font-extrabold uppercase mb-2 flex items-center">
            <i className="fa-solid fa-fire-flame-curved text-xl pr-3 text-red-500"></i> Built by firefighters
          </h1>
        </div>

        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus arcu a augue mollis, cursus malesuada sapien vestibulum. Donec semper nec erat eget varius. Cras leo erat, hendrerit a nunc eu, posuere cursus eros. Nullam egestas eros quis sapien dapibus commodo. Aenean ac turpis elit. Nunc sed dui nec sem maximus placerat. Donec ut est accumsan, tempus velit ut, condimentum sem.
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
