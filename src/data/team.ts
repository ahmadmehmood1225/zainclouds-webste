export type TeamDiscipline = {
  name: string;
  description: string;
};

export const teamDisciplines: TeamDiscipline[] = [
  {
    name: "Leadership",
    description:
      "Directors and program leads who own the outcome, from first workshop to stable operation.",
  },
  {
    name: "Engineering",
    description:
      "Software engineers building storefronts, POS systems, ERPs and custom platforms with testable code.",
  },
  {
    name: "Product",
    description:
      "Product managers who translate business requirements into systems the team can build and use.",
  },
  {
    name: "Design",
    description:
      "Designers who shape interfaces that are clear for the staff who live in them every day.",
  },
  {
    name: "Implementation",
    description:
      "Implementers who handle configuration, data migration, integrations and clean go lives.",
  },
  {
    name: "Support",
    description:
      "Support engineers who stay available after deployment and keep systems healthy.",
  },
];