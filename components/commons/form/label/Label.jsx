import { StyledLabel } from './Label.style'

export default function Label({ children, htmlFor, errors }) {
  return (
    <StyledLabel htmlFor={htmlFor} errors={errors}>{children}</StyledLabel>
  )
}