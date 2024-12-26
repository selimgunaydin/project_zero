import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        {/* SVG Illustration */}
        <p className='text-9xl font-bold text-gray-800'>
          404
        </p>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mt-8">Sayfa Bulunamadı</h1>
      <p className="my-4 text-lg text-gray-600">
        Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
      </p>
      <Link className="px-6 py-2 text-black border border-black border-solid rounded" href="/">
          Ana Sayfaya Dön
      </Link>
    </div>
  );
}
