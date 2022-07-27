import { Routes, Route } from 'react-router-dom';
import VotingPage from 'pages/VotingPage';
import BreedsPage from 'pages/BreedsPage';
import GalleryPage from 'pages/GalleryPage';
import BreedInfoPage from 'pages/BreedInfoPage';
import Hero from '../Hero';
import s from './Main.module.css';

const Main = () => {
  return (
    <main className={s.Main}>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/voting" element={<VotingPage />} />

        <Route path="/breeds" element={<BreedsPage />} />

        <Route path="/gallery" element={<GalleryPage />} />

        <Route path="/breeds/:id" element={<BreedInfoPage />} />
      </Routes>
    </main>
  );
};

export default Main;
