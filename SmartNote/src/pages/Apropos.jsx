import { motion } from 'framer-motion'

const Apropos = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-gray-600 body-font overflow-hidden"
      >
        <h1 className="text-4xl font-bold text-center mb-10">
          À Propos de Nous
        </h1>

        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-full  flex justify-center flex-wrap">
            <div className=" w-3/4 shadow-2xl  p-5 rounded-2xl lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-center text-2xl font-medium mb-4">
                COMPLEXE SCOLAIRE SACRE{' '}
                <span className="text-blue-500">COEUR</span> DE JESUS
              </h1>

              <p className="leading-relaxed mb-4">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean. Fam locavore kickstarter distillery.
                Mixtape chillwave tumeric sriracha taximy chia microdosing tilde
                DIY. XOXO fam inxigo juiceramps cornhole raw denim forage
                brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub
                blue bottle austin listicle pour-over, neutra jean. Fam locavore
                kickstarter distillery. Mixtape chillwave tumeric sriracha
                taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps
                cornhole raw denim forage brooklyn. Everyday carry +1 seitan
                poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean. Fam locavore kickstarter distillery.
                Mixtape chillwave tumeric sriracha taximy chia microdosing tilde
                DIY. XOXO fam inxigo juiceramps cornhole raw denim forage
                brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub
                blue bottle austin listicle pour-over, neutra jean.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default Apropos
