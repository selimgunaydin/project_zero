import * as yup from 'yup';

export const CustomDataSchema = yup.object({
  componentName: yup.string().required('Bileşen adı zorunludur'),
  code: yup.string().required('Bileşen kodu zorunludur'),
  generatedComponent: yup.string().optional()
});

export const StylesSchema = yup.object().shape({});

export const WidgetSchema = yup.object({
  name: yup.string().required('Widget adı zorunludur'),
  type: yup.string().oneOf(['Hero', 'Features', 'Custom'], 'Geçerli bir widget tipi seçin'),
  isActive: yup.boolean(),
  data: yup.mixed().when('type', {
    is: 'Hero',
    then: () => CustomDataSchema,
  }),
  styles: StylesSchema
}); 