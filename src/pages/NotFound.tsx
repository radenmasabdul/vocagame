import { Link } from "react-router-dom";

export default function NotFound() {
  const style = `rounded-md bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 transition-colors duration-150`;

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-500">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" className={style}>
            Kembali
          </Link>
        </div>
      </div>
    </main>
  );
}
