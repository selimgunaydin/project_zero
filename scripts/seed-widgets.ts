import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// .env.local dosyasını yükle
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Widget List Schema
const widgetListSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    unique: true
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  order: { 
    type: Number, 
    required: true 
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

import { mockData as heroData } from '../app/widgets/hero/mockData';
import { mockData as statsData } from '../app/widgets/stats/mockData';
import { mockData as featureData } from '../app/widgets/feature/mockData';
import { mockData as testimonialsData } from '../app/widgets/testimonials/mockData';
import { mockData as pricingData } from '../app/widgets/pricing/mockData';
import { mockData as blockCarouselData } from '../app/widgets/block-carousel/mockData';
import { mockData as newsletterData } from '../app/widgets/newsletter/mockData';
import { unique } from 'next/dist/build/utils';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI ortam değişkeni tanımlanmamış!');
}

const widgets = [
  {
    name: 'Hero',
    type: 'hero',
    isActive: true,
    order: 1,
    data: heroData
  },
  {
    name: 'Features',
    type: 'feature',
    isActive: true,
    order: 2,
    data: featureData
  },
  {
    name: 'Stats',
    type: 'stats',
    isActive: true,
    order: 3,
    data: statsData
  },
  {
    name: 'Block Carousel',
    type: 'block-carousel',
    isActive: true,
    order: 4,
    data: blockCarouselData
  },
  {
    name: 'Testimonials',
    type: 'testimonials',
    isActive: true,
    order: 5,
    data: testimonialsData
  },
  {
    name: 'Pricing',
    type: 'pricing',
    isActive: true,
    order: 6,
    data: pricingData
  },
  {
    name: 'Newsletter',
    type: 'newsletter',
    isActive: true,
    order: 7,
    data: newsletterData
  }
];

async function seedWidgets(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB bağlantısı başarılı');
    
    // Models
    const models = mongoose.models;
    const WidgetList = models.WidgetList || mongoose.model('WidgetList', widgetListSchema);

    // Yeni widget listesini seed'le
    await WidgetList.deleteMany({});
    await WidgetList.insertMany(widgets);
    console.log('Widget listesi başarıyla eklendi');

    await mongoose.disconnect();
    console.log('MongoDB bağlantısı kapatıldı');
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seedWidgets(MONGODB_URI); 