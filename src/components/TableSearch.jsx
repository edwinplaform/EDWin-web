"use client"
import Image from "next/image";

const TableSearch = ({onSearch}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target.elements.searchInput.value;
        onSearch(value);
        console.log(value);
    }

    return(
        <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <Image src="/search.png" alt="" width={14} height={14}/>
            <input type="text" name="searchInput" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
        </form>
    )
}

export default TableSearch;