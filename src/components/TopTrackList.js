import { useEffect, useState } from "react";
import TopTrackListItem from "./TopTrackListItem";

function TopTrackList({ artist }) {
  const [topTracks, setTopTracks] = useState();
  const { REACT_APP_PROXY_URL, REACT_APP_API_URL } = process.env;
  const fetchTopTracks = async () => {
    const response = await fetch(
      `${REACT_APP_PROXY_URL}/${REACT_APP_API_URL}/artist/${artist.id}/top?limit=5`
    );
    const tracksData = await response.json();
    console.log({
      tracksData,
    });
    setTopTracks(tracksData);
  };
  useEffect(() => {
    fetchTopTracks();
  }, []);
  return (
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="w-full">
        <h3 className="font-bold text-2xl">Top Tracks</h3>
        {}
        <ul className="w-full divide-y-2 divide-gray-100">
          {topTracks?.data.map((track, index) => {
            return (
              <TopTrackListItem
                track={track}
                key={track.id}
                trackNumber={index + 1}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default TopTrackList;
