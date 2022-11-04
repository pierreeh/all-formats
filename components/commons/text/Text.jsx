import { Paragraph } from './Text.style'

export default function Text({ children, textSize, textUppercase, alignText, textColor }) {
  return (
    <Paragraph
      textSize={textSize}
      textUppercase={textUppercase}
      alignText={alignText}
      textColor={textColor}
    >
        {children}
      </Paragraph>
  )
}