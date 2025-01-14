'use client';

import HeroWidget from '../widgets/hero';
import StatsWidget from '../widgets/stats';
import FeatureWidget from '../widgets/feature';
import TestimonialsWidget from '../widgets/testimonials';
import PricingWidget from '../widgets/pricing';
import BlockCarouselWidget from '../widgets/block-carousel';
import NewsletterWidget from '../widgets/newsletter';

interface Widget {
  _id: string;
  type: string;
  data: any;
}

interface Props {
  widgets: Widget[];
}

const widgetComponents = {
  hero: HeroWidget,
  stats: StatsWidget,
  feature: FeatureWidget,
  testimonials: TestimonialsWidget,
  pricing: PricingWidget,
  'block-carousel': BlockCarouselWidget,
  newsletter: NewsletterWidget,
};

export default function WidgetRenderer({ widgets }: Props) {
  return (
    <>
      {widgets.map((widget) => {
        const WidgetComponent = widgetComponents[widget.type.toLowerCase() as keyof typeof widgetComponents];
        if (!WidgetComponent) {
          console.warn(`Widget type "${widget.type}" not found`);
          return null;
        }
        return <WidgetComponent key={widget._id} data={widget.data} />;
      })}
    </>
  );
} 