import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser }) => {
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
        } else {
          alert("Failed to add to favorites");
        }
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <Card className="p-4 h-100 shadow-sm">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
          </Link>

          {!isFavorite && user && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={addToFavorites}
            >
              + Favorite
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string
  }).isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func
};