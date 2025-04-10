import { Paper, Typography, Container, Box, Button } from '@mui/material'
import { CheckBox } from '@mui/icons-material'
import { useNavigate } from 'react-router';

export default function Success() {
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
                        Gửi yêu cầu thành công
                    </Typography>
                    <Typography variant="body1">
                        Vui lòng chờ trong lúc máy in xử lý và thực hiện yêu cầu của bạn
                    </Typography>
                </Box>
                <Box sx={{display:'flex', justifyContent: 'space-around', width: '80%'}}>
                    <Button  onClick={() => navigate('/buy')}>Mua trang</Button>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button onClick={() => navigate('/print')}>Tiếp tục in</Button>
                        <Button variant='contained' onClick={() => navigate('/')}>Trở về</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
