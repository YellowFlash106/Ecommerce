import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUserAct } from "@/store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
// import { Toaster } from 'react-hot-toast';

// import { Toaster } from "@/components/ui/sonner";

const initialState = {
    userName : '',
    email : '',
    password: ''
}

function AuthSignup() {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {toast } = Toaster();

    
    function onSubmit(event){
      event.preventDefault();
      dispatch(registerUserAct(formData)).then((data) => {
         if (data?.payload?.success) {
             toast(data.payload.message);
             navigate('/auth/login');
         } else {
//     // fallback error toast
             toast(data.payload.message , { style: { backgroundColor: 'red' ,color : 'black' } })
//     toast.error(data?.error?.message || "Signup failed");
             }
  });
 }
console.log(formData);
    

    return ( 
    <>
    <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
            <p className="mt-2 ">Already have an account
                <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/login'>Login</Link>
            </p>
        </div>
        <CommonForm 
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
    </div>
   
    </>

     );
}

export default AuthSignup;