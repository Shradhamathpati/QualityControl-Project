import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

const EquipmentViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [equipmentName, setEquipmentName] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const state = location.state as any;

    if (state) {
      setEquipmentName(state.equipmentName);
      setDepartment(state.department);
    }
  }, [location]);

  const parameters = [
    { title: "Temperature", range: "36.5°C - 37.5°C" },
    { title: "CO2 Concentration", range: "02 - 20, CO2 - 5" },
    { title: "Humidity Levels", range: "30% - 60%" },
    { title: "Gas Mixture", range: "02 - 20, CO2 - 5" },
  ];

  const incubators = [
    { id: 1, name: "1", make: "Rcom CMPNY", model: "MES345" },
    { id: 2, name: "2", make: "Rcom CMPNY", model: "MES345" },
    { id: 3, name: "3", make: "Rcom CMPNY", model: "MES345" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ArrowBackIcon
          onClick={() => navigate("/configuration/equipments")}
          sx={{
            mr: 1,
            cursor: "pointer",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            padding: "4px",
          }}
        />
        <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
          Equipment's
        </Typography>
      </Box>

      {/* Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
          {equipmentName}
        </Typography>
        <Chip
          label={department}
          size="small"
          sx={{
            background: "#E8F5E9",
            color: "#2E7D32",
            fontWeight: 500,
          }}
        />
      </Box>

      {/* Parameters */}
      <Typography sx={{ fontWeight: 700, mb: 2 }}>
        Parameters
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {parameters.map((p, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              p: 2,
              border: "1px solid #E5E7EB",
              width: 220,
              borderRadius: "10px",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>{p.title}</Typography>
            <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
              Range: {p.range}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Table */}
      <Typography sx={{ fontWeight: 700, mb: 1 }}>
        Incubators
      </Typography>

      <Paper elevation={0} sx={{ border: "1px solid #E5E7EB" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Incubator</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {incubators.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.make}</TableCell>
                <TableCell>{row.model}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/configuration/equipments")}
        >
          Back to Equipment's Listing
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/configuration/add-parameter", {
              state: { equipmentName, department },
            })
          }
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default EquipmentViewPage;
