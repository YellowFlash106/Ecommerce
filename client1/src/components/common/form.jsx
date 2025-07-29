import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SelectContent } from "../ui/select";



function CommonForm({ 
    formControls, 
    formData ,
    setFormData,
    onSubmit , 
    buttonText, 
    isBtnDisabled }) {

    function renderInputsBCT(getControlItem) {
        let e = null;
        const value = formData[getControlItem.name] || ''


        switch (getControlItem.componentType) {
        case 'input':
        e = (<Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) => setFormData({
            ...formData,
            [getControlItem.name]: event.target.value,
            })}
            />
            )
            break;

        case 'select':
        e = (
            <Select onValueChange={(value)=>setFormData({
                ...formData,
                [getControlItem.name]: value
            })
            } value={value}>
            <SelectTrigger className="w-full">
             <SelectValue placeholder={getControlItem.label} />
             </SelectTrigger>

             <SelectContent>{
               getControlItem.options &&
               getControlItem.options.length > 0 ?
               getControlItem.options.map(optionItem => <SelectItem value={optionItem.id} key={optionItem.id}>
               {optionItem.label}</SelectItem>) : null
            }
             </SelectContent>
            </Select>
            )
            break;

        case 'textarea':
        e = (
            <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) => setFormData({
            ...formData,
            [getControlItem.name]: event.target.value,
            })}
                />
             )
            break;

        default:
        e = (<Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) => setFormData({
            ...formData,
            [getControlItem.name]: event.target.value,
            })}
            />
            )
            break;
        }
          return e
    }
    return (
        <>
         <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
         {
            formControls.map((controlItem) =>( <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1"> {controlItem.label}</Label>
            {
                renderInputsBCT(controlItem)}
            </div>
            ))}
         </div>
         <Button 
        //  disabled={isBtnDisabled} // bcoz bran and category are not fullfilling 
          className='mt-2 w-full' type="submit">
            {buttonText || 'Submit'}
         </Button>
         </form>
        </>
    );
}

export default CommonForm;