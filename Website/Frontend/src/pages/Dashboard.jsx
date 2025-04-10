import { Container, Typography, Box, Paper, Table, TableCell, TableRow, TableBody,TableHead, TableContainer } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const logs = [ // sample logs
  {
    action: "Add",
    id: 'HL40',
    printer: "HP LaserJet Pro M404dn",
    date: "2021-10-09 10:00:00",
  },
  {
    action: "Edit",
    id: 'CP00',
    printer: "Canon Pixma",
    date: "2021-10-10 12:00:00",
  },
  {
    action: "Delete",
    id: 'EL50',
    printer: "Epson L3150",
    date: "2021-10-11 14:00:00",
  },
  {
    action: "Add",
    id: 'HD24',
    printer: "HP DeskJet 2330",
    date: "2021-10-12 16:00:00",
  },
  {
    action: "Add",
    id: 'HL41',
    printer: "HP LaserJet Pro M404dn",
    date: "2021-10-09 10:00:00",
  },
  {
    action: "Edit",
    id: 'CP01',
    printer: "Canon Pixma",
    date: "2021-10-10 12:00:00",
  },
  {
    action: "Delete",
    id: 'EL51',
    printer: "Epson L3150",
    date: "2021-10-11 14:00:00",
  },
  {
    action: "Add",
    id: 'HD25',
    printer: "HP DeskJet 2330",
    date: "2021-10-12 16:00:00",
  },
  {
    action: "Add",
    id: 'HL42',
    printer: "HP LaserJet Pro M404dn",
    date: "2021-10-09 10:00:00",
  },
  {
    action: "Edit",
    id: 'CP02',
    printer: "Canon Pixma",
    date: "2021-10-10 12:00:00",
  },
  {
    action: "Delete",
    id: 'EL52',
    printer: "Epson L3150",
    date: "2021-10-11 14:00:00",
  },
  {
    action: "Add",
    id: 'HD26',
    printer: "HP DeskJet 2330",
    date: "2021-10-12 16:00:00",
  }, 
  {
    action: "Add",
    id: 'HL43',
    printer: "HP LaserJet Pro M404dn",
    date: "2021-10-09 10:00:00",
  },
  {
    action: "Edit",
    id: 'CP03',
    printer: "Canon Pixma",
    date: "2021-10-10 12:00:00",
  },
  {
    action: "Delete",
    id: 'EL53',
    printer: "Epson L3150",
    date: "2021-10-11 14:00:00",
  },
  {
    action: "Add",
    id: 'HD27',
    printer: "HP DeskJet 2330",
    date: "2021-10-12 16:00:00",
  },
  {
    action: "Add",
    id: 'HL44',
    printer: "HP LaserJet Pro M404dn",
    date: "2021-10-09 10:00:00",
  },
  {
    action: "Edit",
    id: 'CP04',
    printer: "Canon Pixma",
    date: "2021-10-10 12:00:00",
  },
  {
    action: "Delete",
    id: 'EL54',
    printer: "Epson L3150",
    date: "2021-10-11 14:00:00",
  },
  {
    action: "Add",
    id: 'HD28',
    printer: "HP DeskJet 2330",
    date: "2021-10-12 16:00:00",
  }
];

export default function Dashboard() {
  const { userInfo } = useAuth();
  console.log(userInfo);
  function getColor(action) {
    switch (action) {
      case "Add":
        return "green";
      case "Edit":
        return "gold";
      case "Delete":
        return "firebrick";
      default:
        return "black";
    }
  }

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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {userInfo.role === "Student" ? (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="text.secondary">
              User Name:
            </Typography>
            <Typography variant="body1">{`${userInfo.lname} ${userInfo.fname}`}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Email:
            </Typography>
            <Typography variant="body1">{userInfo.email}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Pages Left:
            </Typography>
            <Typography variant="body1">{userInfo.page_remain}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Bank Account:
            </Typography>
            <Typography variant="body1">{`${userInfo.bank_name}: ${userInfo.bank_card}`}</Typography>
          </Box>
        </Paper>
      ) : (
        <Container>
          <Typography variant="h4" gutterBottom>
            System Logs 🔴
          </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                {/* Table Head */}
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Printer</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                  {logs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell  sx={{ color: getColor(log.action), fontWeight: "bold" }}>
                        {log.action}
                      </TableCell>
                      <TableCell>{log.id}</TableCell>
                      <TableCell >{log.printer}</TableCell>
                      <TableCell >{log.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Container>
      )}
    </Container>
  );
}
