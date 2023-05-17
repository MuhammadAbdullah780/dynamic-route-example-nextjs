// Library
import { useFormContext } from "react-hook-form";
// Components
import InputLabel from "@/common/components/Label";
// types
type Props = {
  type: "range" | "checkbox";
  min?: number;
  max?: number;
  label: string;
  id: string;
};

const index = ({ id, label, type, min, max }: Props) => {
  // Hooks
  const { register } = useFormContext();

  switch (type) {
    case "range":
      return (
        <>
          <InputLabel
            text={label}
            id={id}
            className="block text-sm font-medium text-gray-900 dark:text-white"
          />
          <input
            type="range"
            id={id}
            min={min}
            max={max}
            {...register(id)}
            className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer"
          />
        </>
      );
    default:
      return (
        <>
          <input
            type="checkbox"
            id={id}
            {...register(id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <InputLabel
            text={label}
            id={id}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          />
        </>
      );
  }
};

export default index;
