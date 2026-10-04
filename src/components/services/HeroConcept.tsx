import { useServiceStory } from "@/lib/use-content";
import type { Service } from "@/data/services";

type ConceptProps = { slug: Service["slug"]; accent: string };

const S = {
  frame: (color: string) => ({
    fill: "none",
    stroke: color,
    strokeWidth: 1.2,
    rx: 10,
  }),
};

/**
 * Decorative, per-service schematic shown in the service hero. These are pure
 * SVG line drawings - no raster assets, no logos, instantly crisp at any size.
 */
export function HeroConcept({ slug, accent }: ConceptProps) {
  const a = accent;
  // The schematic labels are decorative, but they still follow the region so a
  // concept panel never mixes English words into an Arabic page.
  const crmStages = useServiceStory("crm").stages;
  const erpnextModules = useServiceStory("erpnext").modules;
  const erpnextFlow = useServiceStory("erpnext").documentFlow;
  const posTotal = useServiceStory("pos").totalLabel;
  const customLayers = useServiceStory("customSoftware").layers.map((layer, index) => ({
    y: [30, 76, 122, 168][index],
    w: [250, 210, 178, 148][index],
    l: layer.name,
  }));

  if (slug === "ecommerce") {
    return (
      <svg viewBox="0 0 360 240" className="h-full w-full" role="presentation">
        <rect {...S.frame("rgba(76,181,133,0.14)")} x={30} y={14} width={230} height={132} />
        <rect {...S.frame("rgba(76,181,133,0.22)")} x={66} y={48} width={230} height={132} />
        <rect {...S.frame("rgba(76,181,133,0.45)")} x={102} y={82} width={230} height={132} />
        <rect x={102} y={82} width={230} height={132} rx={10} fill="rgba(76,181,133,0.06)" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={128 + i * 56}
            y={108}
            width={40}
            height={52}
            rx={6}
            fill="rgba(76,181,133,0.12)"
            stroke={a}
            strokeWidth={1}
          />
        ))}
        <rect x={128} y={178} width={88} height={18} rx={9} fill={a} opacity={0.9} />
        <path d="M246 104 a10 10 0 0 1 18 0" stroke={a} strokeWidth={2} fill="none" />
        <circle cx={272} cy={104} r={7} fill="none" stroke={a} strokeWidth={2} />
      </svg>
    );
  }

  if (slug === "crm") {
    return (
      <svg viewBox="0 0 360 240" className="h-full w-full" role="presentation">
        <path
          d="M24 128 C 100 96, 180 160, 256 120"
          stroke="rgba(239,87,144,0.4)"
          strokeWidth={1}
          strokeDasharray="3 4"
          fill="none"
        />
        {[
          { x: 24, y: 128 },
          { x: 96, y: 116 },
          { x: 266, y: 120 },
          { x: 340, y: 118 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === 3 ? 9 : 6}
            fill={i === 3 ? a : "none"}
            stroke={a}
            strokeWidth={2}
          />
        ))}
        {[
          { x: 24, label: crmStages[0].label, y: 128 },
          { x: 96, label: crmStages[1].label, y: 116 },
          { x: 264, label: crmStages[2].label, y: 120 },
          { x: 340, label: crmStages[3].label, y: 118 },
        ].map((p) => (
          <text key={p.label} x={p.x} y={p.y + 34} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize={8}>
            {p.label}
          </text>
        ))}
        <rect x={120} y={180} width={120} height={18} rx={9} fill={a} opacity={0.85} />
        <text x={180} y={193} textAnchor="middle" fill="#0a1e3c" fontSize={9} fontWeight={700}>
          {crmStages[4].label}
        </text>
      </svg>
    );
  }

  if (slug === "erp") {
    return (
      <svg viewBox="0 0 360 240" className="h-full w-full" role="presentation">
        <circle cx={180} cy={118} r={62} fill="none" stroke={a} strokeWidth={1} strokeDasharray="3 5" />
        <circle cx={180} cy={118} r={34} fill="rgba(255,199,67,0.08)" stroke={a} strokeWidth={1.5} />
        <text x={180} y={124} textAnchor="middle" fill={a} fontSize={11} fontWeight={700}>
          ERP
        </text>
        {[
          { dx: 0, dy: -86, t: "01" },
          { dx: 78, dy: -40, t: "02" },
          { dx: 78, dy: 40, t: "03" },
          { dx: 0, dy: 86, t: "04" },
          { dx: -78, dy: 40, t: "05" },
          { dx: -78, dy: -40, t: "06" },
        ].map((n) => (
          <g key={n.t}>
            <line x1={180} y1={118} x2={180 + n.dx} y2={118 + n.dy} stroke="rgba(255,199,67,0.35)" strokeWidth={1} />
            <rect
              x={180 + n.dx - 13}
              y={118 + n.dy - 13}
              width={26}
              height={26}
              rx={7}
              fill="rgba(255,199,67,0.1)"
              stroke={a}
              strokeWidth={1.2}
            />
            <text x={180 + n.dx} y={122 + n.dy} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={9}>
              {n.t}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (slug === "erpnext") {
    return (
      <svg viewBox="0 0 360 240" className="h-full w-full" role="presentation">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const filled = i <= 5;
          return (
            <rect
              key={i}
              x={56 + col * 70}
              y={44 + row * 52}
              width={52}
              height={36}
              rx={8}
              fill={filled ? "rgba(109,142,193,0.16)" : "rgba(255,255,255,0.03)"}
              stroke={filled ? a : "rgba(255,255,255,0.22)"}
              strokeWidth={1.2}
            />
          );
        })}
        <path d="M40 196 H 320" stroke="rgba(109,142,193,0.4)" strokeWidth={1} strokeDasharray="3 4" />
        <polygon points="320,196 312,192 312,200" fill={a} />
        <text x={56} y={226} fill="rgba(255,255,255,0.5)" fontSize={8}>
          {erpnextModules[0].toLowerCase()}
        </text>
        <text x={260} y={226} fill="rgba(255,255,255,0.5)" fontSize={8}>
          {erpnextFlow[1].toLowerCase()}
        </text>
      </svg>
    );
  }

  if (slug === "pos") {
    return (
      <svg viewBox="0 0 360 240" className="h-full w-full" role="presentation">
        <rect x={26} y={28} width={210} height={168} rx={12} fill="rgba(76,181,133,0.04)" stroke={a} strokeWidth={1.2} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={46 + i * 14} cy={46} r={3} fill="rgba(255,255,255,0.35)" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={46} y={70 + i * 20} width={132} height={8} rx={4} fill="rgba(255,255,255,0.14)" />
        ))}
        <rect x={46} y={166} width={170} height={16} rx={8} fill={a} />
        <text x={52} y={178} fill="#0a1e3c" fontSize={9} fontWeight={700}>
          {posTotal}
        </text>
        <path d="M252 46 v128" stroke="rgba(76,181,133,0.35)" strokeWidth={1} strokeDasharray="3 4" />
        <path
          d="M252 46 h64 v128 M252 70 h40 M252 92 h52 M252 116 h44 M252 140 h50 M252 166 h58"
          stroke="rgba(76,181,133,0.6)"
          strokeWidth={1}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" role="presentation">
      {customLayers.map((layer, i) => (
        <g key={layer.l}>
          <rect
            x={28 + i * 22}
            y={layer.y}
            width={layer.w}
            height={34}
            rx={9}
            fill={i === 0 ? "rgba(239,87,144,0.14)" : "rgba(255,255,255,0.03)"}
            stroke={i === 0 ? a : "rgba(255,255,255,0.28)"}
            strokeWidth={1.2}
          />
          <text x={38 + i * 22 + 10} y={layer.y + 21} fill={i === 0 ? a : "rgba(255,255,255,0.5)"} fontSize={9} fontWeight={i === 0 ? 700 : 500}>
            {layer.l}
          </text>
        </g>
      ))}
      <line x1={316} y1={34} x2={316} y2={220} stroke="rgba(239,87,144,0.4)" strokeWidth={1} strokeDasharray="3 4" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={316} cy={47 + i * 46} r={3} fill={a} />
      ))}
    </svg>
  );
}