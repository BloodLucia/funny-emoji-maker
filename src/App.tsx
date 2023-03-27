import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Main } from './components/Main'
import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import './global.css'

const App = () => {
  return (
    <>
      <Header />
      <section className='hidden md:block glow-bg' />
      <Main />
      <Footer />
    </>
  )
}

export default App
