import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from "@mui/icons-material/Edit";
import SyncIcon from "@mui/icons-material/Sync";
import api from "../api/axios";

const PrinterDetail = () => {
  const { id } = useParams();
  const [printer, setPrinter] = useState(null);
  const navigate = useNavigate();
  const [editingFields, setEditingFields] = useState({
    name: false,
    campus: false,
    building: false,
    room: false,
    description: false,
    status: false,
  });
  const [updatedFields, setUpdatedFields] = useState({
    name: "",
    campus: "",
    building: "",
    room: "",
    description: "",
    status: "",
  });
  const buildingOptions_CS1 = {
    A1: "A1",
    A2: "A2",
    A3: "A3",
    A4: "A4",
    B1: "B1",
    B2: "B2",
    B4: "B4",
    C4: "C4",
    C5: "C5",
    C6: "C6",
  };
  const buildingOptions_CS2 = {
    "BK.B1": "BK.B1", 
    "BK.B2": "BK.B2",
    "BK.B3": "BK.B3",
    "BK.B4": "BK.B4"
  }
  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        const response = await api.get(`/api/v1/printer/${id}`, {});
        const { printerinfo } = response.data;
        setPrinter(printerinfo);
        setUpdatedFields({
          name: printerinfo.name,
          campus: printerinfo.campus,
          building: printerinfo.building,
          room: printerinfo.room,
          description: printerinfo.description,
          status: printerinfo.status,
        });
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchPrinter();
  }, [id]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateDriver = async () => {
    if (printer.update === true) {
      toast.success("Đã cập nhật bản mới nhất", {
        autoClose: 2000,
      });
    } else {
      setShowConfirm(true);
    }
  };
  const handleCancelUpdateDriver = () => {
    setShowConfirm(false);
  };
  const handleConfirmUpdateDriver = async () => {
    setShowConfirm(false);
    setLoading(true);

    setTimeout(async () => {
      try {
        await api.patch(`api/v1/printer/updatedriver/${id}`);
        const newPrinter = { ...printer, update: true };
        setPrinter(newPrinter);
        toast.success("Cập nhật driver thành công", { autoClose: 1500 });
      } catch (err) {
        console.error(err.message);
        toast.error("Có lỗi xảy ra khi cập nhật driver");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  const handleEdit = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  const handleSave = async () => {
    try {
      await api.put(`/api/v1/printer/${id}`, updatedFields);
      setPrinter({ ...printer, ...updatedFields });
      toast.success("Cập nhật thông tin thành công!", {
        autoClose: 1500,
      });
    } catch (err) {
      console.log(err.mesage);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    }
    setEditingFields({
      name: false,
      campus: false,
      building: false,
      room: false,
      description: false,
      status: false,
    });
  };

  if (!printer) {
    return <div></div>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          overflow: "hidden",
          boxShadow: 2,
          minWidth: 1000,
          borderRadius: "20px",
          margin: "20px auto",
          backgroundColor: "#f9f9f9",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              borderBottom: "1px solid #eee",
              backgroundColor: "#fff",
            }}>
            <img
              src={`/printers/${printer.image}`}
              alt="Printer"
              style={{ width: "385px", height: "385px", borderRadius: "8px" }}
            />
            <Typography
              variant="h6"
              sx={{ marginTop: 2, textAlign: "center", fontWeight: "bold" }}>
              {editingFields.name ? (
                <TextField
                  value={updatedFields.name}
                  onChange={(e) =>
                    setUpdatedFields({ ...updatedFields, name: e.target.value })
                  }
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              ) : (
                <>
                  {printer.name}
                  <IconButton
                    size="small"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleEdit("name")}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 2,
              padding: 3,
              width: "100%",
              backgroundColor: "#fff",
            }}>
            <Box sx={{ padding: 3 }}>
              <Box
                sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ width: "10%" }}>
                  <strong>Cơ sở:</strong>
                </Typography>
                <Typography sx={{ width: "90%" }}>
                  {editingFields.campus ? (
                    <FormControl
                      sx={{ width: "90%" }}
                      variant="outlined"
                      size="small">
                      <Select
                        value={updatedFields.campus}
                        onChange={(e) =>
                          setUpdatedFields({
                            ...updatedFields,
                            campus: e.target.value,
                          })
                        }>
                        <MenuItem value="CS1">CS1</MenuItem>
                        <MenuItem value="CS2">CS2</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <>
                      {printer.campus}
                      <IconButton
                        size="small"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleEdit("campus")}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Typography>
              </Box>
              <Box
                sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ width: "10%" }}>
                  <strong>Vị trí:</strong>
                </Typography>
                <Typography sx={{ width: "91%" }}>
                  {editingFields.building ? (
                    <Box sx={{ display: "flex", width: "90%" }}>
                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ flex: 1, marginRight: 1 }}
                      >
                        <InputLabel>Tòa</InputLabel>
                        {updatedFields.campus === "CS1" ? (
                          <Select
                            value={updatedFields.building}
                            label="Building"
                            onChange={(e) =>
                              setUpdatedFields({
                                ...updatedFields,
                                building: e.target.value,
                              })
                            }
                          >
                            {Object.keys(buildingOptions_CS1).map((key) => (
                              <MenuItem key={key} value={key}>
                                {buildingOptions_CS1[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <Select
                            value={updatedFields.building}
                            label="Building"
                            onChange={(e) =>
                              setUpdatedFields({
                                ...updatedFields,
                                building: e.target.value,
                              })
                            }
                          >
                            {Object.keys(buildingOptions_CS2).map((key) => (
                              <MenuItem key={key} value={key}>
                                {buildingOptions_CS2[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </FormControl>

                      <TextField
                        value={updatedFields.room}
                        onChange={(e) =>
                          setUpdatedFields({
                            ...updatedFields,
                            room: e.target.value,
                          })
                        }
                        variant="outlined"
                        size="small"
                        label="Phòng"
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  ) : (
                    <>
                      {printer.building} - {printer.room}
                      <IconButton
                        size="small"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleEdit("building")}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Typography>
              </Box>

              <Box
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "flex-start",
                }}>
                <Typography variant="subtitle1" sx={{ width: "10%" }}>
                  <strong>Mô tả:</strong>
                </Typography>
                <Typography sx={{ width: "90%" }}>
                  {editingFields.description ? (
                    <FormControl
                      sx={{ width: "90%" }}
                      variant="outlined"
                      size="small">
                      <TextField
                        value={updatedFields.description}
                        onChange={(e) =>
                          setUpdatedFields({
                            ...updatedFields,
                            description: e.target.value,
                          })
                        }
                        variant="outlined"
                        size="small"
                        label="Mô tả"
                        sx={{ flex: 1 }}
                      />
                    </FormControl>
                  ) : (
                    <>
                      {printer.description}
                      <IconButton
                        size="small"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleEdit("description")}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Typography>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center" }}>
                  <strong>Trạng thái: </strong>
                  <span style={{ marginLeft: "8px" }}>
                    {printer.status ? (
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        ĐANG HOẠT ĐỘNG
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        TẠM NGƯNG HOẠT ĐỘNG
                      </span>
                    )}
                  </span>
                </Typography>
              </Box>

              <div>
                <ToastContainer />
                <Box sx={{ marginBottom: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ paddingRight: 2 }}>Cập nhật:</strong>
                    <span style={{ marginLeft: "8px" }}>
                      {printer.update ? (
                        <span
                          style={{
                            color: "royalblue",
                            fontWeight: "bold",
                          }}
                        >
                          UP-TO-DATE
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#494848",
                            fontWeight: "bold",
                          }}
                        >
                          OUT-OF-DATE
                        </span>
                      )}
                    </span>
                    <IconButton
                      size="small"
                      sx={{ marginLeft: 1 }}
                      onClick={handleUpdateDriver}
                      title="Update Driver"
                    >
                      <SyncIcon fontSize="small" sx={{ color: "black" }} />
                    </IconButton>
                  </Typography>
                </Box>

                {showConfirm && (
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
                      <Typography
                        variant="h6"
                        sx={{ color: "#333", fontWeight: "bold" }}>
                        Bạn có chắc chắn update driver không?
                      </Typography>
                      <Box sx={{ marginTop: 2 }}>
                        <Button
                          variant="outlined"
                          sx={{ marginRight: 2 }}
                          onClick={handleCancelUpdateDriver}>
                          Trở về
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleConfirmUpdateDriver}>
                          Update
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}

                {loading && (
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
                      <img
                        src="../../public/loading-imange.gif"
                        alt="loading"
                        style={{
                          width: "80px",
                          height: "80px",
                          marginBottom: "20px",
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#333",
                          fontWeight: "bold",
                          fontSize: "18px",
                          letterSpacing: "0.5px",
                          lineHeight: 1.5,
                        }}>
                        Updating newest driver...
                      </Typography>
                    </Box>
                  </Box>
                )}
              </div>

              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center" }}>
                  <strong>Số lần sử dụng trong tháng:</strong>
                  {printer.printed_count}
                  {printer.monthlyUsage}
                </Typography>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center" }}>
                  <strong>Số trang đã in trong tháng:</strong>
                  {printer.paged_printed}
                  {printer.pagesPrinted}
                </Typography>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center" }}>
                  <strong>% Mực còn lại:</strong>
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={printer.printingInk}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ textAlign: "right", marginTop: 1, color: "#666" }}>
                  {printer.printingInk}%
                </Typography>
              </Box>
              {Object.values(editingFields).includes(true) && (
                <Button
                  sx={{ marginTop: 2 }}
                  variant="contained"
                  onClick={handleSave}>
                  Lưu
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            borderTop: "1px solid #eee",
            backgroundColor: "#f9f9f9",
          }}>
          <Button
            variant="contained"
            color="#555"
            onClick={() => navigate("/manageprinter")}
            sx={{
              backgroundColor: "#d0d0d0",
              borderRadius: "12px",
              color: "#000",
              borderColor: "#ccc",
              marginRight: 2,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}>
            Quay lại
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/printerlogs`)}
          >
            Lịch sử
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PrinterDetail;
