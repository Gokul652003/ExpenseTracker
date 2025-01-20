import React, { useState, useEffect, useRef } from 'react';
import downArrow from '@/assets/CaretDown.svg';

interface Option {
  label: string;
  value: string;
  colour?: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

export const SelectBox: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  value,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectBoxBg = options.filter((item) => item.value == value);
  console.log(selectBoxBg[0]);

  const handleOptionClick = (
    selectedValue: Option,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the parent div
    onChange(selectedValue.value);

    // setSlectBoxBg(selectedValue?.colour??'');
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown open/close
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} style={{ position: 'relative' }}>
      <div
        onClick={toggleDropdown} // Toggle open/close on clicking the select
        className="flex px-4 py-1 rounded-full text-textColor justify-between items-center cursor-pointer"
        style={{
          backgroundColor:
            options.find((opt) => opt.value === value)?.colour || '#9D35A3',
        }}
      >
        <div>{value || placeholder || 'Select'}</div>
        <div>
          <img src={downArrow} alt="dropdown" />
        </div>
      </div>
      {isOpen && (
        <div className="flex items-center">
          <ul
            className="bg-tableBgDark p-4 rounded-2xl"
            style={{
              position: 'absolute',
              top: '130%',
              left: 0,
              right: 0,
              margin: 0,
              listStyle: 'none',
              zIndex: 100,
            }}
          >
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={(event) => handleOptionClick(option, event)}
                  className="bg-[#AC6F6F] px-4 py-1 rounded-full text-textColor hover:bg-opacity-50 cursor-pointer"
                  style={{
                    backgroundColor: option.colour,
                  }}
                >
                  {option.label}
                </li>
              ))}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};
