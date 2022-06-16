import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Artist() {
  let { id } = useParams();
  const { REACT_APP_PROXY_URL, REACT_APP_API_URL } = process.env;

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await fetch(
        `${REACT_APP_PROXY_URL}/${REACT_APP_API_URL}/artist/${id}`
      );
      const data = await response.json();
      console.log({ data });
    };

    fetchArtist();
  }, []);

  return <h1>Artist {id}</h1>;
}
export default Artist;
