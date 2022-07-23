import styled from "styled-components";

const Btn = styled.button<{ direction: string }>`
  display: flex;
  align-items: center;
  height: 100%;
  left: ${(props) => (props.direction === "left" ? 0 : "auto")};
  right: ${(props) => (props.direction === "right" ? 0 : "auto")};
  padding: 40px 0;
  opacity: 0.5;
  svg {
    width: 48px;
    color: #fff;
    path {
      -moz-box-shadow: -5px -5px 5px #888;
      -webkit-box-shadow: -5px -5px 5px #888;
      box-shadow: -5px -5px 5px #888;
    }
  }
  &:hover {
    opacity: 1;
  }
`;
interface ButtonProps {
  direction: string;
  [key: string]: any;
}

const ButtonSlide = ({ direction, onClick, ...rest }: ButtonProps) => {
  return (
    <Btn direction={direction} onClick={onClick}>
      {direction === "left" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}
      {direction === "right" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Btn>
  );
};

export default ButtonSlide;
