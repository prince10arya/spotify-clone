import * as RadixSlider from '@radix-ui/react-slider'

export default function 
Slider(

    {value=0.5, onChange,}:
    {
        value?:number;
        onChange?: (value: number) => void;
    }
    
) {

    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }
    
    return (
        <RadixSlider.Root
         className=' relative flex items-center select-none touch-none w-full h-10 '
         onValueChange={handleChange}
         defaultValue={[1]}
         value={[value]}
         step={0.1}
         max={1}
         aria-label='Volume'
        >
            <RadixSlider.Track
             className=' bg-neutral-600 relative grow rounded-full h-[3px] '
            >
             <RadixSlider.Range 
              className=' absolute bg-white rounded-full h-full cursor-pointer transition duration-200 hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]  '
             />

            </RadixSlider.Track>

        </RadixSlider.Root>
    )
}