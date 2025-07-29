import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";



function AddressCard({addressInfo, 
                      handleDeleteAdd,
                      handleEditAdd,
                      selectedId,
                      setCurrSelectedAdd}) {
                        console.log(selectedId,"si");
                        
    return ( 
        <>
        <Card onClick={
            setCurrSelectedAdd ? 
            ()=> setCurrSelectedAdd(addressInfo) 
            : null}
            className={`cursor-pointer p-4 border-2 border-black ${selectedId?._id === addressInfo?._id ? "border-green-400" : "border-black"}`}>
        <CardContent className={`${selectedId === addressInfo?._id ? "border-black" : " " }grid p-4 gap-4`}>

        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Phone no: {addressInfo?.phone}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>

        </CardContent>
        <CardFooter className="flex justify-between p-3">
            <Button onClick={() =>{handleEditAdd(addressInfo)}} >Edit</Button>
            <Button onClick={() =>{handleDeleteAdd(addressInfo)}} >Delete</Button>
        </CardFooter>
        </Card>
        </>
     );
}

export default AddressCard;