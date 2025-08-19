import { useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedProfilePic = localStorage.getItem("profilePic");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [profilePic, setProfilePic] = useState(storedProfilePic || "");

  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday?.slice(0, 10) || "");

  if (!user) {
    return <p className="text-center mt-4">Please log in to view your profile.</p>;
  }

  const favMovies = movies.filter((movie) =>
    user.FavoriteMovies?.includes(movie.id)
  );

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profilePic", reader.result);
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      Username: username,
      ...(password && { Password: password }),
      Email: email,
      Birthday: birthday
    };

    fetch(`https://mymyflixapp-46a281636c8c.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedUser) => {
          alert("Profile updated successfully");
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        });
      } else {
        alert("Failed to update profile");
      }
    });
  };

  const handleDeregister = () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    fetch(`https://mymyflixapp-46a281636c8c.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.ok) {
        localStorage.clear();
        window.location.reload(); // or navigate to /login
      } else {
        alert("Failed to delete account");
      }
    });
  };

  const removeFromFavorites = (movieId) => {
    fetch(
      `https://mymyflixapp-46a281636c8c.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then((res) => {
      if (res.ok) {
        const updatedFavorites = user.FavoriteMovies.filter((id) => id !== movieId);
        const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        alert("Failed to remove favorite");
      }
    });
  };

  return (
    <div className="profile-container">
      <Card className="p-4 mb-4">
        <h2 className="mb-3 text-center">Your Profile</h2>

        <div className="text-center mb-4">
          <Image
            src={profilePic || "https://via.placeholder.com/150?text=Profile"}
            roundedCircle
            width="120"
            height="120"
            className="mb-2 border"
          />
          <Form.Group controlId="formProfilePic">
            <Form.Control type="file" accept="image/*" onChange={handlePicUpload} />
          </Form.Group>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={4}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password (leave blank to keep current)</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">Save Changes</Button>
            <Button variant="danger" onClick={handleDeregister}>Delete Account</Button>
          </div>
        </Form>
      </Card>

      <div className="favorite-movies-section">
        <h4 className="mb-3 text-center">Favorite Movies</h4>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favMovies.length > 0 ? (
            favMovies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
                <div className="text-center mt-2">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromFavorites(movie.id)}
                  >
                    Remove from Favorites
                  </Button>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center w-100">You have no favorite movies yet.</p>
          )}
        </Row>
      </div>
    </div>
  );
};