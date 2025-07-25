import dynamic from "next/dynamic";

const ConsultationModal = dynamic(
  () => import("../form/contact-modal").then((mod) => mod.ConsultationModal),
  {
    ssr: false,
  },
);

interface ContactWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactWrapper({
  open,
  onOpenChange,
}: ContactWrapperProps) {
  // Only render the modal when it's actually needed (open)
  if (!open) {
    return null;
  }

  return <ConsultationModal open={open} onOpenChange={onOpenChange} />;
}
