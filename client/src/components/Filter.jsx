import "./Filter.scss";
import { useState, useEffect } from "react";

function Filter() {
  const [data, setData] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTk3ZWFhY2EyMTM4MmMyZTZiZmMyYTRjNTI5YzA4MiIsInN1YiI6IjY2MTY5ZDIzMTA5ZGVjMDE3YjllMjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TeDs18ldQsvR612HvNB4DjZdTPJyovbjAVB8afs3-Q",
      },
    };
  }, []);

  return;
}

export default Filter;
