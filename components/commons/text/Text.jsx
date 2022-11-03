import { Paragraph } from './Text.style'

export default function Text({ children, textSize, textUppercase, alignText }) {
  return (
    <Paragraph textSize={textSize} textUppercase={textUppercase} alignText={alignText}>{children}</Paragraph>
  )
}