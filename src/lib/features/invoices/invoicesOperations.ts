import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/src/firebase.config";
import { Invoice } from "@/src/lib/types";

const orderInvoiceKeys = (invoice: DocumentData): Invoice => {
  return {
    status: invoice.status,
    billFrom: {
      city: invoice.billFrom.city,
      country: invoice.billFrom.country,
      postCode: invoice.billFrom.postCode,
      streetAddress: invoice.billFrom.streetAddress,
    },
    billTo: {
      city: invoice.billTo.city,
      clientEmail: invoice.billTo.clientEmail,
      clientName: invoice.billTo.clientName,
      country: invoice.billTo.country,
      postCode: invoice.billTo.postCode,
      streetAddress: invoice.billTo.streetAddress,
    },
    invoiceDate: invoice.invoiceDate,
    itemList: invoice.itemList.map((item: DocumentData) => ({
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
      total: item.total,
    })),
    paymentTerms: invoice.paymentTerms,
    projectDescription: invoice.projectDescription,
  };
};

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (userId: string, { rejectWithValue }) => {
    try {
      const invoicesRef = collection(db, `users/${userId}/invoices`);
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        invoicesRef
      );
      const invoices = querySnapshot.docs.map((doc) => ({
        ...orderInvoiceKeys(doc.data()),
        id: doc.id,
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
    { userId, invoice }: { userId: string; invoice: Omit<Invoice, "id"> },
    { rejectWithValue }
  ) => {
    try {
      const invoicesRef = collection(db, `users/${userId}/invoices`);
      const newDocRef = doc(invoicesRef);
      await setDoc(newDocRef, invoice);
      return { ...invoice, id: newDocRef.id };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(errorMessage);
    }
  }
);
