import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, 
         TableBody, 
         TableCell, 
         TableHead, 
         TableHeader, 
         TableRow } from "../ui/table";
import ShoppingOrDetailsView from "./order-details";
import { useState ,useEffect, use } from "react";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {orderList , orderDetails } = useSelector(state => state.shopOrder);

    function handleFetchOrderDtls (getId){
        dispatch(getOrderDetails(getId));
    }

    useEffect(() => {
        if(orderDetails !== null){
            setOpenDetailsDialog(true);
        }
    }, [orderDetails])


    useEffect(() => {
      dispatch(getAllOrdersByUserId(use?.id))
    }, [dispatch])

    console.log(orderList , "oll");
    
    
    return ( 
        <>
        <Card>
        <CardHeader>
            <CardTitle>Order history</CardTitle>
        </CardHeader>
    
        <CardContent>
        <Table>
         <TableHeader>
           <TableRow>

            <TableHead>Order ID</TableHead>   
            <TableHead>Order Date</TableHead>   
            <TableHead>Order Status</TableHead>   
            <TableHead>Order Price</TableHead>  

            <TableHead className="sr-only">
                <span>Details</span>
            </TableHead>   

           </TableRow>
         </TableHeader>

         <TableBody>
            {
                orderList && orderList.length > 0 ? 
                orderList.map(orderItem =>
        <TableRow>
        <TableCell>{orderItem?._id}</TableCell>
        <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
        <TableCell>
            <Badge className={`py-1 px-3 ${
                    orderItem?.orderStatus === "confirmed" ?
                    'bg-green-500' :
                    orderItem?.orderStatus === "rejected" ?
                    'bg-red-500' :
                    'bg-black' 
                }`}>
                {orderItem?.orderStatus}
            </Badge>
        </TableCell>
        <TableCell>{orderItem?.totalAmont}</TableCell>
        <TableCell>
            <Dialog 
            open={openDetailsDialog} 
            onOpenChange={()=> {
                setOpenDetailsDialog(false);
                dispatch(resetOrderDetails())
            }}>
            <Button onClick={()=>{handleFetchOrderDtls(orderItem?._id)}}>View Details</Button>
            <ShoppingOrDetailsView orderDetails={orderDetails} />
            </Dialog>
        </TableCell>

        </TableRow>
                 )
                : null
            }
        
         </TableBody>
        </Table>
        </CardContent>
        </Card>
        </>
     );
}

export default ShoppingOrders;