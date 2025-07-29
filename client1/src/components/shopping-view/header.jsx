import { HousePlugIcon, LogOut, Menu } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { ShoppingCart,CircleUser } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logOutUserAct } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useState ,useEffect } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { DropdownMenu,
         DropdownMenuContent, 
         DropdownMenuItem, 
         DropdownMenuLabel, 
         DropdownMenuSeparator, 
         DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Label } from "../ui/label";


function MenuItems(){

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();


    function hdlNavigate(getCurrMenuItem){
        sessionStorage.removeItem('filters')
        const currFilter = 
        getCurrMenuItem?.id !== 'home' && 
        getCurrMenuItem.id !== 'products' && 
        getCurrMenuItem.id !== 'search'
        ?{
            category :[getCurrMenuItem?.id]
        } : null

        sessionStorage.setItem('filters', JSON.stringify(currFilter));
        location.pathname.includes('listing') && currFilter !== null ?
        setSearchParams(new URLSearchParams(`?category=${getCurrMenuItem.id}`)) :
        navigate(getCurrMenuItem.path)
    }


    return( 
        <>
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {
            shoppingViewHeaderMenuItems.map(menuItem=>
            <Label onClick={()=> hdlNavigate(menuItem) } 
            className="text-sm text-black cursor-pointer font-medium" 
            key={menuItem.id} >{menuItem.label}
            </Label>
            
            )
            }
        </nav>
        </>
    );
}

function HeaderRightContant(){
    const { user} = useSelector(state=>state.auth);
    const {cartItems} = useSelector(state=>state.shopCart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openCartSheet, setOpenCartSheet] = useState(false);



    function handleLogout(){
        dispatch(logOutUserAct());
    }

    useEffect(() => {
      dispatch(fetchCartItems(user?.id))
    }, [dispatch])
    

    return (
        <>
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet 
            open={openCartSheet}
            onOpenChange={()=> setOpenCartSheet(false)}
            >
              <Button onClick={()=> setOpenCartSheet(true)} 
              variant="outline" size="icon"
              className="relative"
              >
               <ShoppingCart className="h-6 w-6" />
               <span className="absolute top-[-5px] right-[-2px] font-bold text-sm" >{cartItems?.items?.length || 0}</span>
                 <span className="sr-only">User Cart</span>
              </Button>
            <UserCartWrapper 
            setOpenCartSheet={setOpenCartSheet} 
            cartItems={cartItems && cartItems.items && 
            cartItems.items.length >0 ? cartItems.items : [] } />
            </Sheet>

            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black">
                  
                <AvatarFallback className="bg-black  text-white font-extrabold">
                {user?.userName[0]}
                
                </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator/>

                <DropdownMenuItem onClick={()=> navigate('/shop/account')}>
                   <CircleUser className="mr-2 text-black h-6 w-6" />
                   Account
                </DropdownMenuItem>
                <DropdownMenuSeparator/>

                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 text-black h-6 w-6" />
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator/>

            </DropdownMenuContent>

            </DropdownMenu>
        </div>
        </>
    )
}

function ShopHeader() {

    const {isAuthenticated} = useSelector(state=>state.auth)
    

    return ( 
        <>
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
                <Link to='/shop/home' className="flex items-center gap-2">

                <HousePlugIcon className="h-6 w-6" />
                <span className="font-bold text-black">Emoccerce</span>

                </Link>
                <Sheet>

                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-19 w-19 bg-amber-50"/>
                    <span className="sr-only">Toggle header menu</span>  
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-full max-w-xs p-5 ">
                    <HeaderRightContant/>
                    <MenuItems/>
                </SheetContent>

                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems/>
                </div>
                 <div className="hidden lg:block">
                    <HeaderRightContant/>
                </div>
            </div>
        </header>
        </>
     );
}

export default ShopHeader;

