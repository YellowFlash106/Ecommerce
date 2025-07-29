import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetHeader,SheetContent, SheetTitle } from "../ui/sheet";
import UserCartItemContant from "./cart-items-contant";



function UserCartWrapper({ cartItems , setOpenCartSheet}) {

   const navigate = useNavigate();

   const totalCartAmount = cartItems && cartItems.length > 0 ?
   cartItems.reduce((sum,currItem)=>
   sum + (currItem?.salePrice > 0 ? currItem?.salePrice : currItem?.price)
   * currItem?.quantity , 0 ) : 0 ;
    return (
        <>
        <SheetContent className="sm:max-w-md">
         <SheetHeader>
          <SheetTitle>
             Your Cart
          </SheetTitle>
         </SheetHeader>

         <div className=" bg-slate-200 gap-1 space-y-4">
            {
               cartItems && cartItems.length > 0 ?
               cartItems.map(item =>
               <UserCartItemContant key={item.productId} cartItem={item} />) : null
            }
         </div>
         <div className=" space-y-4">
            <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount} </span>
            </div>
         </div>
         <Button onClick={()=>{ navigate('/shop/checkout');
             setOpenCartSheet(false)}} className="w-full">
            Checkout
         </Button>
        </SheetContent>
        </>
      );
}

export default UserCartWrapper;
