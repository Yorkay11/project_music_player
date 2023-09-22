import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RealisationJournaliste } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';

import { useGetJournalistesDetailsQuery, useGetPodcastByJournalistQuery, useGetEpisodesForPodcastsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetJournalistesDetailsQuery({ artistId: artistId });
  const { data: podcastDatas, isFetching: isFetchingPodcastDatas, error: podcastError } = useGetPodcastByJournalistQuery({ journalistId: artistId });

  const [shuffleDatas, setShuffleDatas] = useState(null)
  const podcastIds = podcastDatas?.results?.map(podcast => podcast?.IdPodcast?.objectId) || [];


  const { data: episodesDatas, isFetching: isLoadingEpisodes, error: isErrorEpisodes } = useGetEpisodesForPodcastsQuery({ podcastIds: podcastIds });



  if (isFetchingArtistDetails || isFetchingPodcastDatas) return <Loader Titre="Loading artist details..." />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, episodesDatas, i }));
    dispatch(playPause(true));
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.results[0]}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Description:</h2>

        <div className="mt-5">
          {artistData
            ? (
              <p className="text-gray-400 text-base my-1">{artistData?.results[0]?.Description}</p>
            )
            : (
              <p className="text-gray-400 text-base my-1">Navré, pas d'épisode trouvé</p>
            )}
        </div>
      </div>

      {episodesDatas && <RealisationJournaliste
        data={episodesDatas?.results}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />}
    </div>
  );
};

export default ArtistDetails;
