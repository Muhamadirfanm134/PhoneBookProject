import React, { FC } from "react";
import styled from "@emotion/styled";
import CardHeaderBackground from "../../assets/images/cardHeader.webp";

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

const Component: FC<ComponentProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const CardComponent = styled(Component)`
  background-color: var(--N0, #ffffff);
  // border: 1px solid rgb(235, 235, 235);
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 8%) 0px 7px 25px 0px;
  margin-bottom: 25px;
  margin-top: 0px;
  padding: 24px 24px 20px;
  transition: transform 500ms;
  cursor: pointer;

  &:hover {
    transform: translateY(-7px);
    box-shadow: rgb(0 0 0 / 15%) 0px 7px 25px 0px;
  }
`;

const CardFilter = styled(Component)`
  background-color: var(--N0, #ffffff);
  // border: 1px solid rgb(235, 235, 235);
  border-top: none;
  border-radius: 0px 0px 20px 20px;
  box-shadow: rgb(0 0 0 / 8%) 0px 7px 25px 0px;
  margin-bottom: 25px;
  margin-top: -25px;
  padding: 24px 24px 20px;
  transition: transform 500ms;
`;

const CardPlain = styled(Component)`
  background-color: var(--N0, #ffffff);
  // border: 1px solid rgb(235, 235, 235);
  border-top: none;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 8%) 0px 7px 25px 0px;
  margin-bottom: 25px;
  margin-top: -25px;
  padding: 24px 24px 20px;
  transition: transform 500ms;
`;

const CardHeader = styled(Component)`
  background-image: url(${CardHeaderBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  border-bottom: none;
  // border: 1px solid rgb(235, 235, 235);
  border-radius: 20px 20px 0px 0px;
  box-shadow: rgb(0 0 0 / 8%) 0px 7px 25px 0px;
  margin-bottom: 25px;
  margin-top: 0px;
  padding: 24px 24px 20px;
  transition: transform 500ms;
`;

const CardHeaderTwo = styled(Component)`
  background-image: url(${CardHeaderBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  border-bottom: none;
  // border: 1px solid rgb(235, 235, 235);
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 8%) 0px 7px 25px 0px;
  margin-bottom: 25px;
  margin-top: 0px;
  padding: 24px 24px 20px;
  transition: transform 500ms;
`;

export { CardComponent, CardHeader, CardFilter, CardHeaderTwo, CardPlain };
