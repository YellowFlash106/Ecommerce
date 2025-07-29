import StarRating from "@/components/common/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";



function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const [reviewMsg, setReviewMsg] = useState('')
    const [rating, setRating] = useState(0)
    const { cartItems } = useSelector(state => state.shopCart)
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { reviews } = useSelector(state => state.shopReview);

    function handleRatingChange(getRating){
        console.log(getRating,"gr");
        
        setRating(getRating)
    }

    function handleAddToCart(getCurrProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const idxOfCurrItem = getCartItems.findIndex((item) => item.productId === getCurrProductId);

            if (idxOfCurrItem > -1) {
                const getQuantity = getCartItems[idxOfCurrItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast(`Only ${getQuantity} quantity can be added for this item`)
                    return;
                }
            }
        }

        dispatch(addToCart({
            userId: user?.id,
            productId: getCurrProductId,
            quantity: 1
        })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast('Product is added to cart successfully')
            }
        });
    }

    function handleDialogClose() {
        setOpen(false)
        dispatch(setProductDetails())
        setRating(0);
        setReviewMsg('')
    }

    function handleAddReview(){
        dispatch(addReview({
           productId : productDetails?._id,
           userId : user?.id ,
           userName : user?.userName,
           reviewMessage : reviewMsg ,
           reviewValue : rating,
        })).then((data) =>{
            if(data.payload.success){
                setRating(0)
                setReviewMsg('')
                dispatch(getReviews(productDetails?._id));
                toast("Review added successfully.")
            }            
        })
    }

    useEffect(() => {
    if(productDetails !== null){
        dispatch(getReviews(productDetails?._id))
    }
    }, [productDetails])
    console.log(reviews,"reviews");
    
        const avrageOfReviews = reviews && reviews.length > 0 ? 
         reviews.reduce((sum,reviewItem)=> 
            sum + reviewItem.reviewValue,0) / reviews.length : 0;


    return ( 
        <>
        <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vh] sm:max-w-[80vw] lg:max-w-[70vw]">
            <div className="relative overflow-hidden rounded-lg">
                <img 
                src={productDetails?.image} 
                alt={productDetails?.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"  />
            </div>
            <div >
                <div>
                <DialogTitle className="text-2xl font-bold">
                {productDetails?.title}
                </DialogTitle>
                {/* insted of this you can do this in h1 also */}
                    <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>
                        ${productDetails?.price}
                    </p>
                    {productDetails?.salePrice > 0 ?
                    <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p> : null
                     }
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                    <StarRating  rating={avrageOfReviews} />
                 </div>
                 <span className="text-muted-foreground">({avrageOfReviews.toFixed(1)})</span>
                </div>

                <div className="mt-5 mb-5">
                    {
                        productDetails?.totalStock === 0 ?
                        <Button className="w-full cursor-not-allowed opacity-60"
                        >
                        Out of stock
                    </Button> : <Button onClick={()=> handleAddToCart(productDetails?._id, productDetails?.totalStock)} className="w-full">
                        Add to Cart
                    </Button>
                    }
                   
                </div>
                <Separator/>

                <div className="max-h-[300px] overflow-auto">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="grid gap-6">
                        {
                            reviews && reviews.length > 0 ? 
                            reviews.map((reviewItem)=> 
                                <div className="flex gap-4">

                    <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                    </AvatarFallback>
                    </Avatar>

                    <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                    </div>

                 <div className="flex items-center gap-0.5">
                    <StarRating rating={reviewItem?.reviewValue}/>
                 </div>

                 <p className="text-muted-foreground">
                    {reviewItem?.reviewMsg}
                 </p>
                </div>
               </div>
                ) : <h3>No Reviews</h3>
                        }
                    
              </div>

              <div className="mt-10 flex flex-col gap-2">
                <Label>Write your Opinion...</Label>
                <div className="flex gap-1 ">
                    <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                </div>
                <Input name="reviewMsg" value={reviewMsg} onChange={(event) => setReviewMsg(event.target.value)} placeholder="Write your Opinion..."/>
                <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ''} >Submit</Button>
              </div>

             </div>
            </div>
           </DialogContent>
          </Dialog>
         </>
     );
}

    export default ProductDetailsDialog;
    //13:53 