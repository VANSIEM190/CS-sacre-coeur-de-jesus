import {Navbar , Footer} from '../components/layout'
import {Info} from '../components/common'


const LandingPage = () => {

  return (
    <>
    <Navbar/>
    <section className="py-5 md:py- bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            Trouvez le <span className="text-indigo-600">meilleur cours</span> pour vous
          </h1>
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
            <ToumaiCode />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-700 dark:text-gray-100 mb-8">
            Notre atténence ! Une école 300% en ligne et un modèle pédagogique unique 
            qui seront les clés de votre réseau.
          </p>
          
          <div className="bg-white dark:bg-gray-300 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-center md:text-left">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Référence du cours</h3>
                <p className="text-gray-600">Trouvez le programme parfait pour vos objectifs</p>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                Exécutez ce cours
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Info/>
    <Footer/>
    </>
  )
}
const ToumaiCode = () => {
  return (
    <span className="font-mono">
      &lt;SchoolLink<span className="animate-pulse">|</span>/&gt;
    </span>
  );
};

export default LandingPage

