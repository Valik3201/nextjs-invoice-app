"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { fetchInvoiceById } from "@/src/lib/features/invoices/invoicesOperations";
import GoBackButton from "@/src/components/Button/GoBackButton";
import SkeletonInvoice from "@/src/components/Loader/SkeletonInvoice";
import InvoicePanel from "@/src/components/Invoice/InvoicePanel";
import InvoiceInfo from "@/src/components/Invoice/InvoiceInfo";

export default function Page() {
  const router = useRouter();
  const invoiceUid = useParams<{ invoice: string }>().invoice;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { invoice, invoicesLoading, invoicesError } = useAppSelector(
    (state) => state.invoices
  );

  useEffect(() => {
    if (user && user.uid && invoiceUid) {
      dispatch(fetchInvoiceById({ userId: user.uid, invoiceUid }));
    }

    if (!user) {
      router.push("/");
      return;
    }
  }, [dispatch, router, user, invoiceUid]);

  if (invoicesLoading && !user) {
    return <SkeletonInvoice />;
  }

  return (
    <div>
      <GoBackButton href="/invoices" />

      {invoice && !invoicesLoading && (
        <>
          <InvoicePanel invoice={invoice} />

          <InvoiceInfo invoice={invoice} />
        </>
      )}
    </div>
  );
}
