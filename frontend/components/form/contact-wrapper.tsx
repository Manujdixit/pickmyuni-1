import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { Loader } from "lucide-react";

const ConsultationModal = dynamic(
  () => import("../form/contact-modal").then((mod) => mod.ConsultationModal),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[300px] w-[300px] items-center justify-center">
        <Loader className="text-brand-primary animate-spin text-lg" />
      </div>
    ),
  },
);

interface ContactWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMobile?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  isTooltip?: boolean;
}

export default function ContactWrapper({
  open,
  onOpenChange,
  isMobile,
  buttonRef,
  isTooltip,
}: ContactWrapperProps) {
  // Only render the modal when it's actually needed (open)
  if (!open) {
    return null;
  }

  return (
    <ConsultationModal
      open={open}
      onOpenChange={onOpenChange}
      isMobile={isMobile}
      buttonRef={buttonRef}
      isTooltip={isTooltip}
    />
  );
}
