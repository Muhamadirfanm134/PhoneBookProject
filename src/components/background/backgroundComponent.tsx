import { FC } from "react";
import styled from "@emotion/styled";

interface ComponentProps {
  className?: string;
  label: string;
}

const Component: FC<ComponentProps> = ({ label, className }) => (
  <div className={className}>{label}</div>
);

const BackgroundComponent = styled(Component)`
  background-image: url(../../assets/images/background.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
  z-index: 10;
`;

export { BackgroundComponent };
