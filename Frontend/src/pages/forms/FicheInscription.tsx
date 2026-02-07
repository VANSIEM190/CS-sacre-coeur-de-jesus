import React from 'react'
import useEtatUtilisateur from '@/hooks/useEtatUtilisateur'
import { Button } from '../../components/ui'
import { useNavigate } from 'react-router-dom'
import { Footer, Navbar } from '../../components/layout'

const FicheInscription = () => {
  const { studentData } = useEtatUtilisateur()
  const navigate = useNavigate()

  const generateIdDocUser = () => {
    const radomNumber = Math.floor(Math.random() * 100000)
    const prefix = 'vansiem'.substring(0, 3)
    const idGenerer = `${prefix}-${radomNumber}`
    return idGenerer
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto my-25 px-6">
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-xl mb-8 flex items-center gap-4 no-print">
          <div className="bg-emerald-500 text-white rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">Pré-inscription enregistrée !</p>
            <p className="text-sm opacity-90">
              Votre dossier est prêt. Veuillez suivre les instructions
              ci-dessous pour la validation finale.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print-shadow">
          <div className="bg-slate-900 text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold mb-1">
                  Fiche d'Inscription
                </h1>
                <p className="text-slate-400">
                  Année Scolaire {new Date().getFullYear()} -{' '}
                  {new Date().getFullYear() + 1}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                  N° Dossier
                </p>
                <p className="text-2xl font-mono font-bold text-indigo-400">
                  #{generateIdDocUser()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-lg font-bold border-b border-slate-100 pb-2 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
              Informations Personnelles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                  Nom complet
                </p>
                <p className="text-lg font-medium">
                  {studentData?.nom} {studentData?.postnom}{' '}
                  {studentData?.prenom}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                  Date de naissance
                </p>
                <p className="text-lg font-medium">
                  {studentData?.datenaissance}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                  Email professionnel
                </p>
                <p className="text-lg font-medium text-indigo-600">
                  {studentData?.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                  Téléphone
                </p>
                <p className="text-lg font-medium">{studentData?.telephone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                  classe sollicitée
                </p>
                <p className="text-lg font-bold text-indigo-900">
                  {studentData?.optioneleve}
                </p>
              </div>
            </div>

            <div className="mt-12 bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
              <h2 className="text-indigo-900 font-bold text-xl mb-6 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Pièces à fournir pour la validation
              </h2>

              <p className="text-indigo-800/80 mb-6 text-sm">
                Pour que votre inscription soit définitivement validée par
                l'administration de l'école, vous devez vous présenter au
                secrétariat muni des documents suivants :
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="mt-1 min-w-5 h-5 w-5 rounded border-2 border-indigo-300 flex items-center justify-center"></div>
                  <div>
                    <p className="font-bold text-indigo-950">
                      rame de papier duplicateur
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 min-w-5 h-5 w-5 rounded border-2 border-indigo-300 flex items-center justify-center"></div>
                  <div>
                    <p className="font-bold text-indigo-950">
                      dossier au complet
                    </p>
                    <p className="text-xs text-indigo-700/60">
                      plus certificat si l'élève est à la classe supérieur que
                      la (6ème)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 min-w-5 h-5 w-5 rounded border-2 border-indigo-300 flex items-center justify-center"></div>
                  <div>
                    <p className="font-bold text-indigo-950">
                      Deux (2) photos d'identité récentes
                    </p>
                    <p className="text-xs text-indigo-700/60">
                      (Format 4x4, fond blanc)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 min-w-5 h-5 w-5 rounded border-2 border-indigo-300 flex items-center justify-center"></div>
                  <div>
                    <p className="font-bold text-indigo-950">
                      L'inscription est gratuit pas de frais
                    </p>
                    <p className="text-xs text-indigo-700/60">
                      (Pas de frais d'inscription)
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-indigo-200">
                <div className="flex items-center gap-2 text-indigo-900 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Délai de rigueur :{' '}
                    <strong>
                      Après une semaine si vous ne déposez pas vos dossiers
                      l'inscription sera annulée
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="primary"
            className={'mb-3 ml-8 hover:scale-100'}
            onClick={() => navigate(-1)}
          >
            Retour
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default FicheInscription
