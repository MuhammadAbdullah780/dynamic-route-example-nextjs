// Types
type LabelProps = {
  id: string;
  text: string;
  className: string;
};

const index = ({ id, text, className }: LabelProps) => {
  return (
    <label htmlFor={id} className={className}>
      {text}
    </label>
  );
};

export default index;
