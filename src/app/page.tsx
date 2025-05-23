import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Hilal Cenaze Fonu</h1>
          <Link 
            href="/admin" 
            className="bg-white hover:bg-accent text-primary px-4 py-2 rounded-md text-sm font-medium"
          >
            Admin Girişi
          </Link>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Hilal Cenaze Fonu</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Zor Zamanlarda Yanınızdayız
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Hilal Cenaze Fonu, üyelerimize ve ailelerine zor zamanlarda maddi destek sağlamak için kurulmuştur. 
              Dayanışma ve yardımlaşma temelinde, üyelerimizin cenaze masraflarını karşılamak için hizmet vermekteyiz.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Üye Kayıt</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Hilal Cenaze Fonu'na üye olmak için aşağıdaki butona tıklayarak kayıt formunu doldurabilirsiniz.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link
                      href="/uye-kayit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Üye Ol
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Hizmetlerimiz</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Hilal Cenaze Fonu olarak sunduğumuz hizmetler hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
                    </p>
                  </div>
                  <div className="mt-5 flex space-x-2">
                    <a
                      href="tel:+32487247530"
                      className="inline-flex items-center px-4 py-2 border border-primary shadow-sm text-sm font-medium rounded-md text-primary bg-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Ara: 0487 24 75 30
                    </a>
                    <a
                      href="https://wa.me/32487247530"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base text-white opacity-80">
            &copy; {new Date().getFullYear()} Hilal Cenaze Fonu. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
