/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Heading = styled("h1")`
  color: "#333333";
  font-weight: bold;
  font-size: 34px;
  margin-bottom: -5px;
`;

export const subTitle = css`
  color: grey;
  font-size: 16px;
`;

export const nameCard = css`
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: -5px;
`;

export const phoneNumber = css`
  font-size: 10px;
  border-radius: 8px;
`;

export const divider = css`
  margin: 10px 5px;
`;

export const notFoundStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  color: grey;
`;

export const primaryButton = css`
  background-image: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  box-shadow: 0 7px 25px 0 rgb(66 181 73 / 20%),
    3px 7px 10px 0 rgb(106 205 112 / 45%);
  border: none;
  border-radius: 10px;
  color: white;
  padding: 2px;
  height: 30px;
  &:hover,
  &:focus {
    color: white;
    background-image: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  }
`;

export const redButton = css`
  box-shadow: rgb(255 91 36 / 20%) 0px 7px 25px 0px,
    rgb(255 142 36 / 45%) 3px 7px 10px 0px;
  background-image: linear-gradient(
    103deg,
    rgb(219, 79, 33),
    rgb(255, 91, 36),
    rgb(255, 141, 69)
  );
  border: none;
  border-radius: 10px;
  padding: 2px;
  color: white;
  &:hover,
  &:focus {
    color: white;
    background-image: linear-gradient(
      103deg,
      rgb(219, 79, 33),
      rgb(255, 91, 36),
      rgb(255, 141, 69)
    );
  }
`;

export const searchComponent = css`
  border-color: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  border-radius: 25px;
  &:hover,
  &:focus {
    border-color: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
    outline: 0;
    -webkit-box-shadow: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
    box-shadow: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
    border-color: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  }
`;
