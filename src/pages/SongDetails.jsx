import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetEpisodesQuery, useGetEpisodeDetailsQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { Episodeid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching: isFetchinRelatedSongs, error } = useGetEpisodesQuery();
  const { data: songData, isFetching: isFetchingSongDetails } = useGetEpisodeDetailsQuery({ Episodeid: Episodeid });

  if (isFetchingSongDetails && isFetchinRelatedSongs) return <Loader Titre="Searching song details" />;


  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={null}
        songData={songData?.results[0]}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Description:</h2>

        <div className="mt-5">
          {songData
            ? (
              <p className="text-gray-400 text-base my-1">{songData?.results[0].Description}</p>
            )
            : (
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
            )}
        </div>
      </div>

      <RelatedSongs
        data={data.results}
        artistId={Episodeid}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

    </div>
  );
};

export default SongDetails;
