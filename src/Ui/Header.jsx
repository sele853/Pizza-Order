import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import UserName from "../features/user/UserName"

function Header() {
    return (
        <header className="bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200 sm:px-6 flex justify-between font-mono">
            <Link to='/' className="tracking-widest">Fast  Pizza co.</Link><br />
            <SearchOrder />
            <UserName />
        </header>
    )
}

export default Header
