import DataTable from "react-data-table-component";

const ReactDataTable = ({ columns, data, handleRowClick }) => {
  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        backgroundColor: "gray",
      },
    },
  ];

  const dataWithIdentifier = data.map((item, index) => ({
    ...item,
    tableData: { id: index++ },
  }));

  return (
    <DataTable
      columns={columns}
      data={dataWithIdentifier}
      highlightOnHover
      pointerOnHover
      pagination
      onRowClicked={handleRowClick}
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default ReactDataTable;
