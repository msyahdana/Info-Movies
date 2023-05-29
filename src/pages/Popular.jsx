import React, { useEffect, useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import axios from "axios";
import MovieCard from "../components/Card/MovieCard";
import NavigationBar from "../components/Navbar/NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";

function Popular() {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function getMovieList() {
      try {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get("page");
        const pageNumber = page ? parseInt(page) : 1;
        setCurrentPage(pageNumber);

        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3372fc4e380b3c807cedb51e891bbc9d&page=${pageNumber}`);
        setPopularMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error);
          return;
        }
        alert(error);
      }
    }
    getMovieList();
  }, [location.search]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    navigate(`?page=${nextPage}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`?page=${prevPage}`);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <h1 style={{ color: "red" }} className="text-center">
              Popular Movie
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-wrap justify-content-center">
            {popularMovieList?.map((movie, i) => (
              <MovieCard key={i} title={movie?.title} poster={movie?.poster_path} rating={movie?.vote_average ? movie?.vote_average.toFixed(1) : "-"} to={`/detail/${movie?.id}`} />
            ))}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Popular;
