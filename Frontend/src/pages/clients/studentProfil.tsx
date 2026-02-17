import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui'
import { Footer, Navbar } from '@/components/layout'
import { useUser } from '@/contexts'
const StudentProfile = () => {
  const { data } = useUser()

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-6 border-b pb-6">
            <Avatar>
              <AvatarImage
                src={
                  data?.photo_path &&
                  `http://localhost:3000/assets/${data.photo_path}`
                }
                alt="profil_élève"
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
              />
              <AvatarFallback>
                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-slate-200 flex items-center justify-center text-gray-600 font-semibold">
                  {data?.nom?.charAt(0).toUpperCase() ?? 'S'}
                </div>
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {data?.nom} {data?.prenom}
              </h2>
              <p className="text-gray-500">{data?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                Valide
              </span>
            </div>
          </div>

          {/* Informations */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Prénom</p>
              <p className="font-semibold text-gray-800">{data?.prenom}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Nom</p>
              <p className="font-semibold text-gray-800">{data?.nom}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-gray-800">{data?.email}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Rôle</p>
              <p className="font-semibold text-gray-800">{'élève'}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl shadow-sm md:col-span-2">
              <p className="text-gray-500 text-sm">Date d'inscription</p>
              <p className="font-semibold text-gray-800">
                {new Date(data?.created_at).toDateString()}
              </p>
            </div>
          </div>

          {/* Bouton */}
          <div className="mt-8 text-right">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl shadow-md">
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentProfile
