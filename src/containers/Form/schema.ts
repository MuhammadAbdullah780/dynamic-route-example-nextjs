import * as yup from "yup";

export const schema = yup.object({
  country: yup.string(),
  status: yup.string(),
  onSale: yup.boolean().default(false),
  price: yup.number().min(0).max(98000),
});
