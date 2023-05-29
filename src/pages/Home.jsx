import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NavigationBar from "../components/Navbar/NavigationBar";
import "../styles/app.css";
import { Carousel } from "react-bootstrap";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    async function getMovieList() {
      try {
        const popularConfig = {
          method: "get",
          url: `https://api.themoviedb.org/3/movie/popular?api_key=3372fc4e380b3c807cedb51e891bbc9d&page=1`,
        };

        const topRatedConfig = {
          method: "get",
          url: `https://api.themoviedb.org/3/movie/top_rated?api_key=3372fc4e380b3c807cedb51e891bbc9d&page=1`,
        };

        const nowPlayingConfig = {
          method: "get",
          url: `https://api.themoviedb.org/3/movie/now_playing?api_key=3372fc4e380b3c807cedb51e891bbc9d&page=1`,
        };

        const upComingConfig = {
          method: "get",
          url: `https://api.themoviedb.org/3/movie/upcoming?api_key=3372fc4e380b3c807cedb51e891bbc9d&page=1`,
        };

        const [popularResponse, topRatedResponse, nowPlayingResponse, upComingResponse] = await Promise.all([axios.request(popularConfig), axios.request(topRatedConfig), axios.request(nowPlayingConfig), axios.request(upComingConfig)]);

        const popularData = popularResponse.data.results.slice(0, 3);
        const topRatedData = topRatedResponse.data.results.slice(0, 3);
        const nowPlayingData = nowPlayingResponse.data.results.slice(0, 3);
        const upcomingData = upComingResponse.data.results.slice(0, 3);

        setPopularMovies(popularData);
        setTopRatedMovies(topRatedData);
        setNowPlayingMovies(nowPlayingData);
        setUpcomingMovies(upcomingData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.message);
        } else {
          alert(error.toString());
        }
      }
    }

    getMovieList();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <h2 className="text-center pt-5">Popular Movies</h2>
            <Carousel>
              {popularMovies.map((movie) => (
                <Carousel.Item key={movie.id}>
                  <div className="d-flex justify-content-center align-items-center" style={{ maxHeight: "500px" }}>
                    <img className="w-100" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                  </div>
                  <Carousel.Caption>
                    <h1 className="fw-bold py-2">{movie.title}</h1>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center pt-5">Top Rated Movies</h2>
            <Carousel>
              {topRatedMovies.map((movie) => (
                <Carousel.Item key={movie.id}>
                  <div className="d-flex justify-content-center align-items-center" style={{ maxHeight: "500px" }}>
                    <img className="w-100" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                  </div>
                  <Carousel.Caption>
                    <h1 className="fw-bold py-2">{movie.title}</h1>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center pt-5">Now Playing Movies</h2>
            <Carousel>
              {nowPlayingMovies.map((movie) => (
                <Carousel.Item key={movie.id}>
                  <div className="d-flex justify-content-center align-items-center" style={{ maxHeight: "500px" }}>
                    <img className="w-100" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                  </div>
                  <Carousel.Caption>
                    <h1 className="fw-bold py-2">{movie.title}</h1>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row className="pb-5">
          <Col>
            <h2 className="text-center pt-5">Upcoming Movies</h2>
            <Carousel>
              {upcomingMovies.map((movie) => (
                <Carousel.Item key={movie.id}>
                  <div className="d-flex justify-content-center align-items-center" style={{ maxHeight: "500px" }}>
                    <img className="w-100" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                  </div>
                  <Carousel.Caption>
                    <h1 className="fw-bold py-2">{movie.title}</h1>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
