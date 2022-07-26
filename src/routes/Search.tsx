import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearchResults, ISearchResponse } from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
  Slider,
  Row,
  Box,
  Info,
  Dimmed,
  BigMovie,
  BigCover,
  BigTitle,
  BigOverview,
} from "../components/nethome";
import ButtonSlide from "../components/ButtonSlide";
import { useState } from "react";

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.innerWidth - 5 : window.innerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
};
const BoxVariants = {
  normal: {
    scale: 1,
    transition: {
      type: "tween",
    },
  },
  hover: {
    scale: 1.3,
    y: -20,
    transition: {
      type: "tween",
      delay: 0.2,
      duration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.2,
      duration: 0.2,
    },
  },
};

const Search = () => {
  const history = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { isLoading, data } = useQuery<ISearchResponse>(
    ["search", "result"],
    () => getSearchResults(keyword)
  );
  console.log(data);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  const offset = 6;
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setLeaving(true);
      setBack(false);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setBack(true);
    setIndex((prev) => (prev === 0 ? prev : prev - 1));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    history(`${movieId}`);
  };
  const onOverlayClick = () => {
    history(`/search?keyword=${keyword}`);
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id === Number(bigMovieMatch.params.movieId)
    );
  return (
    <>
      <Helmet>
        <title>Search result: {keyword}</title>
      </Helmet>
      <Wrapper>
        {isLoading ? (
          <Loader>
            <p>Loading...</p>
          </Loader>
        ) : (
          <>
            <Slider>
              <AnimatePresence
                custom={back}
                initial={false}
                onExitComplete={toggleLeaving}
              >
                <h1>Search result: {keyword}</h1>
                {/* <h2>Now Showing</h2> */}
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {data?.results.map((movie, i) => (
                    <Box
                      key={i}
                      custom={back}
                      variants={BoxVariants}
                      initial="normal"
                      whileHover="hover"
                      layoutId={movie.id + ""}
                    >
                      <Link
                        to={`/movies/${movie.id}`}
                        onClick={() => onBoxClick(movie.id)}
                      >
                        <img
                          src={makeImagePath(movie.backdrop_path, "w400") || ""}
                          alt={movie.title}
                        />
                        <Info variants={infoVariants}>
                          <h3>{movie.title}</h3>
                        </Info>
                      </Link>
                    </Box>
                  ))}
                </Row>
                <ButtonSlide direction="left" onClick={decreaseIndex} />
                <ButtonSlide direction="right" onClick={increaseIndex} />
              </AnimatePresence>
            </Slider>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Dimmed
                    onClick={onOverlayClick}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <BigMovie layoutId={bigMovieMatch.params.movieId}>
                    {clickedMovie && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient( to top, black, transparent ),
													url(${makeImagePath(clickedMovie.backdrop_path, "w500")})`,
                          }}
                        />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Search;
