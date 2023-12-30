import React from "react";

export type HeadingProps = {
  children?: React.ReactNode;
  className?: string;
};
export const Heading = (props: HeadingProps) => {
  const { children } = props;

  return (
    <h1
      className={`text-2xl font-bold text-white sm:text-3xl align-middle ${
        props.className ?? ""
      }`}
    >
      {children}
    </h1>
  );
};

export const HeadingGray = (props: HeadingProps) => {
  const { children } = props;

  return (
    <h1
      className={`text-2xl font-bold text-gray-300 sm:text-3xl align-middle ${
        props.className ?? ""
      }`}
    >
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
    <h2 className="text-xl font-bold text-white align-middle">{children}</h2>
  );
};
