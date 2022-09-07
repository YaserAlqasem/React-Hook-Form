import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import "./styled.css";
import UserForm from "./form";
import useList from "../../Hooks/useList";
import ReactDataTable from "../../Components/DataTable";
import uuid from "react-uuid";

const actions = {
  insert: "insert",
  update: "update",
};

let users = [
  {
    id: uuid(),
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

const User = () => {
  const [data, setData] = useState(users);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [openConfirmation, setConfirmationOpen] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    handleSelectedRow(row);
  };

  const handleSelectedRow = (row) => {
    const id = row?.tableData.id;
    const updatedData = data.map((item, index) => {
      if (id !== index) {
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

  const handleAddButton = () => {
    setOpen(true);
    setAction(actions.insert);
    setSelectedRow(undefined);
  };

  const handleEditButton = () => {
    setOpen(true);
    setAction(actions.update);
  };

  const { handleDeleteButton } = useList(
    action,
    data,
    selectedRow,
    setData,
    setConfirmationOpen
  );

  const handleCancelButton = () => {
    setOpen(false);
    handleSelectedRow(undefined);
    setSelectedRow(undefined);
  };

  return (
    <>
      <button onClick={handleAddButton}>Add</button>
      <button disabled={!selectedRow} onClick={handleEditButton}>
        Edit
      </button>
      <button disabled={!selectedRow} onClick={() => setConfirmationOpen(true)}>
        Delete
      </button>

      {/* <DataTable
        title="Users"
        columns={columns}
        data={data}
        highlightOnHover
        pointerOnHover
        pagination
        onRowClicked={handleRowClick}
        conditionalRowStyles={conditionalRowStyles}
      /> */}
      <ReactDataTable
        columns={columns}
        data={data}
        handleRowClick={handleRowClick}
      />
      <Dialog open={open}>
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <UserForm
            type={action}
            data={data}
            selectedRow={selectedRow}
            setData={setData}
            setOpen={setOpen}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelButton}>cancle</Button>
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
          <Button onClick={handleDeleteButton} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;
