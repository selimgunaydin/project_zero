import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// .env.local dosyasını yükle
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Base widget şeması (diğer widget türleri için temel)
const baseWidgetSchema = new mongoose.Schema({
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// Hero Widget
const heroSchema = new mongoose.Schema({
  ...baseWidgetSchema.obj,
  container: {
    className: String
  },
  innerContainer: {
    className: String
  },
  content: {
    className: String,
    announcementContainer: {
      className: String,
      announcement: {
        className: String,
        text: String,
        link: {
          href: String,
          className: String,
          text: String,
          icon: String
        }
      }
    },
    title: {
      className: String,
      text: String
    },
    description: {
      className: String,
      text: String
    },
    actions: {
      className: String,
      ctaButton: {
        href: String,
        className: String,
        text: String
      },
      learnMore: {
        href: String,
        className: String,
        text: String,
        icon: String
      }
    }
  }
});

// Stats Widget
const statsSchema = new mongoose.Schema({
  ...baseWidgetSchema.obj,
  container: {
    className: String
  },
  innerContainer: {
    className: String
  },
  statData: [{
    id: Number,
    name: String,
    value: String,
    nameClass: String,
    valueClass: String
  }]
});

// Feature Widget
const featureSchema = new mongoose.Schema({
  ...baseWidgetSchema.obj,
  container: {
    className: String
  },
  innerContainer: {
    className: String
  },
  content: {
    gridContainer: {
      className: String
    },
    textContainer: {
      className: String
    },
    textContent: {
      className: String,
      subtitle: {
        className: String,
        text: String
      },
      title: {
        className: String,
        text: String
      },
      description: {
        className: String,
        text: String
      }
    },
    featureList: {
      className: String,
      items: [{
        name: String,
        description: {
          className: String,
          text: String
        },
        container: {
          className: String
        },
        title: {
          className: String
        },
        icon: {
          className: String
        }
      }]
    }
  }
});

// Testimonials Widget
const testimonialsSchema = new mongoose.Schema({
  ...baseWidgetSchema.obj,
  container: {
    className: String
  },
  innerContainer: {
    className: String
  },
  content: {
    header: {
      className: String,
      subtitle: {
        className: String,
        text: String
      },
      title: {
        className: String,
        text: String
      }
    },
    testimonials: {
      className: String,
      items: [{
        container: {
          className: String
        },
        figure: {
          className: String
        },
        quote: {
          className: String,
          text: String
        },
        author: {
          container: {
            className: String
          },
          image: {
            className: String,
            src: String,
            alt: String
          },
          name: {
            className: String,
            text: String
          },
          role: {
            className: String,
            text: String
          }
        }
      }]
    }
  }
});

// Pricing Widget
const pricingSchema = new mongoose.Schema({
  ...baseWidgetSchema.obj,
  container: {
    className: String
  },
  innerContainer: {
    className: String
  },
  content: {
    header: {
      className: String,
      subtitle: {
        className: String,
        text: String
      },
      title: {
        className: String,
        text: String
      },
      description: {
        className: String,
        text: String
      }
    },
    plans: {
      className: String,
      items: [{
        name: String,
        description: String,
        price: String,
        period: String,
        container: {
          className: String
        },
        header: {
          className: String,
          name: {
            className: String
          },
          description: {
            className: String
          },
          price: {
            container: {
              className: String
            },
            amount: {
              className: String
            },
            period: {
              className: String
            }
          }
        },
        features: {
          className: String,
          items: [{
            text: String,
            container: {
              className: String
            },
            icon: {
              className: String
            }
          }]
        },
        cta: {
          href: String,
          className: String,
          text: String
        }
      }]
    }
  }
});

// Block Carousel Widget
const blockCarouselSchema = new mongoose.Schema({
  ...baseWidgetSchema.obj,
  container: {
    className: String
  },
  innerContainer: {
    className: String
  },
  content: {
    subtitle: {
      className: String,
      text: String
    },
    title: {
      className: String,
      text: String
    },
    blocks: {
      className: String,
      items: [{
        title: String,
        description: String,
        container: {
          className: String
        },
        innerContainer: {
          className: String
        },
        content: {
          className: String,
          title: {
            className: String
          },
          description: {
            className: String
          }
        },
        imageContainer: {
          className: String
        },
        image: {
          width: Number,
          height: Number,
          className: String,
          src: String,
          alt: String
        }
      }]
    }
  }
});

// Newsletter Widget
const newsletterSchema = new mongoose.Schema({
  ...baseWidgetSchema.obj,
  container: {
    className: String
  },
  innerContainer: {
    className: String
  },
  content: {
    header: {
      className: String,
      title: {
        className: String,
        text: String
      },
      description: {
        className: String,
        text: String
      }
    },
    form: {
      className: String,
      inputContainer: {
        className: String,
        label: {
          className: String,
          text: String
        },
        input: {
          className: String,
          placeholder: String
        }
      },
      button: {
        className: String,
        text: String
      }
    },
    features: {
      className: String,
      items: [{
        title: {
          className: String,
          text: String
        },
        description: {
          className: String,
          text: String
        },
        container: {
          className: String
        },
        icon: {
          container: {
            className: String
          },
          className: String
        }
      }]
    }
  }
});

// Widget List Schema
const widgetListSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['hero', 'feature', 'testimonials', 'pricing', 'newsletter', 'stats', 'block-carousel']
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

import { heroData } from '../app/components/widgets/hero/mockData';
import { statsData } from '../app/components/widgets/stats/mockData';
import { featureData } from '../app/components/widgets/feature/mockData';
import { testimonialsData } from '../app/components/widgets/testimonials/mockData';
import { pricingData } from '../app/components/widgets/pricing/mockData';
import { blockCarouselData } from '../app/components/widgets/block-carousel/mockData';
import { newsletterData } from '../app/components/widgets/newsletter/mockData';

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
    const HeroWidget = models.HeroWidget || mongoose.model('HeroWidget', heroSchema);
    const StatsWidget = models.StatsWidget || mongoose.model('StatsWidget', statsSchema);
    const FeatureWidget = models.FeatureWidget || mongoose.model('FeatureWidget', featureSchema);
    const TestimonialsWidget = models.TestimonialsWidget || mongoose.model('TestimonialsWidget', testimonialsSchema);
    const PricingWidget = models.PricingWidget || mongoose.model('PricingWidget', pricingSchema);
    const BlockCarouselWidget = models.BlockCarouselWidget || mongoose.model('BlockCarouselWidget', blockCarouselSchema);
    const NewsletterWidget = models.NewsletterWidget || mongoose.model('NewsletterWidget', newsletterSchema);
    
    // Eski widget'ları seed'le
    await Promise.all([
      HeroWidget.deleteMany({}),
      StatsWidget.deleteMany({}),
      FeatureWidget.deleteMany({}),
      TestimonialsWidget.deleteMany({}),
      PricingWidget.deleteMany({}),
      BlockCarouselWidget.deleteMany({}),
      NewsletterWidget.deleteMany({})
    ]);
    console.log('Mevcut widget\'lar temizlendi');
    
    await Promise.all([
      HeroWidget.create({ ...heroData, isActive: true }),
      StatsWidget.create({ ...statsData, isActive: true }),
      FeatureWidget.create({ ...featureData, isActive: true }),
      TestimonialsWidget.create({ ...testimonialsData, isActive: true }),
      PricingWidget.create({ ...pricingData, isActive: true }),
      BlockCarouselWidget.create({ ...blockCarouselData, isActive: true }),
      NewsletterWidget.create({ ...newsletterData, isActive: true })
    ]);
    console.log('Eski widget\'lar başarıyla eklendi');

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