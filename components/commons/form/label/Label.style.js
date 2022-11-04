import styled from "styled-components"

import { primaryColors, primaryColorsAlpha } from "components/commons/Theme"
import { rem } from "styles/GlobalStyle.style"

export const StyledLabel = styled.label`
  margin: ${rem(16)} 0;
  display: block;
  color: ${({ errors }) => errors ? primaryColors.error : primaryColors.primaryText};
  transition: all .24s ease-in-out;

  input {
    font-family: 'Poppins', sans-serif;
		color: ${primaryColors.primaryText};
    border-style: solid;
    border-width: ${rem(1)};
    border-color: ${({ errors }) => errors ? primaryColors.error : primaryColorsAlpha.primaryText24};
    padding: ${rem(4)} ${rem(8)};
    display: block;
    width: 100%;
    border-radius: ${rem(4)};
    transition: all .24s ease-in-out;

    &:focus {
      outline: ${({ errors }) => errors ? `${rem(1)} solid ${primaryColors.error}` : `${rem(1)} solid ${primaryColorsAlpha.primaryText64}`};
    }
  }

  span {
    display: block;
    font-size: ${rem(12)};
    color: ${primaryColors.error};
  }
`