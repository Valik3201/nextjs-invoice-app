import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/src/firebase.config";
import { Invoice } from "@/src/lib/types";
import { generateInvoiceId } from "../../utils";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (userId: string, { rejectWithValue }) => {
    try {
      const invoicesRef = collection(db, `users/${userId}/invoices`);
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        invoicesRef
      );
      const invoices = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      })) as Invoice[];
      return invoices;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(errorMessage);
    }
  }
);

export const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (
    { userId, invoice }: { userId: string; invoice: Invoice },
    { rejectWithValue }
  ) => {
    try {
      const invoiceId = generateInvoiceId();
      const newInvoice = { ...invoice, id: invoiceId };
      const invoiceDoc = doc(db, `users/${userId}/invoices`, invoiceId);
      await setDoc(invoiceDoc, newInvoice);
      return newInvoice;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchInvoiceById = createAsyncThunk(
  "invoices/fetchInvoiceById",
  async (
    { userId, invoiceUid }: { userId: string; invoiceUid: string },
    { rejectWithValue }
  ) => {
    try {
      const invoiceRef = doc(db, `users/${userId}/invoices/${invoiceUid}`);
      const invoiceDoc = await getDoc(invoiceRef);
      if (invoiceDoc.exists()) {
        return invoiceDoc.data() as Invoice;
      } else {
        throw new Error("Invoice not found");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async (
    {
      userId,
      invoiceUid,
      updatedData,
    }: { userId: string; invoiceUid: string; updatedData: Partial<Invoice> },
    { rejectWithValue }
  ) => {
    try {
      const invoiceRef = doc(db, `users/${userId}/invoices/${invoiceUid}`);
      await updateDoc(invoiceRef, updatedData);
      return { invoiceUid, updatedData };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (
    { userId, invoiceUid }: { userId: string; invoiceUid: string },
    { rejectWithValue }
  ) => {
    try {
      const invoiceRef = doc(db, `users/${userId}/invoices`, invoiceUid);
      await deleteDoc(invoiceRef);
      return { userId, invoiceUid };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(errorMessage);
    }
  }
);
