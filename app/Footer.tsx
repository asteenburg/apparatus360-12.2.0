export default function Footer() {
    return (
        <footer className="bg-gray-100  after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px 
           after:bg-white/10 shadow-lg w-full max-w-full overflow-hidden">

            <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-600 text-sm">

                <p>&copy; {new Date().getFullYear()} Apparatus360. All rights reserved.</p>

                <div className="flex space-x-4 sm:mt-0">

                    <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
                    <a href="/terms" className="hover:text-white transition">Terms of Service</a>
                    <a href="/contact" className="hover:text-white transition">Contact Us</a>

                </div>

            </div>

        </footer>
    );
}