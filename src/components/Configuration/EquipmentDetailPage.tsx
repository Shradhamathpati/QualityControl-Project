import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Equipment } from "@/types";

const EquipmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      const { mockEquipments } = await import("@/utils/mockData");
      const found = mockEquipments.find((eq) => eq.id === Number(id));
      setEquipment(found || null);
    };
    fetchEquipment();
  }, [id]);

  if (!equipment) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>{equipment.equipment_name}</Typography>
      <Typography sx={{ mb: 1 }}>Department: {equipment.department?.name}</Typography>
      <Typography sx={{ mb: 3 }}>Parameters: {equipment.parameters.length}</Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => navigate("/equipments")}>Back</Button>
        <Button variant="contained" color="secondary" onClick={() => alert("Edit clicked!")}>Edit</Button>
      </Box>
    </Box>
  );
};

export default EquipmentDetailPage;
