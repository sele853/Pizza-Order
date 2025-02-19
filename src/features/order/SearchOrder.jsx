import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [query,setQuery] = useState('');
    const navigate = useNavigate();
    
    function handleSubmit(e){
        e.preventDefault();
        if(!query) return;
        navigate(`/order/${query}`);
        setQuery('');

    }
    return (
        <form onSubmit={handleSubmit} >
            <input type="text" 
                placeholder="search order #"
                value={query}
                onChange={e=>setQuery(e.target.value)} 
                className="bg-yellow-100 text-sm px-4 py-2 rounded-full placeholder-stone-400  w-28 sm:w-64 focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 foucs:ring-opacity-50"/>
        </form>
    )
}

export default SearchOrder
