import { useState ,useEffect } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";

const initialAddFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : '',
}
function Address({setCurrSelectedAdd, selectedId}) {

    const [formData, setformData] = useState(initialAddFormData)
    const [currEditedId, setCurrEditedId] = useState(null)
    const dispatch = useDispatch();
    const { user} = useSelector((state )=> state.auth);
    const { addressList} = useSelector((state )=> state.shopAddress);

    function handleManageAdd (e){
        e.preventDefault();

        if(addressList.length >=3 && currEditedId == null){
            setformData(initialAddFormData);
            toast("You can add max 3 Addresses");
            return;
        }

        currEditedId !== null ? dispatch(editAddress({
            userId: user?.id ,addressId : currEditedId , formData
        })).then((data) =>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
                setCurrEditedId(null);
                setformData(initialAddFormData);
                toast('Address edited successfully');

            }
        }) :
        dispatch(addNewAddress({
            ...formData,
            userId : user?.id,
        })).then((data) => {
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
                setformData(initialAddFormData)
                toast('Address add successfully');
            }
            }
        )
    }

    function handleDeleteAdd(getCurrAdd){
          console.log("Deleting address:", getCurrAdd);
    dispatch(deleteAddress({userId: user?.id, addressId: getCurrAdd._id}))
    .then((data) =>{
        if(data?.payload?.success){
            dispatch(fetchAllAddress(user?.id))
            toast("Address deleted successfully");
        }
    })
    }

    function handleEditAdd(getCurrAdd){
        setCurrEditedId(getCurrAdd?._id)
        setformData({
            ...formData,
            address : getCurrAdd?.address,
    city : getCurrAdd?.city,
    phone : getCurrAdd?.phone,
    pincode : getCurrAdd?.pincode,
    notes : getCurrAdd?.notes,
        })
    }

    function isFormValid (){
        return Object.keys(formData)
        .map((key) => formData[key] !== "")
        .every((item) => item);
    }

    useEffect(() => {
      dispatch(fetchAllAddress(user?.id))
    }, [dispatch])
    
    console.log(addressList , "asl");
    

    return ( 
        <>
        <Card>
       
            <div className=" mb-5 p-3 grid-cols-1 gap-2">
           {
            addressList && addressList.length > 0 ?
            addressList.map(singleAddItem => 
            <AddressCard
            selectedId={selectedId}
            handleDeleteAdd={handleDeleteAdd}
            // key={singleAddItem._id}
            handleEditAdd={handleEditAdd}
            addressInfo={singleAddItem}
            setCurrSelectedAdd={setCurrSelectedAdd}
            />) : null
           }
          </div>
        <CardHeader>
        <CardTitle>
            {currEditedId !== null ? "Edit Address" : "Add new Address"}
        </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
            <CommonForm
            formData={formData}
            setFormData={setformData}
            formControls={addressFormControls} 
            buttonText={currEditedId !== null ? "Edit" : "Add"}
            onSubmit={handleManageAdd}
            isBtnDisabled={!isFormValid()}
            />
        </CardContent>

        </Card>
        </>
     );
}

export default Address;

// 9:33 🤦‍♂️