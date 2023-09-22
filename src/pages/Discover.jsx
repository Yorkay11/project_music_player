import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetEpisodesQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  // const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetEpisodesQuery();
  const [shuffleDatas, setShuffleDatas] = useState([])

  

  if (isFetching) return <Loader Titre="Chargement des épisodes..." />;

  if (error) return <Error />;

  // const genreTitre = genres.find(({ value }) => value === genreListId)?.Titre;

    useEffect(() => {
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
  
      data.results && setShuffleDatas(shuffleArray([...data?.results]))
    }, [data])
  

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        {/* <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitre}</h2> */}

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {/* {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.Titre}</option>)} */}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
         
        {shuffleDatas && shuffleDatas?.map((song, i) => {
          return  (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data.results}
              i={i}
            />
          )
        })}
      </div>
    </div>
  );
};

export default Discover;
