import { PublicShell } from "@/components/site/public-shell";
import { BookingWizard } from "@/components/booking/booking-wizard";

export const metadata = {
  title: "Book a clean — Greenleaf Home Co.",
  description: "Five quick questions. See your exact price. No phone tag.",
};

const BookingPage = () => {
  return (
    <PublicShell>
      <BookingWizard />
    </PublicShell>
  );
};

export default BookingPage;
