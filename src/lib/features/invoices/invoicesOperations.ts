import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/src/firebase.config";
import { Invoice } from "@/src/lib/types";
import {
  generateInvoiceId,
  calculateDueDate,
  calculateTotal,
} from "../../utils";

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
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
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
      const total = calculateTotal(invoice.itemList);
      const paymentDue = calculateDueDate(
        invoice.createdAt,
        invoice.paymentTerms
      );
      const invoiceData = { ...invoice, id: invoiceId, total, paymentDue };

      const addedInvoice = await addDoc(
        collection(db, `users/${userId}/invoices`),
        invoiceData
      );

      const invoiceRef = doc(db, `users/${userId}/invoices/${addedInvoice.id}`);

      await updateDoc(invoiceRef, {
        uid: invoiceRef.id,
      });

      return {
        ...invoiceData,
        uid: invoiceRef.id,
      };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
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
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
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

      const invoiceSnapshot = await getDoc(invoiceRef);
      const currentInvoiceData = invoiceSnapshot.data() as Invoice;

      const newPaymentDue = updatedData.paymentTerms
        ? calculateDueDate(
            currentInvoiceData.createdAt,
            updatedData.paymentTerms
          )
        : currentInvoiceData.paymentDue;

      const updatedInvoiceData = {
        ...currentInvoiceData,
        ...updatedData,
        total: updatedData.itemList
          ? calculateTotal(updatedData.itemList)
          : currentInvoiceData.total,
        paymentDue: newPaymentDue,
      };

      await updateDoc(invoiceRef, updatedInvoiceData);

      return { invoiceUid, updatedInvoice: updatedInvoiceData };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
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
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);
