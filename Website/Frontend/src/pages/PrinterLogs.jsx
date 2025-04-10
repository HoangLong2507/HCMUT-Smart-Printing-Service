import { useEffect,useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Pagination,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";


export default function Dashboard() {
  const { userInfo } = useAuth();
  console.log(userInfo);

  const [logs,setLogs]= useState([]);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await api.get(`/api/v1/printer/getlog/all`);
        const { printerlogs } = response.data;
        setLogs(printerlogs);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchLog();
  }, []);
  const [actionFilter, setActionFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const filteredLogs = logs.filter((log) => {
    const logdate = log.date.split(' ')[1];
    const convertDateFormat = (dateString) => {
      const date = new Date(dateString);
      
      const day = date.getDate(); 
      const month = date.getMonth() + 1; 
      const year = date.getFullYear(); 
          return `${day}/${month}/${year}`;
    };

    const matchesAction = actionFilter ? log.action === actionFilter : true;
    const matchesAdmin = adminFilter ? log.Updatedby === adminFilter : true;
    const matchesDate = dateFilter ? convertDateFormat(dateFilter)===logdate : true;
    return matchesAction && matchesAdmin && matchesDate;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedLogs = filteredLogs.slice(startIndex, endIndex);

  function getColor(action) {
    switch (action) {
      case "Add":
        return "green";
      case "Edit":
        return "gold";
      case "Delete":
        return "firebrick";
      case "Update": 
        return "blue"
      default:
        return "black";
    }
  }

  const handleReset = () => {
    setActionFilter("");
    setAdminFilter("");
    setDateFilter("");
  };

  if (!userInfo) {
    return (
      <Container>
        <Typography variant="h4" color="error">
          Please login to access this page
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5, minWidth: "45%", }}>
      <Box
        sx={{
          border: "2px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lịch sử quản lý máy in
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2,
            alignItems: "center",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Action</InputLabel>
            <Select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              label="Action"
            >
              <MenuItem value="Add">Add</MenuItem>
              <MenuItem value="Edit">Edit</MenuItem>
              <MenuItem value="Delete">Delete</MenuItem>
              <MenuItem value="Update">Update</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Admin</InputLabel>
            <Select
              value={adminFilter}
              onChange={(e) => setAdminFilter(e.target.value)}
              label="Admin"
            >
              <MenuItem value="admin1">admin1</MenuItem>
              <MenuItem value="admin2">admin2</MenuItem>
              <MenuItem value="admin3">admin3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Date"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            color="error"
            onClick={handleReset}
            sx={{ height: "100%" }}
          >
            Reset
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Printer</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>UpdatedBy</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Note</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayedLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    sx={{ color: getColor(log.action), fontWeight: "bold" }}
                  >
                    {log.action}
                  </TableCell>
                  <TableCell>{log.printer}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.Updatedby}</TableCell>
                  <TableCell>{log.description||""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
}
