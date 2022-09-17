/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BackgroundImage from "../../assets/images/background.svg";

export const backgroundImage = css`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: fixed;
`;

export const layout = css`
  background-image: linear-gradient(to top, #fff, #dbf9f18c);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding: 40px 20px;
  min-height: 100vh;
`;

export const footer = css`
  background-color: #dbf9f18c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  // font-weight: bold;
  color: #333;
  bottom: 0;
  font-size: 10px;
`;
