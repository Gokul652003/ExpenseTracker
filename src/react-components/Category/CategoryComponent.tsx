import { useState } from 'react';
import categoryIcon from './assets/CategoryIcon.svg';
import closeIcon from './assets/closeIcon.svg';

interface CategoryComponentProps {
  color?: string;
  label?: string;
}
export const CategoryComponent = ({
  label = 'Food',
}: CategoryComponentProps) => {
  const [inputColor, setInputColor] = useState<string>(
    'rgba(169, 169, 169, 1)',
  );
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
          >
            <input
              type="color"
              className="rounded w-3.5 h-3.5 opacity-0 block"
              onChange={(e) => {
                setInputColor(e.target.value);
              }}
            />
          </div>
          <div className="flex ">
            <div
              className="font-normal text-secondary text-base outline-none"
              contentEditable={true}
            >
              {label}
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={closeIcon} />
      </div>
    </div>
  );
};
