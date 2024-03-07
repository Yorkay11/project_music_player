import React from 'react';
import { Link } from 'react-router-dom';

const PodcastDetailsHeader = ({ artistId, artistData, podcastData }) => {

  return(
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
  
      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={ podcastData?.Photo?.url
            // artistId ? artistData?.url
            //   .replace('{w}', '500')
            //   .replace('{h}', '500')
  }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
  
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData?.attributes?.name : podcastData?.Titre}
          </p>
          {/* {!artistId && (
            <Link to={`/Journalistes/${songData?.artists[0]?.adamid}`}>
              <p className="text-sm text-gray-400 mt-2">{songData?.Description}</p>
            </Link>
          )} */}
  
          <p className="text-sm text-gray-400 mt-2">
            {artistId
              ? artistData?.attributes?.genreNames[0]
              : podcastData?.genres?.primary}
          </p>
        </div>
      </div>
  
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
}

export default PodcastDetailsHeader;
