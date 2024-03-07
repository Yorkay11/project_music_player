import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };


  return (
    <div className={`relative flex flex-col w-[100%] ${i == 0 ? 'md:w-[100%]' : 'md:w-[47%] lg:w-[32%]'} p-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer`}>

      <div className={`relative w-full h-56 ${i == 0 ? 'h-96' : 'h-56'}  group`}>
        {i != 0 && <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.Titre === song.Titre ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        }

        {i == 0 && <div
          className={`absolute top-0 left-0 w-full h-full`}
          style={{
            background: 'radial-gradient(at top, transparent, rgba(0, 0, 0, .7), #000000)',
          }}
        />
        }

        <img alt="song_img" src={song?.IdPodcast?.Photo?.url} className={`w-full h-full object-cover rounded-lg`} />
      </div>



      <div className={`${i == 0 ? 'absolute bottom-16 ml-16 animate-slideup' : 'object-cover'} mt-4 flex flex-col`}>
        <p className={`font-semibold text-lg ${i == 0 && 'md:text-3xl'} text-white truncate`}>
          <Link to={`/Episode/${song?.objectId}`}>
            {song.Titre}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.artists ? `/Journalistes/${song?.artists[0]?.adamid}` : '/Top-journalistes'}>
            {song.Description}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
