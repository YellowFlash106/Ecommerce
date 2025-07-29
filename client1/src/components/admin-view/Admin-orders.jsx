import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetailsView from "./order-detils";
import { useState , useEffect } from "react";
import { getAllOrdersForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const {orderList , orderDetails} = useSelector(state =>state.adminOrder)
    const dispatch = useDispatch();

    function handleFetchOrderDtls(getId){
        dispatch(getAllOrdersForAdmin(getId))
    }

    useEffect(() => {
        if(orderDetails !== null){
            setOpenDetailsDialog(true)
        }
    }, [orderDetails])

    useEffect(() => {
      dispatch(getAllOrdersForAdmin())
    }, [dispatch])
    
console.log(orderDetails, "ol");



    return ( 
        <>
        <Card>
        <CardHeader>
            <CardTitle>All Orders</CardTitle>
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
            }}
            >
            <Button 
            onClick={()=>{handleFetchOrderDtls(orderItem?._id)}}
                >View Details</Button>
            <AdminOrderDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView;