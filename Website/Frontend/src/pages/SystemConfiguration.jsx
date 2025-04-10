import { Container, TextField, Button, Typography, Box } from '@mui/material';

function ConfigurationPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Chiều cao 100% màn hình
        backgroundColor: '#f5f5f5', // Màu nền nhẹ để tạo sự tương phản
        padding: 2,
      }}
    >
      <Container
        sx={{
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)', // Đổ bóng đậm hơn
          backgroundColor: '#fff',
          maxWidth: '800px',
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 4 }}
        >
          Quản lý cấu hình máy in
        </Typography>

        {/* Layout Wrapper */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            margin: "5vh 0"
          }}
        >
          {/* Illustration Section */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              maxWidth: "60%"
            }}
          >
            <img
              src="/public/systemconfiguration.png"
              alt="Illustration"
              style={{ width: '100%', maxWidth: '400px' }}
            />
          </Box>

          {/* Form Section */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '400px',
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Định dạng cho phép
              </Typography>
              <TextField
                fullWidth
                label="Định dạng cho phép"
                variant="outlined"
                placeholder="pdf, docx"
              />
            </Box>

            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Số trang mặc định cấp cho mỗi sinh viên
              </Typography>
              <TextField
                fullWidth
                label="Số trang"
                variant="outlined"
                type="number"
                defaultValue={200}
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
              <Button variant="contained" color="success">
                Lưu
              </Button>
              <Button variant="outlined" color="primary">
                Chỉnh sửa
              </Button>
              <Button variant="text" color="error">
                Hủy
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ConfigurationPage;
