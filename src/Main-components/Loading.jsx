import { RingSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div className="flex justify-center align-center min-h-96 mt-60">
      <p className="mr-8 mt-8">Content Loading</p>
      <RingSpinner size={80} color="yellow"></RingSpinner>
    </div>
  );
};

export default Loading;
