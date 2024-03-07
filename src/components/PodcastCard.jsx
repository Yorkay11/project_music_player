import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { FaPlay } from 'react-icons/fa';

const PodcastCard = ({ podcast, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  //   const handlePauseClick = () => {
  //     dispatch(playPause(false));
  //   };

  //   const handlePlayClick = () => {
  //     dispatch(setActiveSong({ song, data, i }));
  //     dispatch(playPause(true));
  //   };

  // console.log(podcast);

  return (
    <div className="flex flex-col w-[100%] md:w-[45%] xl:w-[47%] p-2 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg transition-all duration-300 cursor-pointer filter grayscale-0  hover:bg-black"
    >
      <div className="relative w-full h-60 group shadow-xl ">
        {/* <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.Titre === song.Titre ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div> */}

        <img alt="song_img" src={podcast?.Photo?.url} className="w-full h-full rounded-lg object-cover" />
      </div>

      <div className="mt-4 flex flex-row justify-between px-4">
        <div className="flex flex-col">
          <p className="font-semibold text-lg text-white">
            {podcast?.Titre}
          </p>
          <p className="text-sm truncate text-gray-300 md:text-thin mt-1 max-w-1">
            {podcast?.Description.slice(0, 15)}...
          </p>
        </div>


        <Link
          className='rounded-lg active:bg-orange-600'
          to={`/Podcast/${podcast.objectId}`}
        >
          <button type="button" class="bg-gradient-to-r from-yellow-500 to-slate-500 hover:from-pink-500 hover:to-yellow-500 p-4 rounded-lg">
            <FaPlay color='#fff' />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PodcastCard;
