import mongoose from 'mongoose';
import Hero from './app/models/Hero';


// Seed verileri
const heroSeed = { container: {
  className: "bg-white"
},
innerContainer: {
  className: "relative isolate px-6 lg:px-8"
},
blurEffectTop: {
  className: "absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80",
  div: {
    className: "relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]",
    clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
  }
},
content: {
  className: "mx-auto max-w-2xl py-32 sm:py-24 lg:py-24",
  announcementContainer: {
    className: "hidden sm:mb-8 sm:flex sm:justify-center",
    announcement: {
      className: "relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20",
      text: "Announcing our next round of funding.",
      link: {
        href: "#",
        className: "font-semibold text-indigo-600",
        text: "Read more",
        icon: "→"
      }
    }
  },
  title: {
    className: "text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl",
    text: "Data to enrich your online business"
  },
  description: {
    className: "mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8",
    text: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat."
  },
  actions: {
    className: "mt-10 flex items-center justify-center gap-x-6",
    ctaButton: {
      href: "#",
      className: "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
      text: "Get started"
    },
    learnMore: {
      href: "#",
      className: "text-sm/6 font-semibold text-gray-900",
      text: "Learn more",
      icon: "→"
    }
  }
},
blurEffectBottom: {
  className: "absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]",
  div: {
    className: "relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]",
    clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
  }
}}

const seedDatabase = async () => {
  try {
    // MongoDB bağlantısı
    console.log('Başladı');
    await mongoose.connect('mongodb+srv://selimgunaydin:5jXD6jfStjovZp3G@cluster0.jlrvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('MongoDB bağlantısı başarılı!');

    // Eski verileri temizleme
    await Hero.deleteMany({});
    console.log('Eski Hero verileri temizlendi.');

    // Yeni veriler ekleme
    await Hero.create(heroSeed);
    console.log('Hero verisi başarıyla eklendi.');

    // Bağlantıyı kapatma
    mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı.');
  } catch (error) {
    console.error('Veritabanı işlemi sırasında bir hata oluştu:', error);
  }
};

// Seed fonksiyonunu çağırma
seedDatabase();
