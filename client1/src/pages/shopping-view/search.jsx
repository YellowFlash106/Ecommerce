import { Input } from "@/components/ui/input";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "./productDetails";
import { fetchProductDetails } from "@/store/shop/products-slice";

function SearchProducts() {

    const [keyword, setKeyword] = useState('');
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const {searchResults} = useSelector(state => state.shopSearch );
    const {productDetails} = useSelector(state => state.shopProducts);
    const {cartItems} = useSelector(state => state.shopCart);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
      if(keyword && keyword.trim() !== '' && keyword.trim().length >= 3){
        setTimeout(() => {
            setSearchParams(new URLSearchParams(`?keyword = ${keyword}`))
            dispatch(getSearchResults(keyword))
        }, 1000);
      }else {
        setSearchParams(new URLSearchParams(`?keyword = ${keyword}`))
        dispatch(resetSearchResults())
      }
    }, [keyword]);

     function handleProductDetails(getCurrProductId){
          console.log(getCurrProductId);
          dispatch(fetchProductDetails(getCurrProductId))
       }

    function handleAddToCart(getCurrProductId, getTotalStock){

       let getCartItems = cartItems.items || [];

      if(getCartItems.length){
      const idxOfCurrItem = getCartItems.findIndex((item) => item.productId === getCurrProductId);
      if(idxOfCurrItem > -1){
      const getQuantity = getCartItems[idxOfCurrItem].quantity;
      if(getQuantity + 1 > getTotalStock){
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
    if(data?.payload?.success){
         dispatch(fetchCartItems(user?.id))
         toast('Product is added to cart successfully')
        }
      });
    }
     
     useEffect(() => {
      if(productDetails !== null)
         setOpenDetailsDialog(true)
   }, [productDetails]);

    console.log(searchResults,"pp");
    
    

    return ( 
        <>
        <div className=" w-full container bg-background mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
            <Input 
            value={keyword} name = "keyword" 
            onChange={(e) => setKeyword(e.target.value) } 
            className="py-6 border-2 border-black" placeholder="Search Products..."/>
            </div>
            </div>
            {
                !searchResults.length ? 
                <h2 className="text-3xl font-bold">No result found</h2> : null
            }
            <div className=" gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                searchResults.map((item) => <ShoppingProductTile 
                handleAddToCart={handleAddToCart}
                product={item} 
                handleProductDetails={handleProductDetails}
                />)}
            </div>
             <ProductDetailsDialog
            open={openDetailsDialog} 
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}/>

        </div>
        </>
     );
}

export default SearchProducts;
// 13:09 final m