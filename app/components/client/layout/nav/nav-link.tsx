import Link from "next/link"


export const NavLink=({item:{label,link}}:{item:{label:string, link:string, id:string}})=>{
    return(
        <Link href={link}>
        <span className="flex justify-between text-lg font-semibold text-gray-700 hover:text-sky-600">{label}</span>
        </Link>
    )
}