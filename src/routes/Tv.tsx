import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { getTvs, IGetTvResponse } from "../api";
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

const Tv = () => {
  const history = useNavigate();
  const bigTvMatch = useMatch("/tv/:tvId");
  const { isLoading, data } = useQuery<IGetTvResponse>(
    ["tv", "onTheAir"],
    getTvs
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
  const onBoxClick = (tvId: number) => {
    history(`${tvId}`);
  };
  const onOverlayClick = () => {
    history("/tv");
  };
  const clickedtv =
    bigTvMatch?.params.tvId &&
    data?.results.find((tv) => tv.id === Number(bigTvMatch.params.tvId));
  // console.log(clickedtv);
  return (
    <>
      <Helmet>
        <title>Tv</title>
      </Helmet>
      <Wrapper>
        {isLoading ? (
          <Loader>
            <p>Loading...</p>
          </Loader>
        ) : (
          <>
            <Banner
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            >
              <Title>{data?.results[0].name}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              <AnimatePresence
                custom={back}
                initial={false}
                onExitComplete={toggleLeaving}
              >
                {/* <h2>Now Showing</h2> */}
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((tv, i) => (
                      <Box
                        key={i}
                        custom={back}
                        variants={BoxVariants}
                        initial="normal"
                        whileHover="hover"
                        layoutId={tv.id + ""}
                      >
                        <Link
                          to={`/tv/${tv.id}`}
                          onClick={() => onBoxClick(tv.id)}
                        >
                          <img
                            src={makeImagePath(tv.backdrop_path, "w400") || ""}
                            alt={tv.name}
                          />
                          <Info variants={infoVariants}>
                            <h3>{tv.name}</h3>
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
              {bigTvMatch ? (
                <>
                  <Dimmed
                    onClick={onOverlayClick}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <BigMovie layoutId={bigTvMatch.params.tvId}>
                    {clickedtv && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient( to top, black, transparent ),
													url(${makeImagePath(clickedtv.backdrop_path, "w500")})`,
                          }}
                        />
                        <BigTitle>{clickedtv.name}</BigTitle>
                        <BigOverview>{clickedtv.overview}</BigOverview>
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

export default Tv;
