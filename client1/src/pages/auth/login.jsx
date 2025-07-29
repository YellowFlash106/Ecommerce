import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAct } from "@/store/auth-slice";
import { toast } from "sonner";
// import { Variable } from "lucide-react";


const initialState = {
    email : "",
    password: "",
}


function AuthLogin() {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function onSubmit(e){
        e.preventDefault();

        dispatch(loginUserAct(formData)).then(data =>{
            console.log(data);
            if(data?.payload?.success){
                toast( data?.payload.message);
                if(data?.payload?.user?.role === 'admin'){
                    navigate('/admin/dashboard');
                }else{
                    navigate('/shop/home');
                }
            }else{
                toast(data?.payload?.message || "Login Failed",{ style: { backgroundColor: 'red' ,color : 'black' } });
            }
        })
    }

    return ( 
    <>
    <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
            <p className="mt-2 ">Don't have an account
                <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/signup'>Sign Up</Link>
            </p>
        </div>
        <CommonForm 
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
    </div>
    </>
    // <>
    // <div>
    //     L
    // </div>
    // </>

     );
}

export default AuthLogin;