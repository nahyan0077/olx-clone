import * as Yup from 'yup';

export const sellFormValidationSchema = Yup.object({
    name: Yup.string().required('Product name is required').matches(/^\S*$/, 'Product name must not contain spaces'),
    category: Yup.string().required('Category is required').matches(/^\S*$/, 'Category must not contain spaces'),
    price: Yup.string().required('Price is required').matches(/^\S*$/, 'Price must not contain spaces'),
});
