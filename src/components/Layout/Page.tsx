import React, { FC } from "react";

interface Props {
  className?: string;
}

const Page: FC<Props> = ({ children, className = "" }) => (
  <section className={`section-container ${className}`}>{children}</section>
);

export default Page;
