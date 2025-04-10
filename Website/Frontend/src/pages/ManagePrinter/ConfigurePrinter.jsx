import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddPrinter() {
  const [ID, setID] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const navigate = useNavigate();

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      const newPrinter = {
        ID,
        model,
        brand,
        campus,
        building,
        room,
      };

      // Log the data for debugging
      console.log("Sending printer data to server:", newPrinter);

      // Make the API call to add the printer
      const response = await axios.post("/api/v1/printer", newPrinter);

      // Handle success
      if (response.data.status === "success") {
        console.log("Printer added successfully:", response.data.data);
        alert("Printer added successfully!");
      } else {
        console.error("Error adding printer:", response.data.message);
        alert("Failed to add printer. Please try again.");
      }
    } catch (error) {
      console.error(
        "Failed to add printer:",
        error.response?.data?.message || error.message
      );
      alert("An error occurred while adding the printer.");
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {/* Main box  */}
      <Paper
        elevation={8}
        sx={{
          marginTop: "5vh",
          width: {
            xs: "90vw",
            md: "50vw",
          },
          height: "80vh",
          borderRadius: "20px",
          px: "2vw",
          py: "3vh",
          display: "flex",
          flexDirection: "column",
        }}>
        {/* Add Printer Title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            width: "70%",
            height: "18vh",
          }}>
          <Typography fontWeight="bold" fontSize="6vh" color="primary.dark">
            Chỉnh sửa máy in
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column wrap",
            my: "2vh",
            gap: "2vh",
          }}>
          {/* ID TextField */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}>
            <TextField
              label="Code number (ID)"
              variant="outlined"
              fullWidth
              value={ID}
              onChange={handleIDChange}
              slotProps={{
                input: { style: { borderRadius: "12px" } },
              }}
            />
          </Box>

          {/* Brand TextField */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}>
            <TextField
              label="Brand"
              variant="outlined"
              fullWidth
              value={brand}
              onChange={handleBrandChange}
              slotProps={{
                input: { style: { borderRadius: "12px" } },
              }}
            />
          </Box>

          {/* Model TextField */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}>
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              value={model}
              onChange={handleModelChange}
              slotProps={{
                input: { style: { borderRadius: "12px" } },
              }}
            />
          </Box>

          {/* Location TextFields */}
          <CampusBuildingRoomSelector />

          {/* Confirm/Cancel Button */}
          <Box
            sx={{
              width: "70%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexFlow: "row wrap",
              flexGrow: 4,
            }}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "primary.main",
                color: "white",
                width: "48%",
                height: "100%",
                fontSize: "14px",
                fontWeight: "bold",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
              }}
              onClick={() => {
                navigate("/manageprinter");
              }}>
              Trở về
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary.main"
              sx={{
                textTransform: "none",
                backgroundColor: "primary.main",
                color: "white",
                width: "48%",
                height: "100%",
                fontSize: "14px",
                fontWeight: "bold",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
              }}>
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

{
  /* Select Printer Location */
}
const CampusBuildingRoomSelector = () => {
  const [campus, setCampus] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");

  // Define the options
  const campusOptions = ["1", "2"];
  const buildingOptions = {
    1: ["A4", "B4", "B6"],
    2: ["H6", "H4"],
  };
  const roomOptions = {
    A4: ["110"],
    B4: ["102", "104"],
    B6: ["308"],
    H6: ["604", "602"],
    H4: ["204"],
  };

  // Handlers for dropdowns
  const handleCampusChange = (event) => {
    setCampus(event.target.value);
    setBuilding("");
    setRoom("");
  };

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
    setRoom("");
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mx: "auto",
        width: "70%",
        justifyContent: "space-betwwen",
      }}>
      {/* Campus Selector */}
      <TextField
        label="Campus"
        variant="outlined"
        select
        fullWidth
        value={campus}
        onChange={handleCampusChange}
        slotProps={{
          input: {
            style: { borderRadius: 12 },
          },
        }}>
        {campusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Building Selector */}
      <TextField
        label="Building"
        variant="outlined"
        select
        fullWidth
        value={building}
        onChange={handleBuildingChange}
        disabled={!campus}
        slotProps={{
          input: {
            style: { borderRadius: 12 },
          },
        }}>
        {(buildingOptions[campus] || []).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Room Selector */}
      <TextField
        label="Room"
        variant="outlined"
        select
        fullWidth
        value={room}
        onChange={handleRoomChange}
        disabled={!building}
        slotProps={{
          input: {
            style: { borderRadius: 12 },
          },
        }}>
        {(roomOptions[building] || []).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
