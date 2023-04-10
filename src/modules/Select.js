import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { DropdownItem, DropdownLoadMore, DropdownStyle, SelectContainer, SelectLabelButton } from "./Select.style";

const Select = ({ label, values, onChange, onLoadMore }) => {
    const [currentValue, setCurrentValue] = useState('');
    const [open, setOpen] = useState(false);

    const ref = useRef(null);
    const refLoadMore = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && !refLoadMore.current.contains(event.target)) {
       handleClose()
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [  ]);

const handleOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };
    const handleValueChange = (value) => {
    setCurrentValue(value);
    };
    const handleChange = (value) => {
    handleValueChange(value.name);
    // call method, if it exists
    if (onChange) onChange(value);
    // close, after all tasks are finished
    handleClose();
    };

    const handleLoadMore = ()=> {
      onLoadMore()
    }
    return (
        <SelectContainer>
          <SelectLabelButton onClick={handleOpen} ref={ref}>
            {currentValue !== "" ? currentValue : label}
          </SelectLabelButton>
          <DropdownStyle isVisible={open}>
            {values.map((value, index) => (
              <DropdownItem
                onClick={() => handleChange(value)}
               // active={value === currentValue}
                key={index}
              >
                {value.name}
              </DropdownItem>
            ))}
            <DropdownLoadMore
                 onClick={() => handleLoadMore()}
                 ref={refLoadMore}
              >
                {'Load more'}
              </DropdownLoadMore>
          </DropdownStyle>
        </SelectContainer>
      );

}

export default Select