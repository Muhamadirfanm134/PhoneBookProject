/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const InputText = css`
  border-radius: 18px;
`;

export const inputPhone = css`
  margin-bottom: 0px;
`;

export const dynamicDeleteButton = css`
  position: relative;
  top: 4px;
  margin: 0 8px;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #777;
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
  padding: 2px 20px;
  height: 30px;
  color: white;
  margin-top: -20px;

  &:hover,
  &:focus {
    background-image: linear-gradient(
      103deg,
      rgb(219, 79, 33),
      rgb(255, 91, 36),
      rgb(255, 141, 69)
    );
    border: none;
    color: white;
  }
`;

export const cancelButton = css`
  color: white;
  background-color: #333333 !important;
  box-shadow: 0 7px 25px 0 #33333347, 3px 7px 10px 0 #33333347;
  border: none;
  padding: 2px;
  height: 30px;
  color: white;
  border-radius: 10px;
  &:hover,
  &:focus {
    background-color: #333333 !important;
    border: none;
    color: white;
  }
`;
