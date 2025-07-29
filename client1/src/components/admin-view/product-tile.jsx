import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";



function AdminProductTile({
    product, 
    setFormData, 
    setOpenCreateProductsDialog, 
    setCurrentEditedId,
    handleDelete,
  }) {
    return ( 
        <>
        <Card className="w-full max-w-sm mx-auto">
          <div>
            <div className="relative ">
            {product?.image
            ? (
      <img
        src={product.image}
        alt={product.title || "Product image"}
        className="w-full h-[300px] object-cover rounded-t-lg"
        /> 
        ): (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-t-lg text-gray-400">
        No Image
        </div>
         )}
            </div>
            <CardContent>
                <h2 className="text-xl font-bold mt-2 mb-2">{product?.title}</h2>
                <div className="flex items-center justify-between mb-2">
                    <span className={`${product?.salePrice > 0 ? 'line-through' : '' }
                        text-lg font-semibold text-primary`
                        }> ${product?.price}</span>
                        {
                            product.salePrice > 0 ?
                            <span className="text-lg font-bold">${product?.salePrice}</span> : null
                        }
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button onClick={() => {
                    setFormData(product);
                    // setCurrentEditedId(product?._id || product.id)
                    setCurrentEditedId(product?._id )
                    setOpenCreateProductsDialog(true)
                }
                }>Edit</Button>
                <Button
                onClick={() => {
                  handleDelete(product?._id)
                }}
                >Delete</Button>

            </CardFooter>
           </div>
        </Card>
        </>
     );
}

export default AdminProductTile;