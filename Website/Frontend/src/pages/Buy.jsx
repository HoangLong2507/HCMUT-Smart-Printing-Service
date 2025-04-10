import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
  Divider,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
} from "@mui/material";

const paperPrice = {"A2": 1000, "A3": 600, "A4": 400, "A5": 300};

const PurchasePage = () => {
  const navigate = useNavigate();
  const [selectedPaper, setSelectedPaper] = useState("A4");
  const [selectedTab, setSelectedTab] = useState("BKPay");
  const [pages, setPages] = useState(20);
  
  const handlePaperChange = (event) => {
    setSelectedPaper(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, fontFamily: "Arial, sans-serif" }}>
      <Grid container spacing={4}>
        {/* Purchase Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Thông tin mua
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Loại giấy
              </Typography>
              <Select
                fullWidth
                value={selectedPaper}
                onChange={handlePaperChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="A3">A2</MenuItem>
                <MenuItem value="A3">A3</MenuItem>
                <MenuItem value="A4">A4</MenuItem>
                <MenuItem value="A5">A5</MenuItem>
              </Select>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Số lượng trang
              </Typography>
              <TextField
                type="number"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                inputProps={{ min: 1, max: 500 }}
                fullWidth
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" align="center" gutterBottom>
              Hóa đơn
            </Typography>
            <Box sx={{ px: 2, py: 1, backgroundColor: "#f9f9f9", borderRadius: 1 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Loại giấy</Typography>
                <Typography>{selectedPaper}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Số lượng</Typography>
                <Typography>{pages}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Đơn giá</Typography>
                <Typography>{paperPrice[selectedPaper]}</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" mt={1} fontWeight="bold">
                <Typography>Tổng cộng</Typography>
                <Typography>{(paperPrice[selectedPaper] * pages).toLocaleString()} VND</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Payment Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Phương thức thanh toán
            </Typography>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              textColor="primary"
              indicatorColor="primary"
              sx={{ mb: 3 }}
            >
              <Tab value="Momo" label="Momo" />
              <Tab value="BKPay" label="BKPay" />
              <Tab value="Ngân hàng" label="Ngân hàng" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {selectedTab === "Momo" && (
                <Typography align="center">Thanh toán qua Momo</Typography>
              )}
              {selectedTab === "BKPay" && (
                <Typography align="center">Thanh toán qua BKPay</Typography>
              )}
              {selectedTab === "Ngân hàng" && (
                <Typography align="center">Thanh toán qua Ngân hàng</Typography>
              )}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>MSSV</Typography>
                <Typography><b>2223456</b></Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Họ và Tên</Typography>
                <Typography><b>Trần Văn Đại</b></Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Email sinh viên</Typography>
                <Typography><b>dai.tranvan@hcmut.edu.vn</b></Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Mã lớp</Typography>
                <Typography><b>CC22KHM1</b></Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Số điện thoại</Typography>
                <Typography><b>0989112222</b></Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Khoa</Typography>
                <Typography><b>Khoa học và Kỹ thuật máy tính</b></Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography>Mã QR</Typography>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&size=150x150"
                  alt="QR Code"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          Trở lại
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/buysuccess")}
        >
          Xác nhận
        </Button>
      </Box>
    </Container>
  );
};

export default PurchasePage;
