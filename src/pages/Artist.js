import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Artist() {
  let { id } = useParams();

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}`
      );
      const data = await response.json();
      console.log({ data });
    };

    fetchArtist();
  }, []);

  return <h1>Artist {id}</h1>;
}
export default Artist;
