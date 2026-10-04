import type { Service } from "@/data/services";
import { EcommerceStory } from "@/components/services/stories/EcommerceStory";
import { CrmStory } from "@/components/services/stories/CrmStory";
import { ErpStory } from "@/components/services/stories/ErpStory";
import { ErpNextStory } from "@/components/services/stories/ErpNextStory";
import { PosStory } from "@/components/services/stories/PosStory";
import { CustomSoftwareStory } from "@/components/services/stories/CustomSoftwareStory";

type ServiceStoryProps = { service: Service };

/**
 * Selects the bespoke storytelling component for each service. Each story has
 * its own framing and motion concept; nothing shares a section template.
 */
export function ServiceStory({ service }: ServiceStoryProps) {
  switch (service.slug) {
    case "ecommerce":
      return <EcommerceStory service={service} />;
    case "crm":
      return <CrmStory service={service} />;
    case "erp":
      return <ErpStory service={service} />;
    case "erpnext":
      return <ErpNextStory service={service} />;
    case "pos":
      return <PosStory service={service} />;
    case "custom-software":
      return <CustomSoftwareStory service={service} />;
    default:
      return null;
  }
}