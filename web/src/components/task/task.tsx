type Props = {
  id: string;
  title: string;
  createdAt: Date;
};

export const Task = ({ id, title, createdAt }: Props) => {
  return (
    <div className="justify-between">
      <div></div>
      <div></div>
    </div>
  );
};
