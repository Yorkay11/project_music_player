/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';


const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

  return(
    <div className={`w-full flex flex-row items-center hover:bg-[#293FAC] ${activeSong?.Titre === song?.Titre ? 'bg-[#293FAC]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-sm text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.IdPodcast?.Photo?.url}
          alt={song?.Titre}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {artistId ? (
            <Link to={`/Episode/${song?.objectId}`}>
              <p className="text-lg font-semibold text-white">
                {song?.Titre}
              </p>
            </Link>
          ) : (
            <p className="text-lg font-semibold text-white">
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-sm text-gray-300 mt-1">
            {artistId ? song?.attributes?.albumName : song?.subTitre}
          </p>
        </div>
      </div>
      {artistId
        ? (
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, i)}
          />
        )
        : null}
    </div>
  );
}

export default SongBar;
