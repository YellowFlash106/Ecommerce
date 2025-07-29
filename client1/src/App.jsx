import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthSignup from './pages/auth/signup'
import AdminLayout from './components/admin-view/adminLayout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShopLayout from './components/shopping-view/shopLayout'
import ShopAccount from './pages/shopping-view/account'
import ShopHome from './pages/shopping-view/home'
import ShopListing from './pages/shopping-view/lisiting'
import ShopCheckout from './pages/shopping-view/checkout'
import NotFound from './pages/not-found'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useSelector,useDispatch } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { useEffect } from 'react'
import { Skeleton } from './components/ui/skeleton'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaySuccessPage from './pages/shopping-view/payment-success'
import SearchProducts from './pages/shopping-view/search'


function App() {
    const {user , isAuthenticated , isLoading} = useSelector(state=> state.auth);
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if(isLoading){
    return <Skeleton className="w-[600px] h-[600px] rounded-full" />;
  }
  console.log(isLoading ,isAuthenticated ,user);
  


  return (
    <>
    <div className='flex flex-col overflow-hidden bg-white'>


      <Routes>
        <Route 
        path='/' 
        element={ 
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth> }
        />
        <Route path="/auth" element={ 
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
             <AuthLayout/>
          </CheckAuth>
      }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="signup" element={<AuthSignup />} />
        </Route>

        <Route path='/admin' element={ 
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
             <AdminLayout />
          </CheckAuth>
        }>
          
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>


        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopLayout />
        </CheckAuth>
        }>
          <Route path='home' element={<ShopHome />} />
          <Route path='account' element={<ShopAccount />} />
          <Route path='listing' element={<ShopListing />} />
          <Route path='checkout' element={<ShopCheckout />} />
          <Route path='paypal-return' element={<PaypalReturnPage />} />
          <Route path='paypal-success' element={<PaySuccessPage />} />
          <Route path='search' element={<SearchProducts />} />
        </Route>

        <Route path='*' element={<NotFound />} />
        <Route path='/unauth-page' element={<UnauthPage/>}/>

      </Routes>

    </div>
      
    </>
  )
}

export default App
// 11:09