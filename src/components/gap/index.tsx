import React from "react";

interface GapProps {
  width?: number;
  height?: number;
}

const Gap: React.FC<GapProps> = ({ width, height }) => {
  return <div style={{ width, height }} />;
};

export default Gap;
