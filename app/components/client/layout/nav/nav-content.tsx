import Link from "next/link";
import react from "react";
import { NavLink } from "./nav-link";

const navLinks:{label:string, link:string,id:string}[]=[
    {
        label:'Home',
        link:'/',
        id:'home-page'
    },
    {
        label:'Products',
        link:'/products',
        id:'product-page'
    },
    {
        label:'Contact Us',
        link:'/contact-us',
        id:'contact-page'
    },
    {
        label:'About Us',
        link:'/about-us',
        id:'about-page'
    }
]
const NavLinks = ()=>{
    return(
        <div className="flex items-center gap-6 lg:gap-8">
            {
                navLinks.map(item=> <NavLink key={item.id} item={item}/>)
            }
        </div>

    )
}
export default NavLinks;