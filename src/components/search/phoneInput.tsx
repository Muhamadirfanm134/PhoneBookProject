import { FC } from "react";
import styled from "@emotion/styled";
import CountryPhoneInput from "antd-country-phone-input";

interface ComponentProps {
  className?: string;
  placeholder?: string;
}

const Component: FC<ComponentProps> = ({ className, placeholder }) => (
  <CountryPhoneInput inline className={className} placeholder={placeholder} />
);

const PhoneInput = styled(Component)`
  border-color: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  border-radius: 10px;
  &:hover,
  &:focus {
    border-color: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
    outline: 0;
    -webkit-box-shadow: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
    box-shadow: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
    border-color: linear-gradient(103deg, #199421, #14a01d, #6dcf73);
  }
`;

export { PhoneInput };
