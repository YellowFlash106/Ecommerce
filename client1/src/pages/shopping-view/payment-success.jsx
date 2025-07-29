import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaySuccessPage() {

    const navigate = useNavigate();

    return ( 
        <>
        <Card  className="bg-background p-5">
        <CardHeader className="p-0">
        <CardTitle className="text-4xl"> Payment Successfull</CardTitle>
        </CardHeader>
        <Button className="w-30 mt-5" onClick={()=> navigate("/shop/account")}>View Orders</Button>
        </Card>   
        </>
     );
}

export default PaySuccessPage;