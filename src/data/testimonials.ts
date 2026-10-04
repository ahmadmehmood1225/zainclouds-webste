/**
 * Client testimonials.
 *
 * `video` is a short recorded clip, not the long conversation. The originals are 20 to
 * 30 minute recordings that stay unpublished; what is published here is a 10 to 30
 * second clip per client, shot vertically on a phone, which is the only format that
 * works in a narrow grid.
 *
 * That format drives the whole card:
 *
 * - The clips are portrait 9:16, so the media frame is `aspect-[9/16]` rather than a
 *   wide crop. Cropping a vertical recording into a 16:9 frame cuts the speaker's head
 *   off, which is the one thing a testimonial clip cannot do.
 * - Every clip has an audio track, and browsers refuse to autoplay an unmuted video.
 *   Hover therefore previews **muted** and looping, and sound is something the reader
 *   opts into with the speaker control or the play button. Hovering a card never makes
 *   noise on its own.
 * - `poster` is a frame grabbed from the clip, so a card that has not been touched yet
 *   costs one small JPEG and zero bytes of video.
 * - A clip is attached to its card only once the card is near the viewport, and the
 *   four clips together are about 10 MB, so none of them is fetched speculatively.
 *
 * Removing a clip is a one line edit. With no `video` the card falls back to its
 * poster and an honest "on request" state, and never requests anything.
 */
export type Testimonial = {
  slug: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  project: string;
  /** 0 to 3, drives the accent used for the quote mark. */
  tone: "green" | "pink" | "yellow";
  video?: string;
  poster?: string;
  /** Clip length as shown on the badge, for example "0:24". */
  duration?: string;
};

export const testimonials: Testimonial[] = [
  {
    slug: "baba-foods",
    quote:
      "We had four systems that each owned a piece of the truth. Zain Clouds consolidated them, migrated what we had, and trained the floor staff in three weeks. The first month end we did not have to reconcile anything by hand, and that has not changed since.",
    name: "Operations Manager",
    role: "Food manufacturing",
    company: "Baba Foods",
    project: "Baba Foods",
    tone: "green",
    video: "/images/reviews/review-1.mp4",
    poster: "/images/reviews/review-1-poster.jpg",
    duration: "0:10",
  },
  {
    slug: "captain-chef",
    quote:
      "Peak hours used to mean someone standing at a screen watching orders. The kitchen display, the driver tracking and the payment all come from one place now, so we can take an order without asking anyone for a status.",
    name: "Founder",
    role: "Food delivery",
    company: "Captain Chef",
    project: "Captain Chef",
    tone: "pink",
    video: "/images/reviews/review-2.mp4",
    poster: "/images/reviews/review-2-poster.jpg",
    duration: "0:25",
  },
  {
    slug: "mellot",
    quote:
      "They wrote the spec with us before they wrote any code, and pushed back on two things we had asked for because they would not have survived real use. That conversation is the reason the pipeline actually gets used.",
    name: "Head of Sales",
    role: "Professional services",
    company: "Mellot",
    project: "Mellot",
    tone: "yellow",
    video: "/images/reviews/review-3.mp4",
    poster: "/images/reviews/review-3-poster.jpg",
    duration: "0:15",
  },
  {
    slug: "drs-lounge",
    quote:
      "Bookings, service history and end of day reconciliation used to be three separate things at close. It is one screen now and it takes a fraction of the time. Our clients notice the speed.",
    name: "Salon Director",
    role: "Beauty and wellness",
    company: "Dr's Lounge",
    project: "Dr's Lounge",
    tone: "green",
    video: "/images/reviews/review-4.mp4",
    poster: "/images/reviews/review-4-poster.jpg",
    duration: "0:29",
  },
];
