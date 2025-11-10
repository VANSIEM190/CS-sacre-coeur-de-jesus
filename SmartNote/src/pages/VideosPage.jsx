import React, { useState } from "react";
import {Navbar , Footer} from '../components/layout'


export default function ListeVideos() {
  const [videos, setVideos] = useState([
    {id:1,url:'/nig.mp4', titre:'film' , description:'film nigérien interdit'},
    {id:2,url:'/nig.mp4', titre:'film' , description:'film nigérien interdit'},
    {id:3,url:'/nig.mp4', titre:'film' , description:'film nigérien interdit'},
    {id:4,url:'/nig.mp4', titre:'film' , description:'film nigérien interdit'},
    {id:5,url:'/nig.mp4', titre:'film' , description:'film nigérien interdit'},
    {id:6,url:'/nig.mp4', titre:'film' , description:'film nigérien interdit'},
  ]);


  function togglePlay(videoId) {
    const videoElement = document.getElementById(`video-${videoId}`);
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Vidéos publiées</h1>

        {videos.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>Aucune vidéo publiée pour le moment 🎥</p>
            <p className="text-sm">Les vidéos apparaîtront ici une fois qu'elles seront ajoutées.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="relative w-full h-48 bg-gray-200">
                  <video
                    id={`video-${video.id}`}
                    src={video.url}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />

                  <button
                    onClick={() => togglePlay(video.id)}
                    className="absolute bottom-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                  >
                    ▶ / ❚❚
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{video.titre}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
