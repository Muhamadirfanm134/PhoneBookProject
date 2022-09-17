import { FC } from "react";
import styled from "@emotion/styled";
import { Button } from "antd";

interface ComponentProps {
  className?: string;
  label: string;
  width?: number;
}

const Component: FC<ComponentProps> = ({ label, className }) => (
  <Button type="primary" className={className} block>
    {label}
  </Button>
);

const PrimaryButton = styled(Component)`
  background-image: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  box-shadow: 0 7px 25px 0 rgb(66 181 73 / 20%),
    3px 7px 10px 0 rgb(106 205 112 / 45%);
  border: none;
  border-radius: 10px;
  padding: 8px;
  height: 40px;
  &:hover,
  &:focus {
    background-image: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  }
`;

const CancelButton = styled(Component)`
  color: white;
  background-color: #333333 !important;
  box-shadow: 0 7px 25px 0 #33333347, 3px 7px 10px 0 #33333347;
  border: none;
  padding: 8px;
  height: 40px;
  &:hover,
  &:focus {
    background-color: #333333 !important;
  }
`;

const RedButton = styled(Component)`
  box-shadow: rgb(255 91 36 / 20%) 0px 7px 25px 0px,
    rgb(255 142 36 / 45%) 3px 7px 10px 0px;
  background-image: linear-gradient(
    103deg,
    rgb(219, 79, 33),
    rgb(255, 91, 36),
    rgb(255, 141, 69)
  );
  border: none;
  padding: 8px;
  height: 40px;
  &:hover,
  &:focus {
    background-image: linear-gradient(
      103deg,
      rgb(219, 79, 33),
      rgb(255, 91, 36),
      rgb(255, 141, 69)
    );
  }
`;

export { PrimaryButton, CancelButton, RedButton };
