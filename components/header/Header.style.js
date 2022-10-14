import Image from 'next/future/image'
import styled from "styled-components"

import { rem } from "styles/GlobalStyle.style"

export const AvatarContainer = styled.figure`
  position: relative;
  height: ${rem(56)};
  width: ${rem(56)};
`

export const Avatar = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`