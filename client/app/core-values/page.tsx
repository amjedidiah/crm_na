import CoreValuesGrid from "@/components/about/CoreValuesGrid";
import PageHeader from "@/components/shared/PageHeader";

function CoreValuesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Core Values"
        title="Structured values content replaces the legacy empty page."
        description="The page exists in the v1 scaffold even though the live page was empty during the audit."
      />
      <CoreValuesGrid />
    </>
  );
}

export default CoreValuesPage;
