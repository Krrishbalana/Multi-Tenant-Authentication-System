const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-cyan-600 text-white font-medium py-3 px-5 
                  rounded-xl shadow-sm hover:bg-cyan-500 active:scale-[0.98] 
                  transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
