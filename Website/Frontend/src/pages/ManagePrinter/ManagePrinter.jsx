import {
  Box,
  Container,
  IconButton,
  Paper,
  Switch,
  TextField,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, ArrowOutward } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";

const columns = (
  handlePrinterConfigure,
  openDeletePopup,
  handleEnableDisablePrinter
) => [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  { field: "brand", headerName: "Thương hiệu", flex: 1, headerAlign: "center" },
  { field: "model", headerName: "Mã máy", flex: 1, headerAlign: "center" },
  {
    field: "campus",
    headerName: "Cơ sở",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "building",
    headerName: "Toà nhà",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "room",
    headerName: "Phòng",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "action",
    headerName: "Hành động",
    width: 160,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Box>
        <Tooltip title="Xoá máy in" arrow>
          <IconButton color="error" onClick={() => openDeletePopup(params.row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xem thông tin máy in" arrow>
          <IconButton
            color="primary"
            onClick={() => handlePrinterConfigure(params.row)}>
            <ArrowOutward />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
  {
    field: "enableDisable",
    headerName: "Bật/Tắt",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Switch
        onChange={() => handleEnableDisablePrinter(params.row)}
        checked={params.row.enableDisable}
      />
    ),
  },
];

export default function ManagePrinter() {
  const [rows, setRows] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedPrinter, setSelectedPrinter] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrinters();
  }, []);

  const fetchPrinters = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/v1/printer");
      setRows(
        response.data.data.map((printer) => ({
          id: printer.id,
          brand: printer.brand,
          model: printer.model,
          campus: printer.location?.campus || "",
          building: printer.location?.building || "",
          room: printer.location?.room || "",
          enableDisable: printer.status,
        }))
      );
    } catch (error) {
      console.error(
        "Error fetching printers:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrinterConfigure = (row) => {
    navigate(`/printerinfo/${row.id}`);
    console.log("Configuring printer:", row);
  };

  const handleAddPrinter = async () => {
    try {
      navigate("/addprinter");
    } catch (error) {
      console.error("Error adding printer:", error);
    } finally {
      fetchPrinters();
    }
  };

  const openDeletePopup = (printer) => {
    setSelectedPrinter(printer);
    setDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setSelectedPrinter(null);
    setDeletePopupOpen(false);
  };

  const handleDeletePrinter = async () => {
    if (!selectedPrinter) return;

    setLoading(true);
    try {
      await api.delete(`api/v1/printer/${selectedPrinter.id}`);
      console.log("Printer deleted:", selectedPrinter);
      setRows(rows.filter((r) => r.id !== selectedPrinter.id));
      closeDeletePopup();
    } catch (error) {
      console.error(
        "Error deleting printer:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnableDisablePrinter = async (row) => {
    try {
      const response = await api.patch(`api/v1/printer/toggle/${row.id}`);

      if (response.status === 200) {
        console.log("Printer status updated to ", response.data.printer.status);

        setRows((prevRows) =>
          prevRows.map((printer) =>
            printer.id === row.id
              ? { ...printer, enableDisable: response.data.printer.status }
              : printer
          )
        );
      } else {
        console.warn("No status field returned in the response", response.data);
      }
    } catch (error) {
      console.error(
        "Error toggling printer status:",
        error.response?.data || error.message
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchText.toLowerCase()) ||
      row.brand.toLowerCase().includes(searchText.toLowerCase()) ||
      row.model.toLowerCase().includes(searchText.toLowerCase()) ||
      row.campus.toLowerCase().includes(searchText.toLowerCase()) ||
      row.building.toLowerCase().includes(searchText.toLowerCase()) ||
      row.room.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper
        elevation={8}
        sx={{
          marginTop: "5vh",
          width: "100%",
          height: "80vh",
          borderRadius: "20px",
          px: "16px",
          py: "24px",
          display: "flex",
          flexDirection: "column",
        }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginBottom: 2,
          }}>
          <TextField
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm..."
            sx={{
              height: "80%",
              flex: 0.8,
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                height: "100%",
                borderRadius: "12px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPrinter}
            sx={{
              flex: 0.2,
              marginLeft: 2,
              height: "80%",
              borderRadius: "12px",
              textTransform: "none",
            }}>
            Thêm máy in
          </Button>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns(
                handlePrinterConfigure,
                openDeletePopup,
                handleEnableDisablePrinter
              )}
              pagination
              sx={{ height: "100%", borderRadius: "12px" }}
            />
          </Box>
        )}
      </Paper>

      {isDeletePopupOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              userSelect: "none",
              maxWidth: "400px",
              textAlign: "center",
            }}>
            <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
              Bạn có chắc chắn xóa máy in không?
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="outlined"
                sx={{ marginRight: 2 }}
                onClick={closeDeletePopup}>
                Trở về
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeletePrinter}>
                Xác nhận
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
