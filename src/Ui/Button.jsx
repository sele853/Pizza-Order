import { Link } from "react-router-dom"
function Button({children,disabled,to,type,onClick}) {
    
    const base =  `bg-yellow-400 text-sm rounded-full uppercase font-semibold font-mono
    text-stone-800 tracking-wide inline-block mt-3 hover:bg-yellow-300 
    transition-colors duration-100 focus:bg-yellow-300 focus:outline-none focus:ring 
    focus:ring-yellow-300 focus:ring-offset-2 cursor-pointer 
     ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`

    const styles ={
        primary:base + ' px-4 py-3 md:px-6 md:py-4',
        small:base + ' py-2 px-4 md:px-5 md:py-2.5 text-xs ',
        round:base + ' py-1 px-2.5 md:px-3.5 md:py-2 text-sm ',
        secondary: `px-4 py-2.5 text-sm md:px-6 md:py-3.5  rounded-full uppercase font-semibold font-mono
        text-stone-400 tracking-wide inline-block mt-3 hover:bg-stone-300 hover:text-stone-800
        transition-colors duration-100 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 border-2
         focus:ring-offset-2 cursor-pointer  
        ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
            }`
    }

    
    if(to) return <Link to={to} className={styles[type]}>{children}</Link>
    if(onClick) return (
        <button onClick={onClick} disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
