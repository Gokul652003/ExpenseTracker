import { useState } from 'react';
import categoryIcon from './assets/CategoryIcon.svg';
import closeIcon from './assets/closeIcon.svg';

interface CategoryComponentProps {
  color?: string;
  label?: string;
}
export const CategoryComponent = ({
  color = 'grey',
  label = 'Food',
}: CategoryComponentProps) => {
  const [inputColor,setInputColor]=useState("rgba(169, 169, 169, 1)");
  const [isContentEditable,setIsContentEditable]=useState(false);
  console.log(isContentEditable)
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1.5 items-center">
        <div>
          <img src={categoryIcon} />
        </div>
        <div className="rounded-lg p-2 flex gap-1.5 items-center">
          <div
            className="rounded w-3.5 h-3.5"
            style={{ backgroundColor: inputColor }}
          ><input type='color' className="rounded w-3.5 h-3.5 opacity-0 block" onChange={(e)=>{setInputColor(e.target.value)}}/></div>
          <div className="flex ">
            <div className="font-normal text-secondary text-base" contentEditable={isContentEditable} onClick={()=>setIsContentEditable(!isContentEditable)} >{label}</div>
          </div>
        </div>
      </div>
      <div>
        <img src={closeIcon} />
      </div>
    </div>
  );
};
