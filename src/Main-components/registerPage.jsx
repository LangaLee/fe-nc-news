const Register = () => {
  const handleRegistration = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center align-bottom">
      <form onSubmit={handleRegistration} className="flex flex-col w-2/4 mt-48">
        <label>Username</label>
        <input type="text" className=" text-black text-xl" required={true} />
        <label>Name</label>
        <input type="text" className=" text-black text-xl" required={true} />
        <label>Avatar url</label>
        <input type="text" className=" text-black text-xl" />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
