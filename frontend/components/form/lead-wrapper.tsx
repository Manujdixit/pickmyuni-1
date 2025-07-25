import dynamic from "next/dynamic";

const ApplicationModal = dynamic(
  () => import("./lead-modal").then((mod) => mod.ApplicationModal),
  {
    ssr: false,
  }
);

interface ContactWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeadWrapper({
  open,
  onOpenChange,
}: ContactWrapperProps) {
  // Only render the modal when it's actually needed (open)
  if (!open) {
    return null;
  }

  return <ApplicationModal open={open} onOpenChange={onOpenChange} />;
}
