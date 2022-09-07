import { useForm } from "react-hook-form";
import useList from "../../Hooks/useList";

const UserForm = ({ type, data, selectedRow, setData, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: selectedRow?.id,
      firstName: selectedRow?.firstName,
      lastName: selectedRow?.lastName,
    },
  });

  const { handleInputChange, handleFormSubmit } = useList(
    type,
    data,
    selectedRow,
    setData,
    setOpen
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input type="hidden" {...register("id")} />
      <label>First Name</label>
      <input
        {...register("firstName", {
          required: true,
        })}
        onChange={handleInputChange}
      />
      {errors?.firstName?.type === "required" && <p>This field is required</p>}
      <label>Laste Name</label>
      <input
        {...register("lastName", {
          required: true,
        })}
        onChange={handleInputChange}
      />
      {errors?.lastName?.type === "required" && <p>This field is required</p>}
      <input type="submit" />
    </form>
  );
};

export default UserForm;
