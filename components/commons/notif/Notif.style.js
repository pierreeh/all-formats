import styled from "styled-components"

import { rem } from "styles/GlobalStyle.style"
import { primaryColors, primaryColorsAlpha } from "components/commons/Theme"

export const NotifContainer = styled.div`
  background-color: ${primaryColorsAlpha.error24};
  border: ${rem(1)} solid ${primaryColors.error};
  color: ${primaryColors.error};
  padding: ${rem(8)} ${rem(16)};
  border-radius: ${rem(4)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ margins }) => margins || ''};
`

export const Close = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  height: ${rem(16)};
  width: ${rem(16)};
  padding: 0;
  cursor: pointer;
  position: relative;

  &:before,
  &:after {
    content: '';
    height: ${rem(1)};
    width: ${rem(16)};
    background-color: ${primaryColors.error};
    display: flex;
    position: absolute;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`