import { AvatarContainer, AvatarImg } from './Avatar.style'

export default function Avatar({ src, alt, fill, sizes }) {
  return (
    <AvatarContainer>  
      <AvatarImg
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
      />
    </AvatarContainer>
  )
}