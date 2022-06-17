import { useState, useEffect } from "react";
import TrackCard from "../components/TrackCard";
import useDebounce from "../hooks/useDebounce";
import GridEmptyState from "../components/GridEmptyState";
import LoadingState from "../components/LoadingState";
import { useQuery } from "react-query";

function Home() {
  const [query, setQuery] = useState("");
  const { REACT_APP_PROXY_URL, REACT_APP_API_URL } = process.env;

  const debouncedSearchTerm = useDebounce(query, 300);
  const searchTracks = () => {
    return fetch(
      `${REACT_APP_PROXY_URL}/${REACT_APP_API_URL}/search/track/?q=${debouncedSearchTerm}`
    ).then((response) => response.json());
  };
  const { isLoading, isError, data, error } = useQuery(
    ["search-tracks", debouncedSearchTerm],
    searchTracks
  );

  return (
    <div className="w-full">
      <header className="flex justify-center bg-gray-200 border-b border-gray-300  py-4">
        <div className="flex space-x-8 w-full md:w-8/12 lg:w-6/12 items-center">
          <div className="h-8 text-white bg-gray-700 w-16 flex justify-center items-center font-bold">
            LOGO
          </div>
          <div className="flex items-center border-l-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={query}
              type="text"
              placeholder="Type here to search...."
              className="outline-none py-4 px-4 bg-transparent"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="flex justify-center">
        <div className="w-full md:w-8/12 lg:w-6/12">
          {debouncedSearchTerm ? (
            <h3 className="text-left py-4 px-4">
              Search results for : <span className="font-bold">"{query}"</span>
            </h3>
          ) : null}
          <div className="flex flex-wrap">
            {isLoading ? (
              <LoadingState />
            ) : data && debouncedSearchTerm.length > 0 ? (
              data?.data?.map((track) => (
                <TrackCard track={track} key={track.id} />
              ))
            ) : (
              <GridEmptyState
                message={
                  debouncedSearchTerm
                    ? `no results for ${debouncedSearchTerm}`
                    : "type in the search field to search..."
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
