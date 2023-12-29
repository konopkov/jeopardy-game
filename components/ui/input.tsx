{
  /* <input */
}
//           type="password"
//           class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//           placeholder="Enter password"
//         />

export type InputProps = {
  type: string;
  placeholder: string;
  name: string;
};

export const Input = (props: InputProps) => {
  const classNames = [
    "w-full",
    "rounded-lg",
    "border-gray-200",
    "p-4",
    "pe-12",
    "text-sm",
    "shadow-sm",
    "text-black",
  ];

  const className = classNames.join(" ");

  return <input className={className} {...props} />;
};
