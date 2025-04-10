import {
  Box,
  Container,
  Paper,
  ListItemText,
  ListItem,
  List,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { AttachMoney, People, Print } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useTheme } from "@emotion/react";

export default function AdminDashboard() {
  return (
    <Container
      sx={{
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {/* Main box */}
      <Paper
        elevation={8}
        sx={{
          marginTop: "3vh",
          height: "85vh",
          width: "100%",
          borderRadius: "20px",
          px: "10px",
          py: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "1vw",
        }}>
        {/* Info and graphs */}
        <Box
          sx={{
            display: "flex",
            width: "70%",
            height: "100%",
            flexFlow: "column wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1vw",
          }}>
          <Box
            sx={{
              width: "100%",
              flexGrow: 1,
              borderRadius: "20px",
              px: "5px",
              display: "flex",
              flexDirection: "column",
            }}>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
              }}>
              <CountWidget
                IconComponent={People}
                firstText="Truy cập hôm nay"
                secondText="231"
              />
              <CountWidget
                IconComponent={Print}
                firstText="Số lần in hôm nay"
                secondText="38"
              />
              <CountWidget
                IconComponent={AttachMoney}
                firstText="Số giao dịch hôm nay"
                secondText="12"
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              flexGrow: 1,
              borderRadius: "20px",
              px: "5px",
            }}>
            <WeeklyPrintChart />
          </Box>
          <Box
            sx={{
              width: "100%",
              flexGrow: 1,
              borderRadius: "20px",
              px: "5px",
            }}>
            <MonthlyPrintChart />
          </Box>
        </Box>

        {/* PrinterStatus */}
        <Box
          sx={{
            display: "flex",
            width: "30%",
            height: "100%", // Ensuring full height
            alignItems: "center",
            flexGrow: 1,
          }}>
          <PrinterStatus />
        </Box>
      </Paper>
    </Container>
  );
}

const PrinterStatus = () => {
  const [printerDetails, setPrinterDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPrinters = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/v1/printer");
      const printers = response.data.data;

      const ids = printers.map((printer) => printer.id);

      const details = {};
      await Promise.all(
        ids.map(async (id) => {
          try {
            const detailResponse = await api.get(`/api/v1/printer/${id}`, {});
            const printer = detailResponse.data.printerinfo;

            details[id] = printer;
          } catch (error) {
            console.error(
              `Error fetching details for printer ${id}:`,
              error.response?.data || error.message
            );
          }
        })
      );

      setPrinterDetails(details);
      setLoading(false);
      console.log("Printer details fetched:", printerDetails);
      console.log();
    } catch (error) {
      console.error(
        "Error fetching printers:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchPrinters();
  }, []);

  const sortedPrinters = Object.entries(printerDetails)
    .map(([id, details]) => ({ id, ...details }))
    .sort((a, b) => a.printingInk - b.printingInk);

  return (
    <Paper
      elevation={8}
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto", // Enable scrolling
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar
        },
      }}>
      <Typography
        marginTop="2vh"
        fontSize="1.4rem"
        fontWeight="bold"
        textAlign="center"
        color="primary.dark"
        sx={{ marginBottom: "16px" }}>
        Tình trạng máy in
      </Typography>
      {!loading ? (
        <List>
          {sortedPrinters.map((printer) => (
            <ListItem
              key={printer.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "16px",
                alignItems: "center",
                gap: "5px",
              }}>
              <Box
                sx={{
                  width: "30%",
                }}>
                <img
                  src={`../../printers/${printer.image}`}
                  alt="Printer"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginRight: "16px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "70%",
                }}>
                <ListItemText
                  primary={printer.name}
                  secondary={`Tình trạng: ${
                    printer.status ? "BẬT" : "TẮT"
                  }, Địa điểm: ${printer.campus} - ${printer.building} - ${
                    printer.room
                  }`}
                  sx={{
                    textAlign: "left",
                    "& .MuiListItemText-primary": {
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "primary.main",
                    },
                    "& .MuiListItemText-secondary": {
                      fontSize: "0.6rem",
                    },
                  }}
                />
                <Box>
                  <Typography fontSize="0.6rem">
                    Lượng mực còn lại: {printer.printingInk}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={printer.printingInk}
                    sx={{ width: "100%", marginTop: "8px" }}
                  />
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </Box>
      )}
    </Paper>
  );
};

const CountWidget = ({ IconComponent, firstText, secondText }) => {
  return (
    <Paper
      elevation={8}
      sx={{
        px: 2,
        py: 2,
        width: "30%",
        display: "flex",
        flexDirection: "row",
        borderRadius: "20px",
        alignItems: "center",
      }}>
      {/* Left side - Icon */}
      <Box sx={{ width: "30%", display: "flex", justifyContent: "center" }}>
        <IconComponent fontSize="large" />
      </Box>

      {/* Right side - Text */}
      <Box sx={{ width: "70%" }}>
        <Typography fontWeight="bold" fontSize="0.8rem" color="primary.dark">
          {firstText}
        </Typography>
        <Typography
          fontWeight="bold"
          fontSize="0.8rem"
          color="primary.main"
          sx={{ marginTop: "8px" }}>
          {secondText}
        </Typography>
      </Box>
    </Paper>
  );
};

const WeeklyPrintChart = () => {
  const theme = useTheme();

  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ Nhật",
  ];
  const counts = [43, 54, 22, 38, 0, 0, 0];

  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography
        fontSize="1rem"
        fontWeight="bold"
        color="primary.dark"
        sx={{ my: "16px" }}>
        Số lượt in trong tuần
      </Typography>

      <BarChart
        height={180}
        xAxis={[{ scaleType: "band", data: days }]}
        series={[{ data: counts, color: theme.palette.primary.main }]}
      />
    </Paper>
  );
};

const MonthlyPrintChart = () => {
  const theme = useTheme();

  const days = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const counts = [
    930, 1020, 1210, 1140, 1021, 958, 920, 851, 872, 753, 642, 1164,
  ];

  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography
        fontSize="1rem"
        fontWeight="bold"
        color="primary.dark"
        sx={{ my: "16px" }}>
        Số lượt in trong tháng
      </Typography>

      <BarChart
        height={180}
        xAxis={[{ scaleType: "band", data: days }]}
        series={[{ data: counts, color: theme.palette.primary.main }]}
      />
    </Paper>
  );
};
