export type Leader = {
  slug: string;
  name: string;
  /** Short role line, the one that appears under the name. */
  role: string;
  /** Optional introduction, omitted until the person supplies approved copy. */
  bio: string;
  /**
   * Optional portrait in `public/images/team`. Leave unset until an approved photo
   * is available; the card displays an initials placeholder in the meantime.
   */
  image?: string;
  /** Office this person works from, used to group leadership by region. */
  location?: string;
};

/**
 * Leadership.
 *
 * Names and titles were supplied by the company. Portraits and biographies can be
 * added when approved assets and copy are available.
 */
export const leadership: Leader[] = [
  {
    slug: "zain-ul-abideen",
    name: "Zain ul Abideen",
    role: "Chief Executive Officer",
    bio: "",
  },
  {
    slug: "salman-rasheed",
    name: "Salman Rasheed",
    role: "Co-founder & Managing Director",
    bio: "",
  },
  {
    slug: "wajahat-ali",
    name: "Wajahat Ali",
    role: "Chief Technical Officer",
    bio: "",
  },
  {
    slug: "makki-ijaz",
    name: "Makki Ijaz",
    role: "Chief Operating Officer",
    bio: "",
  },
];
