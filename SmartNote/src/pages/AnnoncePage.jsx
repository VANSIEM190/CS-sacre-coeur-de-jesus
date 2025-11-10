import React, { useState, useEffect, useRef } from "react";
import {Navbar , Footer} from '../components/layout'


export default function AnnoncePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // { file, url }
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  // Charger les posts depuis localStorage au montage
  useEffect(() => {
    const raw = localStorage.getItem("annonces_posts_v1");
    if (raw) {
      try {
        setPosts(JSON.parse(raw));
      } catch (e) {
        console.error("Erreur parse localStorage", e);
      }
    }
  }, []);

  // Sauvegarder les posts dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("annonces_posts_v1", JSON.stringify(posts));
  }, [posts]);

  // Gérer l'ajout d'images via l'input fichier
  function handleFilesChange(e) {
    const files = Array.from(e.target.files || []);
    const mapped = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...mapped]);
    // reset input pour permettre re-sélection du même fichier si besoin
    e.target.value = null;
  }

  function removeImage(index) {
    // Révoquer l'URL pour libérer la mémoire
    URL.revokeObjectURL(images[index].url);
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function clearImagesURLs(imgsArray) {
    imgsArray.forEach((i) => {
      try { URL.revokeObjectURL(i.url); } catch(_) {}
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() && !description.trim() && images.length === 0) return;

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      images: images.map((i) => ({ url: i.url, name: i.file.name, size: i.file.size })),
      createdAt: new Date().toISOString(),
    };

    setPosts((p) => [newPost, ...p]);

    // on ne révoque pas immédiatement les URLs des images du post (elles sont utilisées)
    // Réinitialiser le formulaire
    setTitle("");
    setDescription("");
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  function handleDeletePost(postId) {
    const toDelete = posts.find((p) => p.id === postId);
    if (toDelete) {
      // Les URLs des images du post seront révoquées avant suppression
      clearImagesURLs(toDelete.images);
    }
    setPosts((p) => p.filter((x) => x.id !== postId));
  }

  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 dark:text-gray-300">Publier une annonce</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Titre</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border dark:border-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:placeholder:text-gray-300 dark:text-gray-100"
              placeholder="Titre de l'annonce"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border dark:border-white rounded px-3 py-2 h-28 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:placeholder:text-gray-300 dark:text-gray-100"
              placeholder="Décrivez votre annonce"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Photos</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow-sm hover:bg-indigo-700">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="hidden"
                />
                <span>Choisir des images</span>
              </label>
              <small className="text-gray-500">(png, jpg — max recommandé 5 Mo par image)</small>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img.url} alt={img.file.name} className="w-full h-28 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs shadow"
                    >
                      ✕
                    </button>
                    <div className="text-xs text-gray-600 truncate mt-1">{img.file.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                images.forEach((i) => URL.revokeObjectURL(i.url));
                setImages([]);
                if (fileInputRef.current) fileInputRef.current.value = null;
              }}
              className="px-4 py-2 rounded border dark:border-white dark:text-gray-100"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Publier
            </button>
          </div>
        </form>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Annonces publiées</h2>

          {posts.length === 0 ? (
            <div className="text-gray-500">Aucune annonce pour le moment. Soyez le premier !</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg dark:text-gray-100">{post.title || "(Sans titre)"}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-100">{new Date(post.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 text-sm"
                      >Supprimer</button>
                    </div>
                  </div>

                  {post.description && <p className="mt-3 text-gray-700 dark:text-gray-100">{post.description}</p>}

                  {post.images && post.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {post.images.map((img, idx) => (
                        <img key={idx} src={img.url} alt={img.name} className="w-full h-40 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
}
