import * as yup from 'yup';

const HeroDataSchema = yup.object({
  title: yup.string().required('Başlık zorunludur'),
  description: yup.string().required('Açıklama zorunludur'),
  buttonText: yup.string().required('Buton metni zorunludur'),
  buttonLink: yup.string().required('Buton linki zorunludur')
});

const FeatureSchema = yup.object({
  title: yup.string().required('Özellik başlığı zorunludur'),
  description: yup.string().required('Özellik açıklaması zorunludur')
});

const FeaturesDataSchema = yup.object({
  title: yup.string().required('Başlık zorunludur'),
  description: yup.string().required('Açıklama zorunludur'),
  features: yup.array().of(FeatureSchema).min(1, 'En az bir özellik eklenmelidir')
});

const CustomDataSchema = yup.object({
  componentName: yup.string().required('Bileşen adı zorunludur'),
  code: yup.string().required('Bileşen kodu zorunludur'),
  generatedComponent: yup.string().optional()
});

const StylesSchema = yup.object().shape({});

export const WidgetSchema = yup.object({
  name: yup.string().required('Widget adı zorunludur'),
  type: yup.string().oneOf(['Hero', 'Features', 'Custom'], 'Geçerli bir widget tipi seçin'),
  isActive: yup.boolean(),
  data: yup.mixed().when('type', {
    is: 'Hero',
    then: () => HeroDataSchema,
    otherwise: (val) => 
      val === 'Features' 
        ? FeaturesDataSchema 
        : CustomDataSchema
  }),
  styles: StylesSchema
});

export type WidgetFormData = yup.InferType<typeof WidgetSchema>; 