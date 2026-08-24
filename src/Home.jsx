import React, { useState } from 'react'
import GiftCardFanCircle from './MetallicCard'
import BurningGlowDemo, { BurningTopGlow } from './BurningTopGlow'
import HeroSection from './Hero'
import { Lens } from './Card'
import LensDemo from './LensCard'
import ContactSection from './Contact'
import Footer from './Footer'
import AnalysisPage from './AnalysisPage'
// import GiftCardShowcase from './MetallicCard'

const Home = () => {
    const [page, setPage] = useState('home')
    const [url, setUrl] = useState('')

    const onBack = () => setPage('home')

    
    return (
        <>
            {page == 'home' ?
                <div className='overflow-hidden'>
                    {/* <BurningTopGlow/> */}
                    {/* <BurningGlowDemo/> */}
                    <HeroSection />
                    <LensDemo />
                    <GiftCardFanCircle />
                    <ContactSection />
                    <Footer />
                    {/* <div className='min-h-screen'></div> */}
                </div>
                :
                <AnalysisPage onBack={onBack} />
            }
        </>
    )
}

export default Home