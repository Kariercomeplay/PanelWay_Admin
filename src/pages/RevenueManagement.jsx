"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Grid,
} from "@mui/material";

import { getTransactions, getTransactionDetails } from "@/apis/revenueAPI";
import { getSubscriptionName } from "@/apis/subscriptionAPI";
import { getAccountInfo } from "@/apis/userAPI";

const RevenueManagement = () => {
    const [allRevenueData, setAllRevenueData] = useState([]);
    const [filteredRevenueData, setFilteredRevenueData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [timePeriod, setTimePeriod] = useState("monthly");
    const [selectedRevenue, setSelectedRevenue] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [subscriptionNames, setSubscriptionNames] = useState({});
    const [accountInfoMap, setAccountInfoMap] = useState({});
    const [filterMode, setFilterMode] = useState("period");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const exportReport = () => {
        const now = new Date();
        const dateLabel = now.toLocaleDateString("vi-VN");
        const from = filterMode === "custom" ? startDate : "";
        const to = filterMode === "custom" ? endDate : "";

        const dataToExport = filteredRevenueData.map((item) => ({
            ID: item.id,
            "Mã Giao Dịch": item.paymentId || "Không rõ",
            "Tên Gói": subscriptionNames[item.subscriptionId] || "Không rõ",
            "Ngày": new Date(item.transactionDate).toLocaleDateString(),
            "Doanh Thu (VNĐ)": item.amount?.toLocaleString(),
            "Trạng Thái": item.status === "PAID" ? "Đã thanh toán" : "Chờ thanh toán",
        }));

        const summaryData = [
            ["📊 BÁO CÁO DOANH THU PANELWAY"],
            [],
            ["Thời gian", filterMode === "custom" ? `Từ ${startDate} đến ${endDate}` : `Theo: ${timePeriod}`],
            ["Tổng doanh thu (VNĐ)", totalRevenue.toLocaleString()],
            ["Tổng số giao dịch", filteredRevenueData.length],
            ["Ngày xuất báo cáo", dateLabel],
        ];
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        const detailSheet = XLSX.utils.json_to_sheet(dataToExport);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Tóm Tắt");
        XLSX.utils.book_append_sheet(workbook, detailSheet, "Chi Tiết Doanh Thu");

        const blob = new Blob([
            XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        ], { type: "application/octet-stream" });

        saveAs(blob, `BaoCaoDoanhThu_PanelWay_${now.toISOString().slice(0, 10)}.xlsx`);
    };

    const preloadSubscriptionNames = async (transactions) => {
        const uniqueIds = [...new Set(transactions.map((t) => t.subscriptionId))];
        const namesMap = {};

        await Promise.all(
            uniqueIds.map(async (id) => {
                const name = await getSubscriptionName(id);
                namesMap[id] = name || "Không rõ";
            })
        );

        setSubscriptionNames(namesMap);
    };

    const preloadAccountInfo = async (transactions) => {
        const uniqueAccountIds = [...new Set(transactions.map((t) => t.accountId))];
        const infoMap = {};

        await Promise.all(
            uniqueAccountIds.map(async (id) => {
                const info = await getAccountInfo(id);
                if (info) {
                    infoMap[id] = {
                        name: info.fullName,
                        phone: info.phoneNumber,
                        email: info.email,
                    };
                }
            })
        );

        setAccountInfoMap(infoMap);
    };

    const handleRowClick = async (id) => {
        try {
            const details = await getTransactionDetails(id);
            setSelectedRevenue(details);
            setOpenDialog(true);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết giao dịch:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions();
                setAllRevenueData(data);
                preloadSubscriptionNames(data);
                preloadAccountInfo(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const now = new Date();

        const isSameDay = (d1, d2) =>
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();

        const isSameWeek = (d1, d2) => {
            const startOfWeek = new Date(d2);
            startOfWeek.setDate(d2.getDate() - 6);
            return d1 >= startOfWeek && d1 <= d2;
        };

        const isSameMonth = (d1, d2) =>
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();

        const isSameYear = (d1, d2) =>
            d1.getFullYear() === d2.getFullYear();

        let filtered = [];

        if (filterMode === "period") {
            filtered = allRevenueData.filter((item) => {
                const transDate = new Date(item.transactionDate);
                switch (timePeriod) {
                    case "daily": return isSameDay(transDate, now);
                    case "weekly": return isSameWeek(transDate, now);
                    case "monthly": return isSameMonth(transDate, now);
                    case "yearly": return isSameYear(transDate, now);
                    default: return true;
                }
            });
        } else {
            const start = new Date(startDate);
            const end = new Date(endDate);
            filtered = allRevenueData.filter((item) => {
                const transDate = new Date(item.transactionDate);
                return transDate >= start && transDate <= end;
            });
        }

        setFilteredRevenueData(filtered);
        const total = filtered.reduce((sum, item) => sum + (item.amount || 0), 0);
        setTotalRevenue(total);
    }, [timePeriod, filterMode, startDate, endDate, allRevenueData]);

    return (
        <div className="p-4">
            <Typography variant="h4" gutterBottom>
                Quản lý Doanh Thu
            </Typography>

            <FormControl component="fieldset" className="mb-4">
                <RadioGroup
                    row
                    value={filterMode}
                    onChange={(e) => setFilterMode(e.target.value)}
                >
                    <FormControlLabel value="period" control={<Radio />} label="Chọn theo thời gian" />
                    <FormControlLabel value="custom" control={<Radio />} label="Chọn khoảng ngày" />
                </RadioGroup>
            </FormControl>

            {filterMode === "period" ? (
                <FormControl fullWidth className="mb-4">
                    <InputLabel>Chọn thời gian</InputLabel>
                    <Select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} label="Chọn thời gian">
                        <MenuItem value="daily">Hàng ngày</MenuItem>
                        <MenuItem value="weekly">Hàng tuần</MenuItem>
                        <MenuItem value="monthly">Hàng tháng</MenuItem>
                        <MenuItem value="yearly">Hàng năm</MenuItem>
                    </Select>
                </FormControl>
            ) : (
                <div className="flex gap-4 mb-4">
                    <TextField label="Từ ngày" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
                    <TextField label="Đến ngày" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
                </div>
            )}

            <div className="mb-4 flex justify-between items-center">
                <Typography variant="h6">
                    Tổng Doanh Thu: {totalRevenue.toLocaleString()} VNĐ
                </Typography>
                <Button onClick={exportReport} variant="contained" color="primary">
                    Xuất Báo Cáo
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Mã Giao Dịch</strong></TableCell>
                            <TableCell><strong>Tên Gói</strong></TableCell>
                            <TableCell><strong>Ngày</strong></TableCell>
                            <TableCell><strong>Doanh Thu</strong></TableCell>
                            <TableCell><strong>Trạng Thái</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRevenueData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Không có dữ liệu doanh thu</TableCell>
                            </TableRow>
                        ) : (
                            filteredRevenueData.map((item) => (
                                <TableRow
                                    key={item.id}
                                    hover
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleRowClick(item.id)}
                                >
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.paymentId || "Không rõ"}</TableCell>
                                    <TableCell>{subscriptionNames[item.subscriptionId] || "Đang tải..."}</TableCell>
                                    <TableCell>{new Date(item.transactionDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.amount.toLocaleString()} VNĐ</TableCell>
                                    <TableCell>{item.status === "PAID" ? "Đã thanh toán" : "Chờ thanh toán"}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Chi Tiết Giao Dịch</DialogTitle>
                <DialogContent dividers>
                    {selectedRevenue ? (
                        <Grid container spacing={2}>
                            <Grid item xs={6}><strong>ID:</strong> {selectedRevenue.id}</Grid>
                            <Grid item xs={6}><strong>Ngày:</strong> {new Date(selectedRevenue.transactionDate).toLocaleDateString()}</Grid>
                            <Grid item xs={6}><strong>Gói:</strong> {subscriptionNames[selectedRevenue.subscriptionId]}</Grid>
                            <Grid item xs={6}><strong>Số tiền:</strong> {selectedRevenue.amount.toLocaleString()} VNĐ</Grid>
                            <Grid item xs={6}><strong>Trạng thái:</strong> {selectedRevenue.status === "PAID" ? "Đã thanh toán" : "Chờ thanh toán"}</Grid>
                            <Grid item xs={12}><strong>Mã thanh toán:</strong> {selectedRevenue.paymentId}</Grid>
                            <Grid item xs={12}><strong>Người dùng:</strong> {accountInfoMap[selectedRevenue.accountId]?.name} ({accountInfoMap[selectedRevenue.accountId]?.phone} - {accountInfoMap[selectedRevenue.accountId]?.email})</Grid>
                        </Grid>
                    ) : (
                        "Đang tải chi tiết..."
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} variant="contained">Đóng</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RevenueManagement;
