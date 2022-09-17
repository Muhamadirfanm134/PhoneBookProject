import { FC } from "react";
import styled from "@emotion/styled";

interface ComponentProps {
  className?: string;
}

const Component: FC<ComponentProps> = ({ className }) => (
  <div className={className} />
);

const DividerComponent = styled(Component)`
  width: 50px !important;
  height: 6px;
  background: rgb(56, 188, 37);
  border-radius: 12px;
  margin: 10px 0;
  align-items: center;
`;

export { DividerComponent };
