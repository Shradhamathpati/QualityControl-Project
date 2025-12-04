import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { MoreHoriz } from "@mui/icons-material";
import ViewIcon from "@/assets/icons/eye.jpg";

import { useNavigate } from "react-router-dom";
import AddEquipmentPopup from "./AddEquipmentPopup";

import { Equipment } from "@/types";

const EquipmentPage = () => {
  const navigate = useNavigate();

  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openAddEquipmentPopup, setOpenAddEquipmentPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { mockEquipments } = await import("@/utils/mockData");
        setEquipmentData(mockEquipments);
      } catch (error) {
        console.error("Error loading equipments:", error);
      }
    };

    fetchData();
  }, []);

  const getCreatedDate = (dateString: string) => {
    let date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
          Equipment's
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search Equipment's"
            sx={{ width: 260, background: "#fff" }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddEquipmentPopup(true)}
            sx={{
              background: "#505050",
              "&:hover": { background: "#505050" },
            }}
          >
            Add Equipment's
          </Button>
        </Box>
      </Box>

      {/* Cards */}
      <Grid container spacing={2}>
        {equipmentData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ pb: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                  {item.equipment_name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 13, color: "#9CA3AF" }}>
                      Department:
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {item.department?.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 13, color: "#9CA3AF" }}>
                      Parameters:
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {item.parameters.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <Box sx={{ height: 1, background: "#E5E7EB", mx: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  pt: 1,
                }}
              >
                <Typography sx={{ fontSize: 14, color: "#4B5563" }}>
                  <span style={{ color: "#9CA3AF" }}>Created:</span>{" "}
                  {getCreatedDate(item.created_at)}
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {/* ✅ VIEW BUTTON */}
                  <IconButton
                    onClick={() =>
                      navigate("/configuration/equipment/view", {
                        state: {
                          equipmentName: item.equipment_name,
                          department: item.department?.name,
                        },
                      })
                    }
                    sx={{
                      width: 32,
                      height: 32,
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={ViewIcon}
                      alt="view"
                      style={{ width: 18, height: 18 }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{ p: 0.5 }}
                  >
                    <MoreHoriz fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Inactive</MenuItem>
      </Menu>

      {/* Add Equipment Popup */}
      <AddEquipmentPopup
        open={openAddEquipmentPopup}
        onClose={() => setOpenAddEquipmentPopup(false)}
      />
    </Box>
  );
};

export default EquipmentPage;
