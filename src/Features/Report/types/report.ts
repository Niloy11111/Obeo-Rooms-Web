import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export interface IPickUp {
  _id: string;
  reservationNo: string;
  guestInfo: string;
  companyInfo: string;
  flightInfo: string;
  date: string;
}
export interface IDrop {
  _id: string;
  roomNo: string;
  guestInfo: string;
  companyInfo: string;
  flightInfo: string;
  date: string;
}

type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
