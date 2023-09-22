import React from 'react';

import { ArtistCard, Error, Loader } from '../components';
import { useGetJournalistesQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetJournalistesQuery();

  if (isFetching) return <Loader Titre="Chargement des journalistes..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top journalistes</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.results?.map((track) => <ArtistCard key={track.id} track={track} />)}
      </div>
    </div>
  );
};

export default TopArtists;
