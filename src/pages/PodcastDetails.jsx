import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PodcastDetailsHeader, Error, Loader, RelatedSongs, SongCard } from '../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { Link } from 'react-router-dom';



import { useGetJournalistesByPodcastQuery, useGetPodcastDetailsQuery, useGetSongsByPodcastQuery } from '../redux/services/shazamCore';

const PodcastDetails = () => {
    // const dispatch = useDispatch();
    const { Podcastid, id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    // const { data, isFetching: isFetchinRelatedSongs, error } = useGetEpisodesQuery();
    const { data: podcastData, isFetching: isFetchingSongDetails } = useGetPodcastDetailsQuery({ Podcastid: Podcastid });
    const { data: journalisteData, isFetching: isFetchingJournalisteDetails } = useGetJournalistesByPodcastQuery({ PodcastId: Podcastid });
    const { data: podcastEpisodeData, isFetching: isFetchingPodcastDetails, error } = useGetSongsByPodcastQuery({ Podcastid: Podcastid });

    if (isFetchingSongDetails && isFetchingPodcastDetails && isFetchingJournalisteDetails) return <Loader Titre="Searching song details" />;

    if (error) return <Error />;

    console.log(journalisteData?.results);

    return (
        <div className="flex flex-col">
            <PodcastDetailsHeader
                artistId={artistId}
                podcastData={podcastData?.results[0]}
            />

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Détails:</h2>

                <div className="mt-5">
                    {podcastData
                        ? (
                            <p className="text-gray-400 text-sm my-1">{podcastData?.results[0]?.Description}</p>
                        )
                        : (
                            <p className="text-gray-400 text-sm my-1">Pas de Description!</p>
                        )}
                </div>
            </div>
            <div className="mb-10">
                <h3 className="text-white text-2xl font-bold">Jounalistes:</h3>

                <div className="mt-5">

                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={10}
                        freeMode
                        centeredSlides
                        centeredSlidesBounds
                        modules={[FreeMode]}
                        className="mt-4 w-full"
                    >
                        {journalisteData?.results?.map((artist) => (
                            <SwiperSlide
                                key={artist?.objectId}
                                style={{ width: '25%', height: 'auto' }}
                                className=" rounded-full animate-slideright"
                            >
                                <Link to={`/Journalistes/${artist?.IdJournaliste?.objectId}`}>
                                    <img src={artist?.IdJournaliste?.Photo?.url} alt="Name" className="rounded-full object-cover" style={{
                                        width: '100px',
                                        height: '100px'
                                    }} />
                                </Link>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>


            <div className="mb-10">
                <h3 className="text-white text-2xl font-bold">Episodes:</h3>

                <div className="flex flex-wrap sm:justify-start justify-center gap-4 mt-5">
                    {podcastEpisodeData && podcastEpisodeData.results?.map((song, i) => {
                        return (
                            <SongCard
                                key={song.id}
                                song={song}
                                isPlaying={isPlaying}
                                activeSong={activeSong}
                                data={podcastEpisodeData.results}
                                i={i}
                            />
                        )
                    })}
                </div>

            </div>



        </div>
    );
};

export default PodcastDetails;
