import { useQuery } from "react-query";
import LoadingState from "./LoadingState";
import TopTrackListItem from "./TopTrackListItem";

function TopTrackList({ artist }) {
  const { REACT_APP_PROXY_URL, REACT_APP_API_URL } = process.env;
  console.log({ artist });
  const fetchTopTracks = () =>
    fetch(
      `${REACT_APP_PROXY_URL}/${REACT_APP_API_URL}/artist/${artist.id}/top?limit=5`
    ).then((response) => response.json());

  const {
    isLoading,
    isError,
    data: topTracks,
    error,
  } = useQuery(["fetch-top-tracks"], fetchTopTracks);
  console.log({ topTracks });
  return (
    <div className="w-full">
      <h3 className="font-bold text-2xl">Top Tracks</h3>
      {}
      <ul className="w-full divide-y-2 divide-gray-100">
        {isLoading ? (
          <LoadingState />
        ) : (
          topTracks?.data.map((track, index) => {
            return (
              <TopTrackListItem
                track={track}
                key={track.id}
                trackNumber={index + 1}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}
export default TopTrackList;
