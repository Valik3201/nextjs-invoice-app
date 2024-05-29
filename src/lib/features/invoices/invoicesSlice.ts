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
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  invoice: null,
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action: PayloadAction<Invoice[]>) => {
          state.invoices = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.invoices.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addInvoice.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.invoice = action.payload;
        state.loading = false;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        if (state.invoice && state.invoice.uid === action.payload.invoiceUid) {
          state.invoice = { ...state.invoice, ...action.payload.updatedData };
        }
        state.loading = false;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (invoice) => invoice.uid !== action.payload.invoiceUid
        );
        state.loading = false;
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default invoicesSlice.reducer;
