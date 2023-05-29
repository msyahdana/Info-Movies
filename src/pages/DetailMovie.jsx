import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavigationBar from "../components/Navbar/NavigationBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StarFill } from "react-bootstrap-icons";
import "../styles/detailmovie.css";
import ScrollContainer from "react-scroll-horizontal";

function DetailMovie() {
  const [detailMovie, setDetailMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=3372fc4e380b3c807cedb51e891bbc9d&language=id-ID`);
        setDetailMovie(response.data);
      } catch (error) {
        alert(error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=3372fc4e380b3c807cedb51e891bbc9d&language=en-US`);
        const videoResults = response.data.results;
        if (videoResults.length > 0) {
          const lastVideo = videoResults.pop();
          setVideos([lastVideo]);
          console.log(lastVideo);
        }
      } catch (error) {
        alert(error);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=3372fc4e380b3c807cedb51e891bbc9d`);
        const castData = response.data.cast;
        setCast(castData);
      } catch (error) {
        alert(error);
      }
    };

    fetchDetailMovie();
    fetchVideos();
    fetchCast();
  }, [params]);

  return (
    <>
      <NavigationBar />
      <Container className="mb-5">
        <Row>
          <Col xl={5} xs={12} className="d-flex justify-content-center mt-4">
            <Card
              style={{
                width: "30rem",
                outlineColor: "#4e3e50",
                outlineStyle: "outset",
                outlineWidth: "thin",
                background: "#4e3e50",
              }}
            >
              <Card.Img src={`https://image.tmdb.org/t/p/original${detailMovie.poster_path}`} alt={`${detailMovie.title}`} />
            </Card>
          </Col>
          <Col xl={7} xs={12} className="mt-4">
            <Card
              style={{
                padding: "10px",
                background: "#4e3e50",
                outlineColor: "#4e3e50",
                outlineStyle: "outset",
                outlineWidth: "thin",
              }}
              className="mb-2"
            >
              <h1>{detailMovie?.title}</h1>
            </Card>
            <Card
              style={{
                padding: "10px",
                background: "#4e3e50",
                outlineColor: "#4e3e50",
                outlineStyle: "outset",
                outlineWidth: "thin",
              }}
            >
              <p>
                {detailMovie?.genres &&
                  detailMovie?.genres?.length > 0 &&
                  detailMovie?.genres?.map((genre, i) => {
                    return i === detailMovie?.genres.length - 1 ? genre.name : `${genre.name}, `;
                  })}
              </p>
              <p className="justify">{detailMovie?.overview}</p>
              <p>
                <b>Popularitas</b> {detailMovie?.popularity} orang
              </p>
              <p>
                <b>Tanggal Rilis:</b> {detailMovie?.release_date ? detailMovie.release_date : "-"}
              </p>
              <p>
                <b>Durasi:</b> {detailMovie?.runtime} menit
              </p>
              <p className="fs-5">
                <StarFill className="mb-1 mx-1 text-warning" />
                {detailMovie?.vote_average ? detailMovie.vote_average.toFixed(1) : "-"}
              </p>
            </Card>
          </Col>
          <Col style={{ height: "20rem" }}>
            <ScrollContainer className="mt-4" style={{ overflowX: "auto", overflowY: "hidden" }}>
              <div style={{ display: "flex" }}>
                {cast.map((actor) => (
                  <Card
                    key={actor.id}
                    style={{
                      width: "12rem",
                      height: "20rem",
                      margin: "2rem",
                      background: "#4e3e50",
                    }}
                    className="text-center"
                  >
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} style={{ height: "12rem", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title>{actor.name}</Card.Title>
                      <Card.Text>{actor.character}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </ScrollContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            {videos.map((video, i) => (
              <iframe
                key={i}
                width="100%"
                height="60%"
                src={`https://www.youtube.com/embed/${video.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.name}
                className="my-3"
                style={{ maxWidth: "100%" }}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailMovie;
