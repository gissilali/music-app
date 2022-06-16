import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopTrackList from "../components/Artists/TopTrackList";

function Artist() {
  let { id } = useParams();
  const { REACT_APP_PROXY_URL, REACT_APP_API_URL } = process.env;
  const [artist, setArtist] = useState();
  const fetchArtist = async () => {
    const response = await fetch(
      `${REACT_APP_PROXY_URL}/${REACT_APP_API_URL}/artist/${id}`
    );
    const data = await response.json();
    setArtist(data);
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <section className="text-gray-600 flex body-font">
      <div className="w-full md:w-8/12">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-8/12 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="md:text-6xl sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              {artist?.name}
            </h1>
            <h4 className="mb-4 md:text-lg text-base">
              <strong>{artist?.nb_fan}</strong> fans
            </h4>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Provident ad odio porro aliquam, voluptatibus tenetur. Molestias
              ducimus debitis obcaecati inventore tempora nobis nemo.
            </p>
          </div>
          <div className=" md:w-4/12 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={artist?.picture_big}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-4/12">
        {artist ? <TopTrackList artist={artist} /> : null}
      </div>
    </section>
  );
}
export default Artist;
