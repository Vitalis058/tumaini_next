"use client";
import { useQuery } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

import axios from "axios";
import { TourType } from "@/types/types";

//hook to get the tours
export const useGetTours = () => {
  const getMyToursRequest = async (): Promise<TourType[]> => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/tours`);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("error in getting the tours");
    }
  };

  return useQuery(["gettingTours"], getMyToursRequest, {
    suspense: true,
    retry: false,
  });
};

//get tour api call
export const useGetTourDetails = (tourSlug?: string) => {
  const useGetTourRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/tours/details/${tourSlug}`
    );

    if (!response.ok) {
      throw new Error("Error in getting the tour");
    }

    return response.json();
  };

  const {
    data: tourDetails,
    error,
    isLoading,
  } = useQuery("getTourDetails", useGetTourRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    isLoading,
    tourDetails,
  };
};

// api to get the recent tours
export const useGetRecentTours = () => {
  const getRecentToursRequest = async (): Promise<TourType[]> => {
    const { data } = await axios.get(`${API_BASE_URL}/api/tours?limit=3`);
    return data;
  };

  return useQuery("fetchCurrentTours", getRecentToursRequest, {
    suspense: true,
  });
};
