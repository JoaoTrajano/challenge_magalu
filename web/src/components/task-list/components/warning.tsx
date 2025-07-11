type Props = {
  message: string;
};

export const Warning = ({ message }: Props) => {
  return (
    <div className="text-gray-500 text-center justify-center items-center flex min-h-full py-4">
      {message}
    </div>
  );
};
