import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "@/src/lib/types";
import { fetchInvoices, addInvoice } from "./invoicesOperations";

interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
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
      });
  },
});

export default invoicesSlice.reducer;
