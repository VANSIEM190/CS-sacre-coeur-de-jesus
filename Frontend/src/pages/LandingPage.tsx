import { Navbar, Footer } from '@/components/layout'
import {
  SectionAprpos,
  SectionContact,
  SectionHystorique,
  NosProgrammes,
  HeroSection,
  Loader,
} from '@/components/common'
import { useUser } from '@/contexts'

const LandingPage = () => {
  const { loading } = useUser()

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className="min-h-screen w-full bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header Navigation */}
        <Navbar />
        {/* Hero Section */}
        <HeroSection />
        {/* History Section */}
        <SectionHystorique />
        {/* About Section */}
        <SectionAprpos />
        {/* Programs Section */}
        <NosProgrammes />
        {/* Contact Section */}
        <SectionContact />
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
