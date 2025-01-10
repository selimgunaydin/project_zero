// models/hero.ts
import mongoose, { Schema, Document, Model, model } from 'mongoose';

// Interface for the blur effect
interface IBlurEffect extends Document {
  className: string;
  div: {
    className: string;
    clipPath: string;
  };
}

// Interface for the announcement link
interface IAnnouncementLink extends Document {
  href: string;
  className: string;
  text: string;
  icon: string;
}

// Interface for the announcement
interface IAnnouncement extends Document {
  className: string;
  text: string;
  link: IAnnouncementLink;
}

// Interface for the title
interface ITitle extends Document {
  className: string;
  text: string;
}

// Interface for the description
interface IDescription extends Document {
  className: string;
  text: string;
}

// Interface for button
interface IButton extends Document {
  href: string;
  className: string;
  text: string;
}

// Interface for actions
interface IActions extends Document {
  className: string;
  ctaButton: IButton;
  learnMore: IButton;
}

// Interface for content
interface IContent extends Document {
  className: string;
  announcementContainer: {
    className: string;
    announcement: IAnnouncement;
  };
  title: ITitle;
  description: IDescription;
  actions: IActions;
}

// Main Hero interface
export interface IHero extends Document {
  container: { className: string };
  innerContainer: { className: string };
  blurEffectTop: IBlurEffect;
  content: IContent;
  blurEffectBottom: IBlurEffect;
}

// Schema definitions
const BlurEffectSchema = new Schema<IBlurEffect>({
  className: { type: String, required: true },
  div: {
    className: { type: String, required: true },
    clipPath: { type: String, required: true },
  },
});

const AnnouncementLinkSchema = new Schema<IAnnouncementLink>({
  href: { type: String, required: true },
  className: { type: String, required: true },
  text: { type: String, required: true },
  icon: { type: String, required: true },
});

const AnnouncementSchema = new Schema<IAnnouncement>({
  className: { type: String, required: true },
  text: { type: String, required: true },
  link: { type: AnnouncementLinkSchema, required: true },
});

const TitleSchema = new Schema<ITitle>({
  className: { type: String, required: true },
  text: { type: String, required: true },
});

const DescriptionSchema = new Schema<IDescription>({
  className: { type: String, required: true },
  text: { type: String, required: true },
});

const ButtonSchema = new Schema<IButton>({
  href: { type: String, required: true },
  className: { type: String, required: true },
  text: { type: String, required: true },
});

const ActionsSchema = new Schema<IActions>({
  className: { type: String, required: true },
  ctaButton: { type: ButtonSchema, required: true },
  learnMore: { type: ButtonSchema, required: true },
});

const ContentSchema = new Schema<IContent>({
  className: { type: String, required: true },
  announcementContainer: {
    className: { type: String, required: true },
    announcement: { type: AnnouncementSchema, required: true },
  },
  title: { type: TitleSchema, required: true },
  description: { type: DescriptionSchema, required: true },
  actions: { type: ActionsSchema, required: true },
});

const HeroSchema = new Schema<IHero>({
  container: {
    className: { type: String, required: true },
  },
  innerContainer: {
    className: { type: String, required: true },
  },
  blurEffectTop: { type: BlurEffectSchema, required: true },
  content: { type: ContentSchema, required: true },
  blurEffectBottom: { type: BlurEffectSchema, required: true },
});

// Model creation
export default mongoose.models.Hero as Model<IHero> || model<IHero>('Hero', HeroSchema);