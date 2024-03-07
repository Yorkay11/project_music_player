import React, { useEffect, useRef } from 'react';
import { FaFacebook, FaFacebookSquare, FaLinkedin, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ArtistCard = ({ track }) => {

  return (
    <Link className="relative flex flex-col w-[100%] md:w-[31%] bg-opacity-80 animate-slideup rounded-lg cursor-pointer overflow-hidden" style={{
      backgroundImage: `url(${track?.Photo?.url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
    to={`/Journalistes/${track?.objectId}`}
    >
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        height: '100%',
        width: '100%',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      />
      <div className="relative w-full h-52 group">
          <img alt="song_img" src={track?.Photo?.url} className="w-full h-full rounded-t-lg" />
      </div>

      <div className='relative flex flex-row justify-between items-end h-full p-4 lg:py-4'>
        <div className='items-start'>
          <p className="font-semibold text-2xl text-white truncate">
            {track?.Nom}
          </p>
          <p className="mt-4 font-thin text-sm text-white truncate">
            Journaliste ✅
          </p>
        </div>

        {/* <Link className='cursor-pointer flex flex-row items-center hover:border px-6 py-2 mt-4 bg-orange-500 font-thin text-sm text-white truncate rounded-3xl transition duration-300 ease-in-out hover:bg-orange-600 active:bg-orange-700 focus:outline-none' to={`/Journalistes/${track?.objectId}`}>
          <FaEye color='#fff' className='mr-2'/> Voir
        </Link> */}
      </div>

      {/* <div className='flex flex-row justify-between items-center h-full lg:py-2'>
    <Link className='bg-white/100 bg-opacity-60 backdrop-blur-sm p-2 rounded-full border mr-2'>
      <FaTwitter color='#36AFFF'/>
    </Link>
    <Link className='bg-white/100 bg-opacity-60 backdrop-blur-sm p-2 rounded-full border mr-2'>
      <FaFacebookSquare color='#4F09F1'/>
    </Link>
    <Link className='bg-white/100 bg-opacity-60 backdrop-blur-sm p-2 rounded-full border'>
      <FaLinkedin color='#4F09F1'/>
    </Link>
  </div> */}
    </Link>

  );
};

export default ArtistCard;
