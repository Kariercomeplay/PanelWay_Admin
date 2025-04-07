// Phiên bản dùng Material UI (MUI)
import { useEffect, useState } from 'react';
import {
  getAppointments,
  getRentalLocations,
  getTransactions,
  getUsers,
} from '@/apis/dashBoardAPI';
import {
  getUserBasicPackageAPI,
  getUserStandardPackageAPI,
  getUserPremiumPackageAPI,
} from '@/apis/userAPI';
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function DashboardPage() {
  const [filter, setFilter] = useState('month');
  const [appointments, setAppointments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);
  const [userTypeData, setUserTypeData] = useState([
    { name: 'Basic', value: 0 },
    { name: 'Standard', value: 0 },
    { name: 'Premium', value: 0 },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const apptsRes = await getAppointments();
        const locsRes = await getRentalLocations();
        const transRes = await getTransactions();
        const usersRes = await getUsers();

        const basicRes = await getUserBasicPackageAPI();
        const standardRes = await getUserStandardPackageAPI();
        const premiumRes = await getUserPremiumPackageAPI();

        setAppointments(apptsRes.data || []);
        setLocations(locsRes.data || []);
        setTransactions(transRes.data || []);
        setUsers(usersRes.data || []);

        setUserCount(usersRes.total || 0);
        setTransactionCount(transRes.total || 0);
        setLocationCount(locsRes.total || 0);

        setUserTypeData([
          { name: 'Basic', value: basicRes.total || 0 },
          { name: 'Standard', value: standardRes.total || 0 },
          { name: 'Premium', value: premiumRes.total || 0 },
        ]);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  const timeChartData = [
    { name: 'Jan', users: 30, revenue: 2000000, purchases: 20, renewals: 15 },
    { name: 'Feb', users: 40, revenue: 4000000, purchases: 25, renewals: 20 },
    { name: 'Mar', users: 50, revenue: 4500000, purchases: 35, renewals: 25 },
    { name: 'Apr', users: 70, revenue: 5000000, purchases: 40, renewals: 30 },
  ];

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Grid container spacing={2} mb={4}>
        {[
          { title: '👥 Người dùng', value: userCount },
          { title: '🛒 Giao dịch', value: transactionCount },
          { title: '📍 Điểm quảng cáo', value: locationCount },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={item.title} />
              <CardContent>
                <Typography variant="h6">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="📈 Phân loại người dùng" />
            <CardContent>
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box ml={4}>
                  {userTypeData.map((item, index) => (
                    <Box display="flex" alignItems="center" mb={1} key={index}>
                      <Box
                        width={16}
                        height={16}
                        borderRadius={8}
                        mr={1}
                        sx={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <Typography>
                        {item.name}: {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Người dùng mới" />
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={timeChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Lượt mua theo thời gian" />
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={timeChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="purchases" stroke="#ffc658" fill="#ffc658aa" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Tái đăng ký vs Người mới" />
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart layout="vertical" data={timeChartData}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="renewals" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
