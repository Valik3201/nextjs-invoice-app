import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "@/src/lib/types";
import {
  fetchInvoices,
  addInvoice,
  fetchInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "./invoicesOperations";

interface InvoicesState {
  invoices: Invoice[];
  invoice: Invoice | null;
  invoicesLoading: boolean;
  invoicesError: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  invoice: null,
  invoicesLoading: false,
  invoicesError: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action: PayloadAction<Invoice[]>) => {
          state.invoices = action.payload;
          state.invoicesLoading = false;
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.invoicesLoading = false;
        state.invoicesError = action.payload as string;
      })
      .addCase(addInvoice.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(
        addInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.invoices.push(action.payload);
          state.invoicesLoading = false;
        }
      )
      .addCase(addInvoice.rejected, (state, action) => {
        state.invoicesError = action.payload as string;
        state.invoicesLoading = false;
      })
      .addCase(fetchInvoiceById.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.invoice = action.payload;
        state.invoicesLoading = false;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.invoicesError = action.payload as string;
        state.invoicesLoading = false;
      })
      .addCase(updateInvoice.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        if (state.invoice && state.invoice.uid === action.payload.invoiceUid) {
          state.invoice = {
            ...state.invoice,
            ...action.payload.updatedInvoice,
          };
        }
        state.invoicesLoading = false;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.invoicesError = action.payload as string;
        state.invoicesLoading = false;
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (invoice) => invoice.uid !== action.payload.invoiceUid
        );
        state.invoicesLoading = false;
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.invoicesError = action.payload as string;
        state.invoicesLoading = false;
      });
  },
});

export default invoicesSlice.reducer;
