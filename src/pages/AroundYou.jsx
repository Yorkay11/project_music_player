import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, PodcastCard } from '../components';
import { useGetPodcastsQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetPodcastsQuery();
  // const { data, isFetching, error } = useGetSongsByCountryQuery(country);


  if (isFetching && loading) return <Loader Titre="Chargement des Podcasts..." />;

  if (error && country !== '') return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Podcasts</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data && data.results?.map((podcast, i) => (
          <PodcastCard
            key={podcast.id}
            podcast={podcast}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
