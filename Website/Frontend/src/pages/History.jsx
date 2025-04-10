import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  MenuItem,
  Chip,
  Paper,
  TablePagination,
} from "@mui/material";
import api from "../api/axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [pageOrders, setPageOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/api/v1/printorder/get-print-order");
        const { data } = response.data;
        setOrders(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchPageOrders() {
      try {
        const response = await api.get("/api/v1/pageorder/get-page-order");
        const { data } = response.data;
        setPageOrders(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchPageOrders();
  }, []);

  const [view, setView] = useState("PrintOrder");

  const [printstudentID, setPrintStudentID] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedPrinter, setSelectedPrinter] = useState("Tất cả");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedPaperType, setSelectedPaperType] = useState("Tất cả");
  const [selectedTransactionTime, setSelectedTransactionTime] = useState("");
  const [studentID, setStudentID] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleResetFilters = () => {
    setSelectedStatus("Tất cả");
    setSelectedPrinter("Tất cả");
    setStartDate("");
    setEndDate("");
    setSelectedPaperType("Tất cả");
    setSelectedTransactionTime("");
    setSelectedPaperType("Tất cả");
    setSelectedTransactionTime("");
    setStudentID("");
  };

  const renderStatusChip = (status) => {
    let statusColor;

    if (status === "Hoàn thành") {
      statusColor = "success";
    } else if (status === "Đang in") {
      statusColor = "info";
    } else if (status === "Bị hủy") {
      statusColor = "error";
    } else {
      statusColor = "default";
    }

    return (
      <Chip
        label={status}
        color={statusColor}
        variant="outlined"
        size="small"
        sx={{
          fontWeight: "bold",
          width: "100px",
          justifyContent: "center",
        }}
      />
    );
  };

  const filteredPrintOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderStartDate = new Date(order.startTime.split(" ")[1]);
      const orderEndDate = new Date(order.endTime.split(" ")[1]);

      const adjustedEndDate = endDate
        ? new Date(new Date(endDate).setHours(0, 0, 0, 0))
        : null;
      const studentIDMatch =
        !printstudentID ||
        order.studentID.toString().includes(printstudentID.toString());

      const statusMatch =
        selectedStatus === "Tất cả" || order.status === selectedStatus;
      const printerMatch =
        selectedPrinter === "Tất cả" || order.printer === selectedPrinter;
      const startDateMatch =
        !startDate || orderStartDate >= new Date(startDate);
      const endDateMatch = !adjustedEndDate || orderEndDate <= adjustedEndDate;

      return (
        studentIDMatch &&
        statusMatch &&
        printerMatch &&
        startDateMatch &&
        endDateMatch
      );
    });
  }, [
    orders,
    selectedStatus,
    selectedPrinter,
    startDate,
    endDate,
    printstudentID,
  ]);

  const filteredPageOrders = useMemo(() => {
    return pageOrders.filter((order) => {
      const transactionTimeMatch =
        !selectedTransactionTime ||
        order.date.includes(selectedTransactionTime);

      const paperTypeMatch =
        selectedPaperType === "Tất cả" || order.paperType === selectedPaperType;

      const studentIDMatch =
        !studentID || order.StudentID.toString().includes(studentID.toString());

      return transactionTimeMatch && paperTypeMatch && studentIDMatch;
    });
  }, [pageOrders, selectedTransactionTime, selectedPaperType, studentID]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "white",
        maxWidth: "80%",
        margin: "24px auto",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button
          variant={view === "PrintOrder" ? "contained" : "outlined"}
          onClick={() => setView("PrintOrder")}
        >
          Đơn in
        </Button>
        <Button
          variant={view === "PageOrder" ? "contained" : "outlined"}
          onClick={() => setView("PageOrder")}
        >
          Thanh toán
        </Button>
      </Box>

      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
        marginBottom="40px">
        {view === "PrintOrder" ? "Tất cả đơn in" : "Tất cả đơn Page"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {view === "PrintOrder" && (
          <>
            <TextField
              label="Trạng thái"
              select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              sx={{ flex: 1, minWidth: 80 }} // Các trường filter chiếm không gian đều
            >
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="Hoàn thành">Hoàn thành</MenuItem>
              <MenuItem value="Đang in">Đang in</MenuItem>
              <MenuItem value="Bị hủy">Bị hủy</MenuItem>
            </TextField>
            <TextField
              label="Máy in"
              select
              value={selectedPrinter}
              onChange={(e) => setSelectedPrinter(e.target.value)}
              sx={{ flex: 1, minWidth: 80 }}
            >
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              {Array.from(new Set(orders.map((item) => item.printer))).map(
                (printer) => (
                  <MenuItem key={printer} value={printer}>
                    {printer}
                  </MenuItem>
                )
              )}
            </TextField>
            <TextField
              label="Ngày bắt đầu"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ flex: 1, minWidth: 80 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Ngày kết thúc"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ flex: 1, minWidth: 80 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Student ID"
              value={printstudentID}
              onChange={(e) => setPrintStudentID(e.target.value)}
              sx={{ flex: 1, minWidth: 120 }}
            />
          </>
        )}
        {view === "PageOrder" && (
          <>
            <TextField
              label="Loại giấy"
              select
              value={selectedPaperType}
              onChange={(e) => setSelectedPaperType(e.target.value)}
              sx={{ flex: 1, minWidth: 80 }}
            >
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="A4">A4</MenuItem>
              <MenuItem value="A3">A3</MenuItem>
            </TextField>
            <TextField
              label="Thời gian giao dịch"
              type="date"
              value={selectedTransactionTime}
              onChange={(e) => setSelectedTransactionTime(e.target.value)}
              sx={{ flex: 1, minWidth: 80 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Student ID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              sx={{ flex: 1, minWidth: 120 }}
            />
          </>
        )}
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleResetFilters}>
            Reset
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {view === "PrintOrder" ? (
                <>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Student</TableCell>
                  <TableCell align="center">Tên tài liệu</TableCell>
                  <TableCell align="center">Máy in</TableCell>
                  <TableCell align="center">Thời gian bắt đầu</TableCell>
                  <TableCell align="center">Thời gian kết thúc</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">Mã giao dịch</TableCell>
                  <TableCell align="center">Sinh viên</TableCell>
                  <TableCell align="center">Ngày giao dịch</TableCell>
                  <TableCell align="center">Loại giấy</TableCell>
                  <TableCell align="center">Số trang</TableCell>
                  <TableCell align="center">Giá</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {(view === "PrintOrder" ? filteredPrintOrders : filteredPageOrders)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id}>
                  {view === "PrintOrder" ? (
                    <>
                      <TableCell align="center">{order.id}</TableCell>
                      <TableCell align="center">{order.studentID}</TableCell>
                      <TableCell align="center">{order.documentName}</TableCell>
                      <TableCell align="center">{order.printer}</TableCell>
                      <TableCell align="center">{order.startTime}</TableCell>
                      <TableCell align="center">{order.endTime}</TableCell>
                      <TableCell align="center">
                        {renderStatusChip(order.status)}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="center">
                        {order.transactionCode}
                      </TableCell>
                      <TableCell align="center">{order.StudentID}</TableCell>
                      <TableCell align="center">{order.date}</TableCell>
                      <TableCell align="center">{order.paperType}</TableCell>
                      <TableCell align="center">{order.pages}</TableCell>
                      <TableCell align="center">{order.price}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[6, 8]}
        component="div"
        count={
          view === "PrintOrder"
            ? filteredPrintOrders.length
            : filteredPageOrders.length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default OrderTable;
