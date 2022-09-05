import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./user.css";

let users = [
  {
    id: 1,
    firstName: "Yaser",
    lastName: "Alqasem",
  },
];

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
  },
];

const conditionalRowStyles = [
  {
    when: (row) => row.toggleSelected,
    style: {
      backgroundColor: "gray",
    },
  },
];

let selectedRow = undefined;
let isAddMode = true;

const User = () => {
  const [data, setData] = useState(users);
  const [open, setOpen] = useState(false);
  const [openConfirmation, setConfirmationOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const handleRowClick = (row) => {
    selectedRow = row;
    const updatedData = data.map((item) => {
      if (row !== item) {
        return {
          ...item,
          toggleSelected: false,
        };
      } else {
        return {
          ...item,
          toggleSelected: true,
        };
      }
    });

    setData(updatedData);
  };

  const onSubmit = (user) => {
    if (!isAddMode) {
      let updatedData = data.map((item) => {
        if (item.id === user.id) {
          return {
            ...item,
            firstName: user.firstName,
            lastName: user.lastName,
            toggleSelected: false,
          };
        }

        return item;
      });
      setData([...updatedData]);
    } else {
      let id = data[data.length - 1].id++;
      user.id = id;
      data.push(user);
      setData([...data]);
    }

    resetForm();
    setOpen(false);
  };

  const deleteRow = () => {
    let updatedData = data.filter((x) => x.id !== selectedRow.id);
    setData(updatedData);
    selectedRow = undefined;
  };

  const setFormFields = () => {
    setValue("id", selectedRow.id);
    setValue("firstName", selectedRow.firstName);
    setValue("lastName", selectedRow.lastName);
  };

  const resetForm = () => {
    selectedRow = undefined;
    setValue("firstName", "");
    setValue("lastName", "");
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          resetForm();
          isAddMode = true;
        }}
      >
        Add
      </button>
      <button
        disabled={!selectedRow}
        onClick={() => {
          setOpen(true);
          setFormFields();
          isAddMode = false;
        }}
      >
        Edit
      </button>
      <button disabled={!selectedRow} onClick={() => setConfirmationOpen(true)}>
        Delete
      </button>

      <DataTable
        title="Users"
        columns={columns}
        data={data}
        highlightOnHover
        pointerOnHover
        pagination
        onRowClicked={handleRowClick}
        conditionalRowStyles={conditionalRowStyles}
      />
      <Dialog open={open}>
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <label>First Name</label>
            <input
              {...register("firstName", {
                required: true,
              })}
            />
            {errors?.firstName?.type === "required" && (
              <p>This field is required</p>
            )}
            <label>Laste Name</label>
            <input
              {...register("lastName", {
                required: true,
              })}
            />
            {errors?.lastName?.type === "required" && (
              <p>This field is required</p>
            )}
            <input type="submit" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              resetForm();
              setOpen(false);
            }}
          >
            cancle
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>No</Button>
          <Button
            onClick={() => {
              deleteRow();
              setConfirmationOpen(false);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;
