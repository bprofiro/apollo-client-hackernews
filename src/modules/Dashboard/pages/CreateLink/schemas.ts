import * as yup from 'yup'

export const createLinkFormSchema = yup.object().shape({
  url: yup.string().required('URL is required').url('Indalid URL'),
  description: yup.string().required('Description is required')
})