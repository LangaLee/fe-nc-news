const Button = ({ value, func }) => {
  return (
    <button
      className="rounded-md border-solid border-2 hover:bg-blue-900 m-4 text-xl p-1"
      onClick={func}
    >
      {value}
    </button>
  );
};

export default Button;
