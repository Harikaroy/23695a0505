import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { isValidMinutes, isValidShortcode, isValidURL } from "../utils/validation";
import { createShortURL } from "../services/urlService";

const ShortenerPage = () => {
  const [inputs, setInputs] = useState([
    { url: "", shortcode: "", validity: "" },
  ]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAddField = () => {
    if (inputs.length < 5) setInputs([...inputs, { url: "", shortcode: "", validity: "" }]);
  };

  const handleSubmit = () => {
    try {
      const output = inputs.map(({ url, shortcode, validity }) => {
        if (!isValidURL(url)) throw new Error("Invalid URL");
        if (shortcode && !isValidShortcode(shortcode)) throw new Error("Invalid shortcode");
        const min = validity ? parseInt(validity) : 30;
        if (!isValidMinutes(min)) throw new Error("Invalid validity");
        return createShortURL({ url, shortcode, minutes: min });
      });
      setResults(output);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      {inputs.map((input, index) => (
        <Grid key={index} container spacing={2} mt={2}>
          <Grid item xs={12} md={5}>
            <TextField
              label="Long URL"
              fullWidth
              value={input.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={input.shortcode}
              onChange={(e) => handleChange(index, "shortcode", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Validity (min)"
              fullWidth
              type="number"
              value={input.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      {inputs.length < 5 && <Button onClick={handleAddField}>Add More</Button>}
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Shorten URLs
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {results.map((r) => (
        <Paper key={r.shortcode} sx={{ mt: 2, p: 2 }}>
          <Typography>Short URL: http://localhost:3000/{r.shortcode}</Typography>
          <Typography>Expires At: {r.expiresAt}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ShortenerPage;

