// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const shazamCoreApi = createApi({
//   reducerPath: 'shazamCoreApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://shazam-core.p.rapidapi.com/',
//     prepareHeaders: (headers) => {
//       headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);

//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
//     getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
//     getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
//     getSongsBySearch: builder.query({ query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
//     getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
//     getSongDetails: builder.query({ query: ({ songid }) => `v1/tracks/details?track_id=${songid}` }),
//     getSongRelated: builder.query({ query: ({ songid }) => `v1/tracks/related?track_id=${songid}` }),
//   }),
// });

// export const {
//   useGetTopChartsQuery,
//   useGetSongsByGenreQuery,
//   useGetSongsByCountryQuery,
//   useGetSongsBySearchQuery,
//   useGetArtistDetailsQuery,
//   useGetSongDetailsQuery,
//   useGetSongRelatedQuery,
// } = shazamCoreApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const back4AppApi = createApi({
  reducerPath: 'back4AppApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://parseapi.back4app.com/', // URL de base de Back4App
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      headers.set('X-Parse-Application-Id', 'NktTsCk2AQGbuW1Zcg3WLIRHDFBs8ZVrpodn1O5e'); // Remplacez par votre ID d'application
      headers.set('X-Parse-Master-Key', '7H47hFM4er9xZQ2EzOoBbGjTYGi159hW0V4uKAGM'); // Remplacez par votre clé maître
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEpisodes: builder.query({
      query: () => 'classes/Episode?include=IdPodcast',
    }),
    getEpisodeDetails: builder.query({ 
      query: ({ Episodeid }) => `classes/Episode?include=IdPodcast&where={"objectId":"${Episodeid}"}`,
    }),
    getPodcastDetails: builder.query({ 
      query: ({ Podcastid }) => `classes/Podcast?where={"objectId":"${Podcastid}"}`,
    }),
    getJournalistes: builder.query({
      query: () => 'classes/Journaliste'
    }),
    getJournalistesByPodcast: builder.query({
      query: ({ PodcastId }) => `classes/GestionPodcast?where={"IdPodcast":{"__type":"Pointer","className":"Podcast","objectId":"${PodcastId}"}}&include=IdJournaliste`
    }),
    getJournalistesDetails: builder.query({
      query: ({ artistId }) => `classes/Journaliste?where={"objectId":"${artistId}"}`,
    }),
    getLive: builder.query({
      query: () => 'classes/Live'
    }),
    getPodcasts: builder.query({
      query: () => 'classes/Podcast'
    }),
    getSongsByPodcast: builder.query({
      query: ({ Podcastid }) => `classes/Episode?where={"IdPodcast":{"__type":"Pointer","className":"Podcast","objectId":"${Podcastid}"}}&include=IdPodcast`,
    }),
    getPodcastByJournalist: builder.query({
      query: ({ journalistId }) => `classes/GestionPodcast?where={"IdJournaliste":{"__type":"Pointer","className":"Journaliste","objectId":"${journalistId}"}}`,
    }),
    getEpisodesForPodcasts: builder.query({
      query: ({ podcastIds }) => {
        const whereClauses = podcastIds.map((podcastId) => ({
          IdPodcast: {
            __type: 'Pointer',
            className: 'Podcast',
            objectId: podcastId,
          },
        }));
      
        const whereQuery = JSON.stringify({ $or: whereClauses });
      
        return `classes/Episode?where=${whereQuery}&include=IdPodcast`;
      }
      
    }),
  }),
});

export const {
  useGetEpisodesQuery,
  useGetJournalistesQuery,
  useGetJournalistesByPodcastQuery,
  useGetPodcastsQuery,
  useGetSongsByPodcastQuery,
  useGetEpisodeDetailsQuery, 
  useGetPodcastDetailsQuery,
  useGetJournalistesDetailsQuery,
  useGetLiveQuery, 
  useGetPodcastByJournalistQuery,
  useGetEpisodesForPodcastsQuery,
} = back4AppApi;


