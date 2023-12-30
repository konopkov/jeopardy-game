import React from "react";

export type HeadingProps = {
  children?: React.ReactNode;
};
export const Heading = (props: HeadingProps) => {
  const { children } = props;

  return (
    <h1 className="text-2xl font-bold text-white text-gray-900 sm:text-3xl align-middle">
      {children}
    </h1>
  );
};

export type SubHeadingProps = {
  children?: React.ReactNode;
};
export const SubHeading = (props: SubHeadingProps) => {
  const { children } = props;

  return (
    <h2 className="text-xl font-bold text-white text-gray-500 align-middle">
      {children}
    </h2>
  );
};
