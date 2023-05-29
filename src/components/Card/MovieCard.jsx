import React from "react";
import "./card.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";

function MovieCard({ title, poster, to, rating }) {
  return (
    <Card
      variant="outline-danger"
      as={Link}
      to={to}
      style={{
        width: "18rem",
        margin: "10px",
        background: "#4e3e50",
        outlineColor: "#4e3e50",
        outlineStyle: "outset",
        outlineWidth: "thin",
        textDecoration: "none",
      }}
      className="card-hover mb-5"
    >
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster}`} />
      <Card.Body style={{ color: "black" }}>
        <Card.Title style={{ color: "white" }}>
          <h4 className="text-center">{title}</h4>
          <p className="text-center mt-3">
            <StarFill className="mb-1 mx-1 text-warning" />
            {rating}
          </p>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
