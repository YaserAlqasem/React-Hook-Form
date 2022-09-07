import { useState } from "react";
import uuid from "react-uuid";

const useList = (type, data, selectedRow, setData, setOpen) => {
  const [formData, setFormData] = useState({});
  const id = selectedRow?.tableData.id;

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = () => {
    if (type === "insert") {
      formData.id = uuid();
      setData([...data, formData]);
    } else if (type === "update") {
      let updatedData = data.map((item, index) => {
        if (index === id) {
          return {
            ...item,
            ...formData,
            toggleSelected: false,
          };
        }
        return item;
      });
      setData([...updatedData]);
    }
    setOpen(false);
  };

  const handleDeleteButton = () => {
    let updatedData = data.filter((_, index) => index !== id);
    setData([...updatedData]);
    setOpen(false);
  };

  return { formData, handleInputChange, handleFormSubmit, handleDeleteButton };
};

export default useList;
