import { Fragment } from "react";
import { ShieldUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { LayoutDashboard , PackageSearch ,ListOrdered } from "lucide-react"


export const adminSidebarMenuItems =[
    {
        id: 'dashboard',
        lable: 'Dashboard',
        path:'/admin/dashboard',
        icon: <LayoutDashboard />,
    },
    {
        id: 'products',
        lable: 'Products',
        path:'/admin/products',
        icon: <PackageSearch />,
    },
    {
        id: 'orders',
        lable: 'Orders',
        path:'/admin/orders',
        icon :<ListOrdered />,
    },
]


function MenuItems({setOpen}){
  const navigate = useNavigate();

  return (
    <>
    <nav className="mt-8 flex-col flex gap-2">
      {
        adminSidebarMenuItems.map(menuItem=> <div key={menuItem.id} onClick={() => {
          navigate(menuItem.path)
          setOpen ?setOpen(false) : null
        }
        }
         className="flex text-xl cursor-pointer font-bold item-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
          {menuItem.icon}
          <span>{menuItem.lable}</span>
        </div>)
      }

    </nav>
    </>
  )
}



function AdminSidebar({open ,setOpen}) {

  const navigate = useNavigate();
    return ( 
        <>
        <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
        <div className="flex flex-col h-full">
        <SheetHeader className="border-b">
        <SheetTitle className="flex gap-2 mt-8 mb-5">
        <ShieldUser size={30} />
        <span className="text-2xl font-extrabold">  Admin Panel</span>
        </SheetTitle>
        </SheetHeader>
        <MenuItems setOpen={setOpen} />
        </div>
        </SheetContent>

        </Sheet>
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div onClick={() => {
          navigate('/admin/dashboard')
        }
        } className="flex cursor-pointer items-center gap-2">
           <ShieldUser size={30} />
         <span className="text-2xl font-extrabold">  Admin Panel</span>
        </div>
        <MenuItems/>
        </aside>
        </Fragment>
        </>
     );
}

export default AdminSidebar;