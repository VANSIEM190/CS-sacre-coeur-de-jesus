import { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { UserCircle, Upload } from "lucide-react";

export default function UploadProfile({ 
  onRegister, 
  onBack, 
  initialValues , 
  onImageSelect
}) {
  const [selectedImage, setSelectedImage] = useState(initialValues || null);
  const [preview, setPreview] = useState(null);

  useEffect(()=>{
    if(selectedImage){
      const previewUrl = URL.createObjectURL(selectedImage)
      setPreview(previewUrl)
      return ()=>URL.revokeObjectURL(previewUrl)
    }
  },[selectedImage])

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      onImageSelect(file)
    }
  };

  // Gérer le bouton "S'inscrire"
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Veuillez sélectionner une image avant de vous inscrire !");
      return;
    }
    onRegister(selectedImage);
  };

  return (
    <div className="flex items-center justify-center min-h-4/5 ">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="dark:bg-gray-800 bg-white/90 backdrop-blur-lg dark:shadow shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Télécharge ta photo de profil
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-full overflow-hidden hover:border-indigo-500 transition"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <UserCircle size={64} />
                <span className="text-sm mt-1">Choisir une image</span>
              </div>
            )}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onBack}
              className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
            >
              Retour
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
            >
              <Upload size={18} />
              S’inscrire
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
