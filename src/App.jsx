import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, Live } from './pages';
import PodcastDetails from './pages/PodcastDetails';
 
const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#082064] to-black">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Live />} />
              <Route path="Decouverte" element={<Discover />} />
              <Route path="/Top-journalistes" element={<TopArtists />} />
              <Route path="/Top-episodes" element={<TopCharts />} />
              <Route path="/Podcasts" element={<AroundYou />} />
              <Route path="/Journalistes/:id" element={<ArtistDetails />} />
              <Route path="/Episode/:Episodeid" element={<SongDetails />} />
              <Route path="/Podcast/:Podcastid" element={<PodcastDetails />} />
              <Route path="/Search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.Titre && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
