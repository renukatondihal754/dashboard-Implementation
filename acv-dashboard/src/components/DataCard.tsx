import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

const DataCard = ({ title, children }: Props) => {
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DataCard;
