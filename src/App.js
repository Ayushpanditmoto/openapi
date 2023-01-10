import React, { useEffect, useState } from "react";
import styled from "styled-components";
import spinner from "./spinner";

function App() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const image = localStorage.getItem("image");
    if (image) {
      setImage(image);
    }
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://sparkling-skirt-frog.cyclic.app/openai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: search,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      localStorage.setItem("image", data.image);
      setImage(data.image);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  return (
    <Appcontain>
      <div className="title">
        <h2>Open AI Image</h2>
      </div>
      <div className="inputwrap">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Enter you data"
        />
      </div>
      <div className="btnwrap">
        <button onClick={handleClick}>Submit</button>
      </div>
      {loading && spinner()}

      {image && (
        <div className="imagewrap">
          <img src={image} alt="images" />
        </div>
      )}
    </Appcontain>
  );
}

export default App;

const Appcontain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .inputwrap {
    margin-top: 20px;
    background-color: #fcfcfc;
    border-radius: 5px;
    width: 300px;
    max-width: 400px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .imagewrap {
    margin-top: 20px;
    background-color: #fcfcfc;
    width: 550px;
    margin: 1rem;
  }
  @media screen and (max-width: 600px) {
    .imagewrap {
      width: 400px;
    }
  }
`;
