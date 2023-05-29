import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import MovieCard from "../components/Card/MovieCard";
import NavigationBar from "../components/Navbar/NavigationBar";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const [searchedMovieList, setSearchedMovieList] = useState({});
  const [resultName, setResultName] = useState("");

  useEffect(() => {
    async function searchMovie() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3372fc4e380b3c807cedb51e891bbc9d&query=${query}`);
        // console.log(JSON.stringify(response.data.results));
        setSearchedMovieList(response.data.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error);
          return;
        }
        alert(error);
      }
    }
    setResultName(query);
    searchMovie();
  }, [query]);

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <h1 className="text-danger p-4">Result Found: {resultName}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-wrap justify-content-center">
            {searchedMovieList?.length > 0 &&
              searchedMovieList.map((movie, i) => <MovieCard key={i} title={movie?.title} poster={movie?.poster_path} rating={movie?.vote_average ? movie?.vote_average.toFixed(1) : "-"} to={`/detail/${movie?.id}`} />)}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Search;
