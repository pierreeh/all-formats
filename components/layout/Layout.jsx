import Header from "components/header/Header"
import Footer from "components/footer/Footer"

export default function Layout({ children }) {
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
      </div>
      
      <Footer />
    </>
  )
}