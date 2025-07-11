import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { findShortURL, logClick } from "../services/urlService";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const record = findShortURL(shortcode);
    if (record) {
      logClick(shortcode, document.referrer);
      window.location.href = record.originalURL;
    } else {
      alert("Shortcode not found or expired");
    }
  }, [shortcode]);

  return null;
};

export default RedirectHandler;

