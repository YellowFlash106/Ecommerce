import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerId');

    useEffect(() => {
      if(payerId  && paymentId){
        const orderId = JSON.parse(sessionStorage.getItem('currOrderId'));
        dispatch(capturePayment({payerId ,paymentId , orderId})).then((data)=>{
            if(data?.payload?.success){
                sessionStorage.removeItem('currOrderId')
                window.location.href = '/shop/payment-success' ;
            }
        })
      }
    }, [payerId,paymentId ,dispatch])
    

    return ( 
        <>
        <Card>
        <CardHeader>
        <CardTitle>Processing payment... Please wait!</CardTitle>
        </CardHeader>
        </Card>
        </>
     );
}

export default PaypalReturnPage;
// 11:13