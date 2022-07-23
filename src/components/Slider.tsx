import { AnimatePresence } from "framer-motion";
import { Box, Info, Row, Slider } from "./nethome";
import ButtonSlide from "../components/ButtonSlide";
import { Link, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
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

interface ISliderProps {
  data: any;
  linkType: string;
  offsetVal: number;
  [key: string]: any;
}

const SlideList = ({ data, linkType, offsetVal, ...rest }: ISliderProps) => {
  const history = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  console.log(data);
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
  const onBoxClick = (itemId: number) => {
    history(`${itemId}`);
  };
  const linkPath = linkType === "movie" ? "/movies" : `/${linkType}`;
  return (
    <>
      <Slider>
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data
              ?.slice(offsetVal * index, offsetVal * index + offsetVal)
              .map((item: any, i: any) => (
                <Box
                  key={i}
                  custom={back}
                  variants={BoxVariants}
                  initial="normal"
                  whileHover="hover"
                  layoutId={item.id + ""}
                >
                  <Link
                    to={`${linkPath}/${item.id}`}
                    onClick={() => onBoxClick(item.id)}
                  >
                    <img
                      src={makeImagePath(item.backdrop_path, "w400") || ""}
                      alt={item.title}
                    />
                    <Info variants={infoVariants}>
                      <h3>{item.title}</h3>
                    </Info>
                  </Link>
                </Box>
              ))}
          </Row>
          <ButtonSlide direction="left" onClick={decreaseIndex} />
          <ButtonSlide direction="right" onClick={increaseIndex} />
        </AnimatePresence>
      </Slider>
    </>
  );
};

export default SlideList;
