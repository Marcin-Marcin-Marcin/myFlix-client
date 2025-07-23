import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div className="text-center mt-5">Movie not found.</div>;
  }

  return (
    <Card className="p-4 mt-3 shadow-sm">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
        <Link to="/">
          <Button variant="link">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};