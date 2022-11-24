import { useEffect, useMemo, useState } from "react";
// @mui
import { Card, Table, Stack, Button, MenuItem, Container, Typography, TableContainer, TablePagination } from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// mock
import CustomDialog from "../components/dialog/CustomDialog";
import * as yup from "yup";
import { changeCells, changeData } from "../_mock/changes";
import TableHeader from "../components/datatable/TableHeader";
import TableBodyContent from "../components/datatable/TableBodyContent";
import SearchBar from "../components/search-bar/SearchBar";
import { debounce } from "lodash";
import AddOrEditChange from "../components/pages-components/changes-page/AddOrEditChange";
import { CustomPopover } from "../components/popover/CustomPopover";

export default function ChangesPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("desc");

  const [orderBy, setOrderBy] = useState("");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [data, setData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    description: "",
    team: "",
    impact: "",
    dateP: "",
  });

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setData(changeData);
    }, 3000);
  };

  const resetParams = () => {
    setOpen(null);
    setIsEditMode(false);
    setIsDeleteMode(false);
    setInitialValues({});
  };

  const handleClickOpen = (type) => {
    setIsDialogOpen(true);
    switch (type) {
      case "edit":
        setIsEditMode(true);
        break;
      case "delete":
        setIsDeleteMode(true);
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    resetParams();
    setIsDialogOpen(false);
  };
  const handlePopupTitle = () => {
    console.log("okkk");
    if (isDeleteMode) return "Supprimer une change";
    else if (isEditMode) return "Modifier une change";
    else return "Ajouter une change";
  };

  const handleOpenMenu = (data, event) => {
    setInitialValues({ description: data.description, team: data.team, impact: data.impact, dateP: data.date });
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    resetParams();
  };

  const handleRequestSort = (key) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
    loadData();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setIsAllChecked(true);
      setSelectedRows(data);
      return;
    }
    setIsAllChecked(false);
    setSelectedRows([]);
  };

  const handleClick = (data) => {
    if (selectedRows.includes(data)) {
      let filteredArray = selectedRows.filter((item) => item.id !== data.id);
      setSelectedRows(filteredArray);
    } else {
      setSelectedRows([...selectedRows, data]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadData();
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    loadData();
  };

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = (event) => {
      handleFilterByName(event);
    };

    return debounce(changeHandler, 500);
  }, []);
  const handleFilterByName = (event) => {
    // console.log(event.target.value);
    loadData();
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const validationSchema = yup.object({
    description: yup.string("Enter your description").required("Description is required"),
    team: yup.string("Enter your team").required("Team is required"),
    impact: yup.string("Enter your impact").required("Impact is required"),
    dateP: yup.date().required("Date Required"),
  });

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste des Changes
          </Typography>
          <Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            Ajouter une Change
          </Button>
        </Stack>

        <Card>
          <SearchBar numSelected={selectedRows.length} filterName={filterName} onFilterName={debouncedChangeHandler} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  cells={changeCells}
                  hasCheckbox
                  hasActions
                  sortDirection={order}
                  sortAction={handleRequestSort}
                  sortBy={orderBy}
                  isChecked={isAllChecked}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBodyContent
                  data={data}
                  cells={changeCells}
                  isLoading={isLoading}
                  hasCheckbox
                  updateSelectedAction={handleClick}
                  hasActions
                  handleActionClick={handleOpenMenu}
                  selectedRows={selectedRows}
                />
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <CustomPopover open={open} handleCloseMenu={handleCloseMenu}>
        <MenuItem onClick={() => handleClickOpen("edit")}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem sx={{ color: "error.main" }} onClick={() => handleClickOpen("delete")}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </CustomPopover>
      <CustomDialog open={isDialogOpen} handleClose={handleClose} title={handlePopupTitle()}>
        <AddOrEditChange initialValues={initialValues} validationSchema={validationSchema} handleCancel={handleCancel} />
      </CustomDialog>
    </>
  );
}
