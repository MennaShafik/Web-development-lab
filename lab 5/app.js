const {
  useState
} = React;
const MAX_STARS = 5;

// Clickable stars: filled up to the current rating, empty after it
function StarPicker({
  rating,
  onRate
}) {
  const stars = [];
  for (let i = 1; i <= MAX_STARS; i++) {
    stars.push(/*#__PURE__*/React.createElement("button", {
      key: i,
      className: "star-button",
      onClick: () => onRate(i),
      "aria-label": "Rate " + i + " out of " + MAX_STARS
    }, i <= rating ? "⭐" : "☆"));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "star-row"
  }, stars);
}

// Shows how many stars were given using emojis
function RatingSummary({
  rating
}) {
  if (rating === 0) {
    return /*#__PURE__*/React.createElement("p", {
      className: "summary"
    }, "Not rated yet");
  }
  return /*#__PURE__*/React.createElement("p", {
    className: "summary"
  }, "⭐".repeat(rating), " (", rating, "/", MAX_STARS, ")");
}
function MovieCard({
  movie,
  onRemove,
  onRate,
  onReview
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "movie-title"
  }, movie.title), /*#__PURE__*/React.createElement("button", {
    className: "remove-button",
    onClick: () => onRemove(movie.id)
  }, "Remove")), /*#__PURE__*/React.createElement(StarPicker, {
    rating: movie.rating,
    onRate: r => onRate(movie.id, r)
  }), /*#__PURE__*/React.createElement(RatingSummary, {
    rating: movie.rating
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "review",
    rows: 3,
    placeholder: "Write your review...",
    value: movie.review,
    onChange: e => onReview(movie.id, e.target.value)
  }));
}
function AddMovieForm({
  onAdd
}) {
  const [title, setTitle] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed === "") return;
    onAdd(trimmed);
    setTitle("");
  }
  return /*#__PURE__*/React.createElement("form", {
    className: "form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "Movie title",
    value: title,
    onChange: e => setTitle(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "add-button",
    type: "submit"
  }, "Add movie"));
}
function App() {
  const [movies, setMovies] = useState([]);
  function addMovie(title) {
    const newMovie = {
      id: Date.now(),
      title: title,
      rating: 0,
      review: ""
    };
    setMovies([...movies, newMovie]);
  }
  function removeMovie(id) {
    setMovies(movies.filter(m => m.id !== id));
  }
  function rateMovie(id, rating) {
    setMovies(movies.map(m => m.id === id ? {
      ...m,
      rating: rating
    } : m));
  }
  function reviewMovie(id, review) {
    setMovies(movies.map(m => m.id === id ? {
      ...m,
      review: review
    } : m));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, "Movies Watch List"), /*#__PURE__*/React.createElement("p", {
    className: "subtitle"
  }, "Save what you watch, rate it, and review it."), /*#__PURE__*/React.createElement(AddMovieForm, {
    onAdd: addMovie
  }), movies.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "empty"
  }, "No movies yet. Add the first one above.") : movies.map(movie => /*#__PURE__*/React.createElement(MovieCard, {
    key: movie.id,
    movie: movie,
    onRemove: removeMovie,
    onRate: rateMovie,
    onReview: reviewMovie
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
