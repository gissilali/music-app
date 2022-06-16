import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function Home() {
  const [tracks, setTracks] = useState();
  const [query, setQuery] = useState("Nyongwa");
  const { REACT_APP_PROXY_URL, REACT_APP_API_URL } = process.env;

  const debouncedSearchTerm = useDebounce(query, 500);

  useEffect(() => {
    console.log("Hello");
    fetchData();
  }, [query]);

  const fetchData = async () => {
    const response = await fetch(
      `${REACT_APP_PROXY_URL}/${REACT_APP_API_URL}/search/track/?q=${debouncedSearchTerm}`
    );

    const { data } = await response.json();
    console.log({ data });
    setTracks(data);
  };

  const handleSearch = (value) => {
    setQuery(value);
  };

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
              className="outline-none py-4 px-4 bg-transparent"
              onChange={(e) => {
                handleSearch(e?.target?.value);
              }}
            />
          </div>
        </div>
      </header>

      <div className="flex justify-center">
        <div className="w-full md:w-8/12 lg:w-6/12">
          <h3 className="text-left py-4 px-4">
            Search results for : <span className="font-bold">"{query}"</span>
          </h3>
          <div className="flex flex-wrap">
            {tracks?.map((track) => {
              return (
                <div key={track.id} className="p-4 md:w-1/3">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src={track?.album?.cover_medium}
                      alt="blog"
                    />
                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {track?.title}
                      </h1>
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        <Link to={`/artist/${track?.artist?.id}`}>
                          {track?.artist?.name}
                        </Link>
                      </h2>
                      <p className="leading-relaxed mb-3">
                        {track?.album?.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
