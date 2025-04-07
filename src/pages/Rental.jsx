import { useEffect, useState } from "react";
import {
    fetchRentalLocations,
    fetchRentalLocationCount,
    fetchRentalLocationById,
} from "@/apis/rentalAPI";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Rental = () => {
    const [locations, setLocations] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const size = 10;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(""); // Added state for status filter
    const [filtered, setFiltered] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    // Fetch data one time
    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await fetchRentalLocationCount();
                setTotal(count || 0);
                const data = await fetchRentalLocations(1, count); // Fetch all rental locations
                setLocations(data.items || []);  // Save all rental locations
                setFiltered(data.items || []);  // Filter locations initially
            } catch (error) {
                console.error("Error fetching rental locations:", error);
            }
        };

        fetchData();
    }, []); // Only fetch data on component mount

    // Filter locations based on search term and selected status
    useEffect(() => {
        let filteredLocations = locations;

        if (searchTerm.trim() !== "") {
            const lower = searchTerm.toLowerCase();
            filteredLocations = filteredLocations.filter((item) =>
                item.address?.toLowerCase().includes(lower) || item.code?.toLowerCase().includes(lower)
            );
        }

        if (selectedStatus) {
            filteredLocations = filteredLocations.filter((item) => item.status === selectedStatus);
        }

        setFiltered(filteredLocations);
    }, [searchTerm, selectedStatus, locations]);

    // Fetch details of the selected location
    const openDetail = async (id) => {
        try {
            const detail = await fetchRentalLocationById(id);
            setSelected(detail);
            setDialogOpen(true);
        } catch (error) {
            console.error("Error fetching rental location details:", error);
        }
    };

    // Pagination logic: Slice data to display only the relevant items for the current page
    const startIndex = (page - 1) * size;
    const paginatedLocations = filtered.slice(startIndex, startIndex + size);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Danh sách địa điểm quảng cáo</h1>

            <div className="flex justify-between items-center mb-4">
                <div>
                    Tổng cộng: <b>{total}</b> địa điểm quảng cáo
                </div>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã hoặc địa chỉ"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                    {/* Dropdown for filtering by status */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="Available">Available</option>
                        <option value="Pending">Pending</option>
                        <option value="Occupied">Occupied</option>
                    </select>
                </div>
            </div>

            {/* Table for displaying rental locations */}
            <TableContainer component={Paper} className="mb-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>STT</strong></TableCell>
                            <TableCell><strong>Mã</strong></TableCell>
                            <TableCell><strong>Địa chỉ</strong></TableCell>
                            <TableCell><strong>Kích thước</strong></TableCell>
                            <TableCell><strong>Mô tả</strong></TableCell>
                            <TableCell><strong>Giá</strong></TableCell>
                            <TableCell><strong>Trạng thái</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedLocations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>Không có điểm quảng cáo nào</TableCell>
                            </TableRow>
                        ) : (
                            paginatedLocations.map((location, index) => (
                                <TableRow key={location.id} hover onClick={() => openDetail(location.id)}>
                                    <TableCell>{(page - 1) * size + index + 1}</TableCell> {/* STT */}
                                    <TableCell>{location.code}</TableCell>
                                    <TableCell>{location.address}</TableCell>
                                    <TableCell>{location.panelSize}</TableCell>
                                    <TableCell>{location.description}</TableCell>
                                    <TableCell>{location.price} VNĐ</TableCell>
                                    <TableCell className={location.status === "Available" ? "text-green-500" : location.status === "Pending" ? "text-yellow-500" : "text-red-500"}>
                                        {location.status}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    Trước
                </Button>
                <span className="mt-1">Trang {page}</span>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={page * size >= filtered.length}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Sau
                </Button>
            </div>

            {/* Dialog for Location Details */}
            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{selected?.code} - {selected?.address}</DialogTitle>
                <DialogContent>
                    <div className="mt-2">
                        <p><strong>Mã:</strong> {selected?.code}</p>
                        <p><strong>Địa chỉ:</strong> {selected?.address}</p>
                        <p><strong>Kích thước:</strong> {selected?.panelSize}</p>
                        <p><strong>Mô tả:</strong> {selected?.description}</p>
                        <p><strong>Giá thuê:</strong> {selected?.price} VNĐ</p>
                        <p><strong>Trạng thái:</strong> {selected?.status}</p>
                        <p><strong>Vĩ độ:</strong> {selected?.latitude}</p>
                        <p><strong>Kinh độ:</strong> {selected?.longitude}</p>
                        <p><strong>Ngày đăng:</strong> {new Date(selected?.postDate).toLocaleString()}</p>
                        <p><strong>Ngày khả dụng:</strong> {new Date(selected?.availableDate).toLocaleString()}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Rental;
