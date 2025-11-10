import { Routes, Route } from "react-router-dom";
import { lazy , Suspense  } from "react";
import {LandingPage , Apropos , AnnoncePage , ListeVideos} from "../pages";
import { FormulaireConnection , ParentForm } from "../components/forms";


const RouterApp = ()=>{
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/propos" element={<Apropos/>}/>
        <Route path="/connexion" element={<FormulaireConnection/>}/>
        <Route path="/inscription" element={<ParentForm/>}/>
        <Route path="/Annonces" element={<AnnoncePage/>}/>
        <Route path="/nos-videos" element={<ListeVideos/>}/>
      </Routes>
    </Suspense>
  );
}

export default RouterApp