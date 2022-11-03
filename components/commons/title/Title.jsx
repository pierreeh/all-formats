import { StyledTitle } from './Title.style'

export default function Title({ children, textSize, margins, as }) {
  return (
    <StyledTitle
      textSize={textSize}
      margins={margins}
      as={as}
    >
      {children}
    </StyledTitle>
  )
}