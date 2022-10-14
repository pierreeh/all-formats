import { MainFooter } from './Footer.style'

export default function Footer() {
  return (
    <MainFooter>
      <p>Copyright &copy; {new Date().getFullYear()}</p>
    </MainFooter>
  )
}