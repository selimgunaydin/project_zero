import HeroWidget from '@/app/components/widgets/hero';
import { connectDB } from '@/app/lib/mongodb';
import Hero from '@/app/models/Hero';

export default async function HeroComponent() {
  await connectDB(); 

  const heroData:any = await Hero.findOne(); 

  return (
    <HeroWidget data={heroData} />
  );
}