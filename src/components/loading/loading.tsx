/** @jsxImportSource @emotion/react */
import { Spin } from "antd";
import * as React from "react";
import { spinnerContainer } from "./LoadingStyle";

interface LoadingComponentProps {}

const LoadingComponent: React.FC<LoadingComponentProps> = () => {
  return (
    <div css={spinnerContainer}>
      <Spin size="large" />
      <h2 className="loading-title">Please Wait . . .</h2>
    </div>
  );
};

export default LoadingComponent;
