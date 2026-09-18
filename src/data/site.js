/** Real contact details. These are actual phone/email/address values, not
 * display copy, so each one only changes when someone gives us the real
 * replacement.
 *
 * The email is now the GHLevelUp one. The phone, address and hours are
 * still the originals carried over from the static site - they have not
 * been replaced because no new values have been supplied, not because
 * they are known to be current.
 *
 * One definition, read by the footers, About, Contact, the legal pages
 * and the LocalBusiness structured data - so changing a value here
 * changes it everywhere it is shown or published. */
export const SITE = {
  phone: "(518) 250-9662",
  phoneHref: "tel:+15182509662",
  email: "admin@ghlevelup.com",
  emailHref: "mailto:admin@ghlevelup.com",
  addressLine1: "292 Washington Ave Ext, Ste 110",
  addressLine2: "Albany, NY 12203",
  mapsHref: "https://maps.google.com/?q=292+Washington+Ave+Ext+Ste+110+Albany+NY+12203",
  hours: "Mon–Fri, 9am–6pm ET",

  /* Who writes the blog. The byline on every post, and the name the
     BlogPosting structured data publishes as its author - search engines
     treat an unattributed article as lower quality, so this is an SEO
     field, not decoration.

     Vikram is also the name in About's founder letter and the home page's
     founder note. Those two files still spell it out for themselves; this
     is the third copy, kept here because data/blog.js must not import
     homeV2.jsx (homeV2 imports blog.jsx for its post list, and a cycle
     between two data modules is how you get one of them evaluating as
     half-undefined). */
  founder: {
    name: "Vikram Angurala",
    role: "Founder, GHLevelUp",
    href: "/about",
  },
};
