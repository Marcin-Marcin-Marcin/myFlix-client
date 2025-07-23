import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div className="text-center mt-5">Movie not found.</div>;
  }

  const isFavorite = user?.FavoriteMovies?.includes(movie.id);

  const addToFavorites = () => {
    fetch(
      `https://mymyflixapp-46a281636c8c.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((res) => {
        if (res.ok) {
          const updatedUser = {
            ...user,
            FavoriteMovies: [...user.FavoriteMovies, movie.id]
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          alert("Added to favorites!");
        } else {
          alert("Failed to add to favorites");
        }
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <Card className="p-4 mt-3 shadow-sm">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>

        {!isFavorite && (
          <Button variant="outline-primary" className="me-2" onClick={addToFavorites}>
            Add to Favorites
          </Button>
        )}

        <Link to="/">
          <Button variant="link">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};