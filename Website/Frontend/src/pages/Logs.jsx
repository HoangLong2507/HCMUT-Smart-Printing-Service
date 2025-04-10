import React from "react";
import { MonitorHeart } from "@mui/icons-material";
import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Typography,
    TableFooter,
    TablePagination,
    Container,
} from "@mui/material";

const logs = [
    {
        year: 2024,
        month: "December",
        totalPrints: 2000,
        totalMoney: 1000000,
        totalUsers: 100,
        totalPrinters: 50,
    },
    {
        year: 2024,
        month: "November",
        totalPrints: 1500,
        totalMoney: 750000,
        totalUsers: 90,
        totalPrinters: 45,
    },
    {
        year: 2024,
        month: "October",
        totalPrints: 1000,
        totalMoney: 500000,
        totalUsers: 80,
        totalPrinters: 40,
    },
    {
        year: 2024,
        month: "September",
        totalPrints: 800,
        totalMoney: 420000,
        totalUsers: 40,
        totalPrinters: 10,
    },
    {
        year: 2024,
        month: "August",
        totalPrints: 500,
        totalMoney: 200000,
        totalUsers: 40,
        totalPrinters: 12,
    },
    {
        year: 2024,
        month: "July",
        totalPrints: 500,
        totalMoney: 200000,
        totalUsers: 40,
        totalPrinters: 12,
    },{
        year: 2024,
        month: "June",
        totalPrints: 500,
        totalMoney: 200000,
        totalUsers: 40,
        totalPrinters: 12,
    },{
        year: 2024,
        month: "May",
        totalPrints: 500,
        totalMoney: 200000,
        totalUsers: 40,
        totalPrinters: 12,
    },{
        year: 2024,
        month: "April",
        totalPrints: 500,
        totalMoney: 200000,
        totalUsers: 40,
        totalPrinters: 12,
    },{
        year: 2024,
        month: "March",
        totalPrints: 500,
        totalMoney: 200000,
        totalUsers: 40,
        totalPrinters: 12,
    },
    {
        year: 2024,
        month: "February",
        totalPrints: 2000,
        totalMoney: 1000000,
        totalUsers: 100,
        totalPrinters: 50,
    },
    {
        year: 2024,
        month: "January",
        totalPrints: 1500,
        totalMoney: 750000,
        totalUsers: 90,
        totalPrinters: 45,
    },
];

export default function Logs() {
    return (
        <Container sx={{py:4}}>
            {/* Header Section */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <MonitorHeart color="primary" fontSize="large" />
                <Typography variant="h4" component="h1" gutterBottom>
                    System Report Recap
                </Typography>
            </Box>

            {/* Table Section */}
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Year
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Month
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Total Prints
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Total Money (₫)
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Total Users
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Total Printers
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                    },
                                }}
                            >
                                <TableCell align="left">{log.year}</TableCell>
                                <TableCell align="left">{log.month}</TableCell>
                                <TableCell align="right">{log.totalPrints}</TableCell>
                                <TableCell align="right">
                                    {log.totalMoney.toLocaleString("vi-VN")}₫
                                </TableCell>
                                <TableCell align="right">{log.totalUsers}</TableCell>
                                <TableCell align="right">{log.totalPrinters}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
