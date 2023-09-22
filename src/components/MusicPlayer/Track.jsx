import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4 items-center justify-center`}>
      <img src={activeSong.IdPodcast?.Photo?.url ? activeSong.IdPodcast?.Photo?.url : activeSong?.Photo?.url } alt="cover art" className="rounded-full flex-1 flex h-16 w-16 " />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.Titre ? activeSong?.Titre : 'Aucun Episode en cours'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.Description ? activeSong?.Description : ''}
      </p>
    </div>
  </div>
);

export default Track;
