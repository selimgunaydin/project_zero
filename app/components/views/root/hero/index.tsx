import { connectDB } from '@/app/lib/mongodb';
import Hero from '@/app/models/Hero';

export default async function HeroComponent() {
  await connectDB(); 

  const heroData:any = await Hero.findOne(); 
  return (
    <div className={heroData.container.className}>
      <div className={heroData.innerContainer.className}>
        <div aria-hidden="true" className={heroData.blurEffectTop.className}>
          <div 
            style={{clipPath: heroData.blurEffectTop.div.clipPath}}
            className={heroData.blurEffectTop.div.className}
          />
        </div>

        <div className={heroData.content.className}>
          <div className={heroData.content.announcementContainer.className}>
            <div className={heroData.content.announcementContainer.announcement.className}>
              {heroData.content.announcementContainer.announcement.text}{" "}
              <a href={heroData.content.announcementContainer.announcement.link.href} className={heroData.content.announcementContainer.announcement.link.className}>
                <span aria-hidden="true" className="absolute inset-0" />
                {heroData.content.announcementContainer.announcement.link.text} <span aria-hidden="true">{heroData.content.announcementContainer.announcement.link.icon}</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className={heroData.content.title.className}>
              {heroData.content.title.text}
            </h1>
            <p className={heroData.content.description.className}>
              {heroData.content.description.text}
            </p>
            <div className={heroData.content.actions.className}>
              <a href={heroData.content.actions.ctaButton.href} className={heroData.content.actions.ctaButton.className}>
                {heroData.content.actions.ctaButton.text}
              </a>
              <a href={heroData.content.actions.learnMore.href} className={heroData.content.actions.learnMore.className}>
                {heroData.content.actions.learnMore.text} <span aria-hidden="true">{heroData.content.actions.learnMore.icon}</span>
              </a>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className={heroData.blurEffectBottom.className}>
          <div 
            style={{clipPath: heroData.blurEffectBottom.div.clipPath}}
            className={heroData.blurEffectBottom.div.className}
          />
        </div>
      </div>
    </div>
  );
}