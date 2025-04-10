import { Paper, Typography, Container, Box, Button } from '@mui/material'
import { CheckBox } from '@mui/icons-material'
import { useNavigate } from 'react-router';

export default function BuySuccess() {
    const navigate = useNavigate();
    return (
        <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 4,
                    width: '100%',
                    textAlign: "center",
                    my: 2,
                    height: '50vh',
                }}>
                <CheckBox sx={{ fontSize: 200, color: 'green' }} />

                <Box>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Thanh toán thành công
                    </Typography>
                    <Typography variant="body1">
                        Số trang bạn hiện có là 150
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '80%' }}>
                    <Button onClick={() => navigate('/buy')}>Tiếp tục mua trang</Button>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button onClick={() => navigate('/print')}>In tài liệu</Button>
                        <Button variant='contained' onClick={() => navigate('/')}>Trở về</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
