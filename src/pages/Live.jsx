import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, LiveCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetLiveQuery } from '../redux/services/shazamCore'






const Live = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetLiveQuery();
    
  
    if (isFetching) return <Loader Titre="Chargement..." />;
  
    if (error) return <Error />;
  
    // const genreTitre = genres.find(({ value }) => value === genreListId)?.Titre;
  
    return (
      <div className="flex flex-col">
  
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
           
          {data && data.results?.map((song, i) => {
            return  (
              <LiveCard
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


        <div className="flex flex-wrap sm:justify-start justify-center gap-4 mt-12">
            <h3 className="text-white text-xl font-bold">Programme de la semaine:</h3>
            <img src={data.results[0]?.Programme?.url} alt="logo" className="w-full h-full object-stretch rounded-lg justify-center" />
        </div>
      </div>
    );
}

export default Live