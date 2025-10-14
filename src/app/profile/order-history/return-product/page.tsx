import { Suspense } from "react";
import ReturnProductContent from "./ReturnProductContent";

export const dynamic = "force-dynamic";

export default function ReturnProduct() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReturnProductContent />
    </Suspense>
  );
}
