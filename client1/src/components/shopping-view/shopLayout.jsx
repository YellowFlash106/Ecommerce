import { Outlet } from "react-router-dom";
import ShopHeader from "./header";



function ShopLayout() {
    return ( 
        <>
        <div className="flex flex-col bg-purple-500 overflow-hidden">
            {/* commen header  */}
            <ShopHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>
        </div>
        </>
     );
}

export default ShopLayout;