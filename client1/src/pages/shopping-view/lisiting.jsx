import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, 
   DropdownMenuContent, 
   DropdownMenuRadioGroup, 
   DropdownMenuRadioItem, 
   DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect ,useState } from "react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "./productDetails";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";


function crtSrchParamsHelper(filterParams){
   const queryParams = [];

   for(const [key,value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length >0){
         const paramValue = value.join(',')
         queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
   }
   console.log(queryParams,"Params");
   
   return queryParams.join('&')
}


function ShopListing() {
   const dispatch = useDispatch();
   const { productList , productDetails } = useSelector(state=>state.shopProducts);
   const { cartItems } = useSelector(state => state.shopCart)
   const {user} = useSelector(state=>state.auth);
   
   const [filters, setFilters] = useState({})
   const [sort, setSort] = useState(null)
   const [searchParams,setSearchParams] = useSearchParams();
   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

   const categorySearchParams = searchParams.get('category')



   function handleSort(value){
      setSort(value)
   }

   // function handleFilter(getSectionId , getCurrentOption){
   //    // console.log(getSectionId , getCurrentOption);  
      
   //    let cpyFilters = {...filters};
   //    const idxOfCurrSection = Object.entries(cpyFilters).indexOf(getSectionId);
   //    if(idxOfCurrSection === -1){
   //       cpyFilters = {
   //          ...cpyFilters,
   //          [getSectionId] : [getCurrentOption],
   //       }
   //    }else{
   //       const idxOfCurrOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
   //       if(idxOfCurrOption === -1){
   //          cpyFilters[getSectionId].push(getCurrentOption)
   //       }
   //       else{
   //          cpyFilters[getSectionId].splice(idxOfCurrOption , 1);
   //       }
   //    }
   //    setFilters(cpyFilters);
   //    sessionStorage.setItem('filters',JSON.stringify(cpyFilters))
   // }

   function handleFilter(getSectionId, getCurrentOption) {
  let cpyFilters = { ...filters };
  if (!cpyFilters[getSectionId]) {
    cpyFilters[getSectionId] = [getCurrentOption];
  } else {
    const idxOfCurrOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
    if (idxOfCurrOption === -1) {
      cpyFilters[getSectionId].push(getCurrentOption);
    } else {
      cpyFilters[getSectionId].splice(idxOfCurrOption, 1);
    }
  }
  setFilters(cpyFilters);
  sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
}


   function handleProductDetails(getCurrProductId){
      console.log(getCurrProductId);
      dispatch(fetchProductDetails(getCurrProductId))
   }

   // function handleAddToCart(getCurrProductId){
   //    console.log(getCurrProductId);
   //    dispatch(addToCart({userId: user.id, productId : getCurrProductId, quantity: 1})).then(data=>
   //       console.log(data)
   //    )
   // }
   function handleAddToCart(getCurrProductId, getTotalStock){
//   console.log("user:", user);
//   console.log("userId:", user && user.id);
//   console.log("productId:", getCurrProductId);

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
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
   }, [categorySearchParams]);

   useEffect(() => {
   if(filters && Object.keys(filters).length >0){
      const crtQryString = crtSrchParamsHelper(filters)
      setSearchParams(new URLSearchParams(crtQryString))
   }
   }, [filters])


   //fetch list of product 
   useEffect(() => {
      if(filters !== null && sort !== null)
     dispatch(fetchAllFilteredProducts({filterParams : filters ,sortParams: sort}))
   }, [dispatch, sort , filters])

   useEffect(() => {
      if(productDetails !== null)
         setOpenDetailsDialog(true)
   }, [productDetails]);

   console.log(productList,"fvd");
   

    return ( 
        <>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
               <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-extrabold ">All Products</h2>
                  <div className="flex items-center gap-3">
                     <span className="text-muted-foreground">{productList?.length} products</span>
                     
                  <DropdownMenu>

                  <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                     <ArrowUpDownIcon className="h-4 w-4"/>
                     <span>Sort by</span>
                  </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort}onValueChange={handleSort}>
                  {
                  sortOptions.map(sortItem => 
                     <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                        {sortItem.label}
                     </DropdownMenuRadioItem>
                     )}
                  </DropdownMenuRadioGroup>
                  </DropdownMenuContent>

                  </DropdownMenu>

                  </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {
                     productList && productList.length >0 ?
                     productList.map(productItem=>
                        <ShoppingProductTile
                        key={productItem?._id}
                        handleProductDetails={handleProductDetails} 
                        product={productItem}
                        handleAddToCart={handleAddToCart}
                        /> 
                     ) :null
                  }
               </div>
            </div>

            <ProductDetailsDialog
            open={openDetailsDialog} 
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}/>

        </div>
        </>
     );
}

export default ShopListing;

// 7:40 
// index.js