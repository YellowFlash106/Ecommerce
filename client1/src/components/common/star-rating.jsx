import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";


function StarRating({rating, handleRatingChange}) {
    return (
        // <>
        [1, 2, 3, 4, 5].map((star) =>
            <Button className={`p-2 rounded-full transition-colors 
            ${star <= rating ? 'text-green-400 hover:bg-green-600' : 
            'text-pink-400 hover:bg-green-300 hover:text-primary-foreground'}`} 
            variant="outline" size="icon"
            onClick={ handleRatingChange ? ()=>handleRatingChange(star) : null }
            >

                <StarIcon className={`w-6 h-6 ${star <= rating ? 'fill-green-400' : 
                    'fill-yellow-50' } `} />
            </Button>)
            
        // </> 
    )
}

export default StarRating;
//13:34