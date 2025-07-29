import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";


function ProductImageUpload({
    imageFlie,
    setImageFlie,
    imageLoadingState,
    uploadedImageUrl,
    setUploadedImageUrl,
    setImageLoadingState,
    isEditMode
}) {
    const inputRef = useRef(null);
    console.log(isEditMode);
    

    function handleImageFileChange(e) {
        console.log(e.target.files);
        const selectedFile = e.target.files?.[0]
        if(selectedFile) setImageFlie(selectedFile)
    }
function handleDragOver(e){
e.preventDefault()
}
function handleDrop(e){
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0];
    if(droppedFile) setImageFlie(droppedFile);

}

function handleRemoveImage(){
    setImageFlie(null)
    if(inputRef.current)
        inputRef.current.value = "";
}
console.log(imageFlie);

async function uploadImageToCloudinary() {
    setImageLoadingState(true)
    const data =new FormData();
    data.append('my_file',imageFlie)
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',data)
    console.log(response , "response");
    
    if(response.data?.success) {
    setUploadedImageUrl(response.data.result.url);
    setImageLoadingState(false)

    }
}

useEffect(() => {
  if(imageFlie!==null) uploadImageToCloudinary()
}, [imageFlie])



    return ( 
        <>
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="text-lg font-semibold mb-2">Upload Image</Label>
            <div 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            className={`${isEditMode ? 'opacity-60' : '' } border-2 border-dashed rounded-lg p-4`}>
            <Input 
            id="image-upload" 
            type="file"  
            className="hidden" 
            ref={inputRef} 
            onChange={handleImageFileChange}
            disabled={isEditMode}/>
                {
                    !imageFlie?(
                    <Label htmlFor="image-upload" className={`${isEditMode ? 'cursor-not-allowed' : '' }  flex flex-col items-center justify-center h-32 cursor-pointer`} >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span>Drag & drop or click to upload image</span>
                      </Label> ):imageLoadingState ?(
                        <Skeleton className=" h-10 bg-gray-500"/>
                     ):( 
                        <div className="flex items-center justify-between ">

                        <div className="flex items-center">
                            <FileIcon className="w-8 h-8 text-primary mr-2"/>
                        </div>
                        <p className="text-sm font-medium">{imageFlie.name}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove File</span>
                        </Button>
                         </div>
                         )
            }
               
            </div>
        </div>
        </>
     );
}

export default ProductImageUpload;