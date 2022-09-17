import { FC } from "react";
import styled from "@emotion/styled";
import { Input } from "antd";
import { searchIcon } from "../../assets";

interface ComponentProps {
  className?: string;
  placeholder?: string;
}

const Component: FC<ComponentProps> = ({ className, placeholder }) => (
  <Input
    className={className}
    placeholder={placeholder}
    prefix={<img src={searchIcon} />}
  />
);

const SearchComponent = styled(Component)`
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

export { SearchComponent };
