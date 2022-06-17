import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopTrackList from "../components/TopTrackList";
import { useQuery } from "react-query";
import LoadingState from "../components/LoadingState";
function Artist() {
  let { id } = useParams();
  const { REACT_APP_PROXY_URL, REACT_APP_API_URL } = process.env;
  const fetchArtist = async () =>
    fetch(`${REACT_APP_PROXY_URL}/${REACT_APP_API_URL}/artist/${id}`).then(
      (response) => response.json()
    );

  const {
    isLoading,
    isError,
    data: artist,
    error,
  } = useQuery(["fetch-artist"], fetchArtist);

  if (isLoading) return <LoadingState />;

  return (
    <>
      <section className="text-gray-600 border-b border-r border-gray-300  md:flex body-font">
        <div className="w-full bg-gray-200 md:px-4 md:w-8/12">
          <div className="container mx-auto md:flex md:px-5 md:py-24 md:flex-row-reverse flex-col-reverse items-center">
            <div className=" md:w-4/12 w-full mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={artist?.picture_big}
              />
            </div>
            <div className="lg:flex-grow md:w-8/12 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="md:text-6xl sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
                {artist?.name}
              </h1>
              <h4 className="mb-4 md:text-lg text-base">
                <strong>{artist?.nb_fan}</strong> fans
              </h4>
            </div>
          </div>
        </div>
        <div className="w-full bg-white md:w-4/12 px-4">
          <div className="container mx-auto flex md:px-5 py-8 px-4 md:py-24 md:flex-row flex-col items-center">
            {artist ? <TopTrackList artist={artist} /> : null}
          </div>
        </div>
      </section>
    </>
  );
}
export default Artist;
