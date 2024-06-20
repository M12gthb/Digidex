"use client";

import axios from "axios";

export const api = axios.create({
  baseURL: "https://digi-api.com/api/v1",
  timeout: 20000,
});
