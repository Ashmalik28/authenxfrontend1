

const Button = ({children , variant , size , onClick , className}) => {

    const variants = {
        primary : "bg-blue-500 text-white hover:bg-white hover:text-blue-500",
        secondary : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white "
    };
    const sizes = {
    lg: "px-4 py-2 text-sm lg:px-8 lg:py-3 lg:text-lg", 
    md: "px-3 py-2 text-sm lg:px-6 lg:py-2 lg:text-base",
    sm: "px-2 py-1 text-xs lg:px-4 lg:py-1 lg:text-sm",
  }

    return (
      <button className={` font-medium cursor-pointer outline-2 overflow-hidden transition-all duration-1000 ease-in-out hover:scale-105
        before:content-[''] before:absolute before:left-[-50px] before:top-0
        before:h-full before:w-0 before:-skew-x-12 
        before:-z-10 before:transition-all before:duration-1000
        hover:before:w-[250%] ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
        {children}
      </button>
    )
}

export default Button;