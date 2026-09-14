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
};
