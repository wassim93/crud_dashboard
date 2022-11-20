import { filter } from "lodash";
import { useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// mock
import USERLIST from "../_mock/user";
import CustomDialog from "../components/dialog/CustomDialog";
import CancelButton from "../components/buttons/CancelButton";
import { Form, Formik } from "formik";
import * as yup from "yup";
import TextfieldWrapper from "../components/FormUI/Textfield";
import ButtonWrapper from "../components/FormUI/Buttons";
import DateTimePicker from "../components/FormUI/DatePicker";

import { changeCells, changeData } from "../_mock/changes";
import TableHeader from "../components/datatable/TableHeader";
import TableBodyContent from "../components/datatable/TableBodyContent";
import SearchBar from "../components/search-bar/SearchBar";

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

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

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (key) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };

  const handleSelectAllClick = (event) => {
    // console.log(event);
    if (event.target.checked) {
      setIsAllChecked(true);
      // const newSelecteds = changeData.map((n) => n.id);
      // console.log(newSelecteds);
      // // setSelected(newSelecteds);
      // setSelectedRow(newSelecteds);
      setSelectedRows(changeData);

      return;
    }
    setIsAllChecked(false);

    setSelectedRows([]);
  };

  const handleClick = (data) => {
    setSelectedRows([...selectedRows, data]);

    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    // }
    // setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const validationSchema = yup.object({
    description: yup.string("Enter your description").required("Description is required"),
    team: yup.string("Enter your team").required("Team is required"),
    impact: yup.string("Enter your impact").required("Impact is required"),
    dateP: yup.date().required("Date Required"),
  });

  const initialValues = {
    description: "",
    team: "",
    impact: "",
    dateP: "",
  };

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
          <SearchBar numSelected={selectedRows.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                  data={changeData}
                  cells={changeCells}
                  hasCheckbox
                  updateSelectedAction={handleClick}
                  hasActions
                  handleActionClick={handleOpenMenu}
                  isAllSelected={isAllChecked}
                />
                {/* <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? "Yes" : "No"}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody> */}

                {/* {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <CustomDialog open={isDialogOpen} handleClose={handleClose} title={"Ajouter un change"}>
        <Formik
          initialValues={{
            ...initialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <Stack spacing={3} mx={2} my={2}>
              <TextfieldWrapper name="description" label="Description" multiline rows={6} />
              <TextfieldWrapper name="team" label="Team" />
              <TextfieldWrapper name="impact" label="Impact" />
              <DateTimePicker name="dateP" />

              <Stack direction="row" justifyContent="end" spacing={2}>
                <CancelButton text="Cancel" handleClick={handleCancel} />
                <ButtonWrapper
                  sx={{
                    background: "#43C58A",
                    "&:hover": {
                      background: "#3AE6A2",
                    },
                  }}
                >
                  Save
                </ButtonWrapper>
              </Stack>
            </Stack>
          </Form>
        </Formik>
      </CustomDialog>
    </>
  );
}
