// libraries
import { useFormContext } from "react-hook-form";
// Components
import InputLabel from "@/common/components/Label";
// Types
type List = {
  name: string;
  value: string;
};
type Props = {
  id: string;
  label: string;
  list: List[];
};

const index = ({ id, label, list }: Props) => {
  const { register } = useFormContext();
  return (
    <>
      <InputLabel text={label} id={id} className="select-label" />
      <select
        id={id}
        {...register(id)}
        className="bg-gray-50 border border-gray-300 min-w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {list?.map((item, i) => {
          return (
            <option value={item.value} key={i}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default index;
