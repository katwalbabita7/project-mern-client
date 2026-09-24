import react from "react";
import NavBar from "../components/client/layout/nav";
import Footer from "../components/client/layout/footer";

const ClientLayout = ({children}: {children:React.ReactNode})=>{
    return(
        <main>
            <NavBar/>
            <section className="min-h-[85vh] ">
                {children}
            </section>
            <Footer/>

        </main>
    )
}
export default ClientLayout;