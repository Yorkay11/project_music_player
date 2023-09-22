import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <Link
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      to={`/Journalistes/${track?.objectId}`}
    >
      <img alt="song_img" src={track?.Photo?.url} className="w-56 h-56 rounded-lg object-cover" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.Nom}
      </p>
    </Link>
  );
};

export default ArtistCard;
