import { Dispatch, FC, SetStateAction } from "react";
interface InputProps {
  Heading: string;
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
const Input: FC<InputProps> = ({ Heading, name, value, setValue }) => {
  return (
    <>
      <label htmlFor="title" className="block text-sm font-semibold text-heading">
        {Heading}
      </label>
      <input
        required
        id={name}
        name={name}
        type="text"
        placeholder={`Your post ${name}`}
        className="mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default Input;
