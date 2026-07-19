const Button = ({ children, variant, size, onClick, className }) => {
  const variants = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-blue-500
      text-white
      border-2 border-transparent
      hover:text-blue-500
      hover:border-blue-500

      before:bg-white
      before:-translate-x-full
      hover:before:translate-x-0
    `,

    secondary: `
      bg-white
      text-blue-500
      border-2 border-blue-500
      hover:text-white

      before:bg-gradient-to-r
      before:from-indigo-600
      before:to-blue-500
      before:-translate-x-full
      hover:before:translate-x-0
    `,
  };

  const sizes = {
    lg: "px-4 py-2 text-sm lg:px-8 lg:py-3 lg:text-lg",
    md: "px-3 py-2 text-sm lg:px-6 lg:py-2 lg:text-base",
    sm: "px-2 py-1 text-xs lg:px-4 lg:py-1 lg:text-sm",
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        rounded-lg
        cursor-pointer
        font-medium
        transition-all
        duration-300
        hover:scale-105

        before:content-['']
        before:absolute
        before:inset-0
        before:z-0
        before:transition-transform
        before:duration-700

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;