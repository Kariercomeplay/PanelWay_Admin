import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Box
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getAllSubscriptions } from '@/apis/subscriptionAPI';

const MembershipPackageScreen = () => {
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    try {
      const data = await getAllSubscriptions();
      console.log("Fetched packages:", data);
      setPackages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>Quản lý gói thành viên</Typography>
        <Button variant="contained" startIcon={<Add />}>Thêm gói</Button>
      </Box>

      {packages.length === 0 ? (
        <Typography color="text.secondary">Không có gói nào được tìm thấy.</Typography>
      ) : (
        <Grid container spacing={3}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                    <Box>
                      <Typography variant="h6">{pkg.name}</Typography>
                      <Typography variant="body2" color="text.secondary">Mã: {pkg.code}</Typography>
                    </Box>
                    <Chip label={pkg.status} variant="outlined" size="small" />
                  </Box>
                  <Typography variant="body2"><strong>Giá:</strong> {pkg.price === 0 ? 'Miễn phí' : pkg.price.toLocaleString('vi-VN') + 'đ'}</Typography>
                  <Typography variant="body2"><strong>Thời hạn:</strong> {pkg.duration} ngày</Typography>
                  <Typography variant="body2"><strong>Ưu tiên:</strong> {pkg.priority}</Typography>
                  <Typography variant="body2"><strong>Tính năng:</strong> {pkg.features}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MembershipPackageScreen;
