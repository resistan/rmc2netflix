import { Helmet } from "react-helmet";
import { useQueries, useQuery } from "react-query";
import { getLatestMovies, getMovies, IMovie } from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
  Dimmed,
  BigMovie,
  BigCover,
  BigTitle,
  BigOverview,
  SlideWrap,
} from "../components/nethome";
import SlideList from "../components/Slider";

const Home = () => {
  const history = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const latest = useQuery(["movies", "latest"], getLatestMovies);
  console.log(latest);
  const movies = useQueries([
    { queryKey: ["movies", "topRated"], queryFn: () => getMovies("top_rated") },
    { queryKey: ["movies", "upcoming"], queryFn: () => getMovies("upcoming") },
  ]);
  const topratedData = movies[0].data;
  const upcomingData = movies[1].data;
  const allMovies = [...topratedData.results, ...upcomingData.results];
  const offset = 6;
  const onOverlayClick = () => {
    history("/");
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    allMovies.find(
      (movie: IMovie) => movie.id === Number(bigMovieMatch.params.movieId)
    );
  // console.log(clickedMovie);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Wrapper>
        {movies[0].isLoading ? (
          <Loader>
            <p>Loading...</p>
          </Loader>
        ) : (
          <>
            <Banner bgPhoto={makeImagePath(latest?.data.backdrop_path || "")}>
              <Title>{latest?.data.title}</Title>
              <Overview>{latest?.data.overview}</Overview>
            </Banner>
            <SlideWrap className="firstList">
              <h2>Top rated movies</h2>
              <SlideList
                offsetVal={offset}
                data={topratedData?.results.slice(1)}
                linkType="movie"
              />
            </SlideWrap>
            <SlideWrap>
              <h2>Upcoming movies</h2>
              <SlideList
                offsetVal={offset}
                data={upcomingData?.results}
                linkType="movie"
              />
            </SlideWrap>
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

export default Home;
