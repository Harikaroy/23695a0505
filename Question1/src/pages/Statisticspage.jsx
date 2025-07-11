import React from "react";
import { getLogs } from "../services/logger";
import { findShortURL } from "../services/urlService";
import { Box, Typography, Paper } from "@mui/material";

const StatisticsPage = () => {
  const urls = JSON.parse(localStorage.getItem("urls") || "[]");

  return (
    <Box p={3}>
      <Typography variant="h4">Statistics</Typography>
      {urls.map((url) => (
        <Paper key={url.shortcode} sx={{ mt: 2, p: 2 }}>
          <Typography><strong>Short URL:</strong> {url.shortcode}</Typography>
          <Typography>Created At: {url.createdAt}</Typography>
          <Typography>Expires At: {url.expiresAt}</Typography>
          <Typography>Clicks: {url.clicks.length}</Typography>
          {url.clicks.map((click, idx) => (
            <Box key={idx} ml={2}>
              <Typography>Time: {click.time}</Typography>
              <Typography>Referrer: {click.referrer}</Typography>
              <Typography>Location: {click.location}</Typography>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default StatisticsPage;
