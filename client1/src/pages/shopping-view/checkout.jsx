import Address from '@/components/shopping-view/address';
import accImg from '../../assets/account.jpg';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemContant from '@/components/shopping-view/cart-items-contant';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { toast } from 'sonner';


function ShopCheckout() {

   const {cartItems} = useSelector(state => state.shopCart);
   const {user} = useSelector(state => state.auth);
   const {approvalURL} = useSelector(state => state.shopOrder);
   const [isPaymentStart, setIsPaymentStart] = useState(false)
   const [currSelectedAdd, setCurrSelectedAdd] = useState(null)
   const dispatch = useDispatch();
   
   console.log(currSelectedAdd ,'dd');

   const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
   cartItems.items.reduce((sum,currItem)=>
   sum + (currItem?.salePrice > 0 ? currItem?.salePrice : currItem?.price)
   * currItem?.quantity , 0 ) : 0 ;
   
   function handleInitiatePaypalPayment (){

      if(cartItems.items.length === 0 || cartItems.length === 0){
         toast('Your cart is Empty! .Please add items to proceed')
         return ; 
      }
      if(currSelectedAdd === null){
         toast('Please select a address to proceed')
         return ; 
      }


      const orderData ={
         userId : user?.id, 
         cartId : cartItems?._id,
         cartItems : cartItems.items.map((singleCartItem) =>({
            productId : singleCartItem?.productId,
            title : singleCartItem?.title,
            image : singleCartItem?.image,
            price : singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
            quantity : singleCartItem?.quantity,
         })) ,
         addressInfo : {
            addressId : currSelectedAdd?._id,
            address : currSelectedAdd?.address,
            city : currSelectedAdd?.city,
            pincode : currSelectedAdd?.pincode,
            phone : currSelectedAdd?.phone,
            notes : currSelectedAdd?.notes,

         },
         orderStatus : 'pending',
         paymentMethod : 'paypal', 
         paymentStatus :'pending', 
         totalAmount : totalCartAmount,
         orderDate : new Date(), 
         orderUpdateDate : new Date(), 
         paymentId : '', 
         payerId : '',
      };

      dispatch(createNewOrder(orderData)).then((data)=>{
         console.log(data,"maghnath");
         if(data?.payload?.success){
            setIsPaymentStart(true)
         }else{
            setIsPaymentStart(false);
         }
      })    
   }

   if(approvalURL){
      window.location.href = approvalURL;
   }

     return ( 
        <>
       <div className='flex flex-col'>
       <div className="relative w-full overflow-hidden">
         <img src={accImg} 
         className='h-full w-full object-contain object-center' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
         <Address selectedId={currSelectedAdd}  setCurrSelectedAdd={setCurrSelectedAdd} />
         <div className='flex flex-col p-4 bg-background gap-4'>
            {
               cartItems && cartItems.items && cartItems.items.length > 0 ?
               cartItems.items.map(item => <UserCartItemContant cartItem={item} /> ) :null
            }
         <div className=" space-y-4">
            <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount} </span>
            </div>
         </div>
         <div className='mt-4 '>
            <Button onClick={handleInitiatePaypalPayment} 
            className="w-full">
               {
                isPaymentStart ? 'Processing Paypal Payment...' : 'Checkout with Paypal'  
               }
            </Button>
         </div>
         </div>
        </div>
       </div>
        </>
     );
}

export default ShopCheckout;


