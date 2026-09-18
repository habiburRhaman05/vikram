/**
 * World lists for the /onboarding wizard: countries (with flag and dial code),
 * subdivisions and major cities, currencies, languages and IANA time zones.
 *
 * Countries, languages and currencies come from the `countries-list` package
 * (ISO 3166-1 / 639-1 / 4217 data, MIT) rather than being hand-maintained here -
 * a hardcoded country list is the kind of file that silently rots, and the
 * wizard needs a flag and a calling code for every one of them.
 *
 * Subdivisions and cities ARE hand-curated: there is no small package that
 * ships worldwide regions, and the ones that do weigh megabytes, which the
 * onboarding chunk would pay for on every start. The countries below cover
 * the markets this agency actually onboards into; every other country falls
 * back to a free-text field, so nothing is unreachable.
 */
import { countries, getEmojiFlag, languages } from "countries-list";
import { currencies } from "countries-list/currencies";

/** Floated to the top of the country list - search still finds anything. */
const POPULAR = [
  "US",
  "CA",
  "GB",
  "AU",
  "IE",
  "NZ",
  "AE",
  "SG",
  "IN",
  "ZA",
  "PH",
  "PK",
  "NG",
  "DE",
  "FR",
  "ES",
  "IT",
  "NL",
  "BR",
  "MX",
];

const popularRank = new Map(POPULAR.map((code, i) => [code, i]));

/** Every ISO country, sorted popular-first then alphabetically. `dial` is the
 *  first calling code countries-list lists (US and CA both sit on +1). */
export const COUNTRIES = Object.keys(countries)
  .map((code) => {
    const entry = countries[code];
    return {
      code,
      name: entry.name,
      flag: getEmojiFlag(code),
      dial: entry.phone?.length ? `+${entry.phone[0]}` : "",
      currencies: entry.currency || [],
      /* ISO 639-1 codes - used to pre-fill the language fields from the
         country, which is right more often than it's wrong. */
      languages: entry.languages || [],
      continent: entry.continent,
    };
  })
  .sort((a, b) => {
    const ra = popularRank.has(a.code) ? popularRank.get(a.code) : Infinity;
    const rb = popularRank.has(b.code) ? popularRank.get(b.code) : Infinity;
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name);
  });

const COUNTRY_BY_CODE = new Map(COUNTRIES.map((c) => [c.code, c]));

/** The country above, by ISO code or by its display name - the wizard only
 *  stores names on screen, and every rule keyed on the country needs the code. */
const COUNTRY_BY_NAME = new Map(COUNTRIES.map((c) => [c.name, c]));

export function countryByCode(code) {
  return COUNTRY_BY_CODE.get(code) || null;
}

export function countryByName(name) {
  return COUNTRY_BY_NAME.get(name) || null;
}

/** Used to seed currency/language defaults before a country is chosen. */
export const DEFAULT_COUNTRY_CODE = "US";

/** English name of an ISO 639-1 code, for pre-filling language pickers. */
export function languageNameForCode(code) {
  const name = languages[code]?.name;
  return name && LANGUAGES.some((l) => l.value === name) ? name : "";
}

/** Currencies any selected country uses, with their English names. */
export const CURRENCIES = [...new Set(COUNTRIES.flatMap((c) => c.currencies))]
  .filter((code) => currencies[code])
  .sort()
  .map((code) => ({
    value: code,
    label: code,
    hint: `${currencies[code].name} (${currencies[code].symbol})`,
  }));

/** Every ISO 639-1 language, labelled by English name and searchable by its
 *  native spelling, so "Español" finds Spanish. */
export const LANGUAGES = [
  ...Object.keys(languages)
    .map((code) => ({
      value: languages[code].name,
      label: languages[code].name,
      hint: code,
      keywords: languages[code].native,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)),
  { value: "Other", label: "Other", hint: "not listed" },
];

/* ── Subdivisions ───────────────────────────────────────────────────────── */

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

const CA_PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec",
  "Saskatchewan", "Yukon",
];

const AU_STATES = [
  "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland",
  "South Australia", "Tasmania", "Victoria", "Western Australia",
];

const IN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

const NZ_REGIONS = [
  "Auckland", "Bay of Plenty", "Canterbury", "Gisborne", "Hawke's Bay", "Manawatū-Whanganui",
  "Marlborough", "Nelson", "Northland", "Otago", "Southland", "Taranaki", "Tasman", "Waikato",
  "Wellington", "West Coast",
];

const IE_COUNTIES = [
  "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny",
  "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly",
  "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow",
];

const ZA_PROVINCES = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West",
  "Northern Cape", "Western Cape",
];

const AE_EMIRATES = [
  "Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain",
];

const DE_STATES = [
  "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse",
  "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate",
  "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia",
];

const FR_REGIONS = [
  "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica",
  "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie",
  "Pays de la Loire", "Provence-Alpes-Côte d'Azur",
];

const ES_REGIONS = [
  "Andalusia", "Aragon", "Asturias", "Balearic Islands", "Basque Country", "Canary Islands",
  "Cantabria", "Castile and León", "Castilla-La Mancha", "Catalonia", "Ceuta", "Extremadura", "Galicia",
  "La Rioja", "Madrid", "Melilla", "Murcia", "Navarre", "Valencian Community",
];

const IT_REGIONS = [
  "Abruzzo", "Aosta Valley", "Apulia", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
  "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardy", "Marche", "Molise", "Piedmont", "Sardinia",
  "Sicily", "Trentino-South Tyrol", "Tuscany", "Umbria", "Veneto",
];

const NL_PROVINCES = [
  "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "North Brabant",
  "North Holland", "Overijssel", "South Holland", "Utrecht", "Zeeland",
];

const BR_STATES = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
  "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná",
  "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
];

const MX_STATES = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
  "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero",
  "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro",
  "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala",
  "Veracruz", "Yucatán", "Zacatecas",
];

const PH_REGIONS = [
  "National Capital Region (Metro Manila)", "Cordillera Administrative Region", "Ilocos Region",
  "Cagayan Valley", "Central Luzon", "CALABARZON", "MIMAROPA", "Bicol Region", "Western Visayas",
  "Central Visayas", "Eastern Visayas", "Zamboanga Peninsula", "Northern Mindanao", "Davao Region",
  "SOCCSKSARGEN", "Caraga", "BARMM",
];

const PK_PROVINCES = [
  "Azad Kashmir", "Balochistan", "Gilgit-Baltistan", "Islamabad Capital Territory",
  "Khyber Pakhtunkhwa", "Punjab", "Sindh",
];

const NG_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal Capital Territory", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const BD_DIVISIONS = [
  "Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet",
];

const LK_PROVINCES = [
  "Central", "Eastern", "North Central", "Northern", "North Western", "Sabaragamuwa", "Southern",
  "Uva", "Western",
];

export const REGIONS_BY_COUNTRY = {
  US: US_STATES,
  CA: CA_PROVINCES,
  AU: AU_STATES,
  GB: ["England", "Scotland", "Wales", "Northern Ireland"],
  IN: IN_STATES,
  NZ: NZ_REGIONS,
  IE: IE_COUNTIES,
  ZA: ZA_PROVINCES,
  AE: AE_EMIRATES,
  DE: DE_STATES,
  FR: FR_REGIONS,
  ES: ES_REGIONS,
  IT: IT_REGIONS,
  NL: NL_PROVINCES,
  BR: BR_STATES,
  MX: MX_STATES,
  PH: PH_REGIONS,
  PK: PK_PROVINCES,
  NG: NG_STATES,
  BD: BD_DIVISIONS,
  LK: LK_PROVINCES,
};

/** What the rest of the world calls the subdivision between City and Postal -
 *  the field is the same, only the label changes. */
const REGION_LABELS = {
  US: "State",
  CA: "Province",
  AU: "State/Territory",
  GB: "Nation",
  IN: "State/UT",
  NZ: "Region",
  IE: "County",
  ZA: "Province",
  AE: "Emirate",
  DE: "State",
  FR: "Region",
  ES: "Region",
  IT: "Region",
  NL: "Province",
  BR: "State",
  MX: "State",
  PH: "Region",
  PK: "Province",
  NG: "State",
  BD: "Division",
  LK: "Province",
};

export function regionLabelFor(countryCode) {
  return REGION_LABELS[countryCode] || "State/Prov/Region";
}

export function regionsFor(countryCode) {
  return REGIONS_BY_COUNTRY[countryCode] || null;
}

/** US addresses say "ZIP", most of the world does not. */
export function postalLabelFor(countryCode) {
  if (countryCode === "US") return "ZIP Code";
  if (["CA", "GB", "IN", "NZ", "IE", "ZA", "NG", "PK", "AE"].includes(countryCode)) return "Postcode";
  return "Postal Code";
}

/* ── Cities ─────────────────────────────────────────────────────────────── */

/** Suggestions only - the field stays free text, so a town that isn't listed
 *  is typed rather than blocked. */
export const CITIES_BY_COUNTRY = {
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Columbus", "Indianapolis", "Seattle", "Denver", "Boston", "Nashville", "Portland", "Las Vegas", "Miami", "Atlanta", "Charlotte", "Raleigh", "Tampa", "Minneapolis", "Detroit", "Salt Lake City", "Kansas City", "Reading", "Albany"],
  CA: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Saskatoon", "Regina", "St. John's"],
  GB: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Newcastle upon Tyne", "Sheffield", "Bristol", "Edinburgh", "Cardiff", "Belfast", "Nottingham", "Leicester", "Southampton", "Reading", "Oxford", "Cambridge"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Hobart", "Darwin", "Cairns", "Wollongong"],
  IN: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow", "Indore", "Chandigarh", "Kochi", "Coimbatore", "Nagpur"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain"],
  NZ: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Dunedin", "Palmerston North"],
  IE: ["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Drogheda", "Kilkenny", "Sligo"],
  ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Stellenbosch"],
  DE: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen"],
  FR: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille", "Rennes"],
  ES: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Bilbao", "Alicante"],
  IT: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Venice", "Verona"],
  NL: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen", "Tilburg"],
  BR: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Curitiba", "Recife", "Porto Alegre"],
  MX: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Cancún", "Querétaro"],
  PH: ["Manila", "Quezon City", "Cebu City", "Davao City", "Makati", "Iloilo City", "Bacolod", "Baguio"],
  PK: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"],
  NG: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City", "Enugu", "Abeokuta"],
  SG: ["Singapore"],
  MY: ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Kota Kinabalu", "Kuching"],
  BD: ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal"],
  LK: ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo"],
  KE: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  GH: ["Accra", "Kumasi", "Tamale", "Takoradi", "Cape Coast"],
};

export function citiesFor(countryCode) {
  return CITIES_BY_COUNTRY[countryCode] || null;
}

/* ── Time zones ─────────────────────────────────────────────────────────── */

/** Only used if Intl.supportedValuesOf("timeZone") isn't available (older
 *  Safari), which would otherwise leave the field with no options at all. */
const FALLBACK_ZONES = [
  "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "America/Phoenix", "America/Anchorage", "Pacific/Honolulu", "America/Toronto", "America/Vancouver",
  "America/Sao_Paulo", "America/Mexico_City", "Europe/London", "Europe/Dublin", "Europe/Paris",
  "Europe/Berlin", "Europe/Madrid", "Europe/Rome", "Europe/Amsterdam", "Europe/Lisbon",
  "Europe/Moscow", "Africa/Cairo", "Africa/Lagos", "Africa/Johannesburg", "Africa/Nairobi",
  "Asia/Dubai", "Asia/Karachi", "Asia/Kolkata", "Asia/Dhaka", "Asia/Bangkok", "Asia/Singapore",
  "Asia/Hong_Kong", "Asia/Shanghai", "Asia/Tokyo", "Asia/Seoul", "Australia/Perth", "Australia/Adelaide",
  "Australia/Brisbane", "Australia/Sydney", "Australia/Melbourne", "Pacific/Auckland", "Pacific/Fiji",
];

/** "America/Argentina/Buenos_Aires" is the city, the continent is noise. */
function zoneCity(zone) {
  const parts = zone.split("/");
  const last = parts[parts.length - 1] || zone;
  return last.replace(/_/g, " ").replace(/^St /, "St. ");
}

const offsetCache = new Map();

/** "GMT-4" for a zone, right now - cached, because every render of a 50-row
 *  list would otherwise build 50 Intl formatters. */
export function zoneOffset(zone) {
  if (offsetCache.has(zone)) return offsetCache.get(zone);
  let label = "";
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "shortOffset" })
      .formatToParts(new Date());
    label = parts.find((p) => p.type === "timeZoneName")?.value || "";
  } catch {
    label = "";
  }
  offsetCache.set(zone, label);
  return label;
}

let timeZoneCache = null;

export function timeZoneOptions() {
  if (timeZoneCache) return timeZoneCache;
  let zones = [];
  try {
    zones = Intl.supportedValuesOf?.("timeZone") || [];
  } catch {
    zones = [];
  }
  if (!zones.length) zones = FALLBACK_ZONES;
  timeZoneCache = zones.map((zone) => ({
    value: zone,
    label: zoneCity(zone),
    hint: zone,
    keywords: zone.replace(/[_/]/g, " "),
    /* A function, not a string: the offset is only formatted for rows that
       actually render, and zoneOffset caches the result. */
    meta: () => zoneOffset(zone),
  }));
  return timeZoneCache;
}

/** The visitor's own zone, pre-filled as a default - it's right far more often
 *  than it's wrong, and it's one less field to think about.
 *
 * Not checked against the option list: the browser names a zone the same way
 * its own Intl does, but ICU versions disagree on the odd alias
 * (Asia/Calcutta vs Asia/Kolkata), and dropping a perfectly valid zone just
 * because the list spells it differently would leave the field empty. The
 * combobox falls back to showing the raw stored value in that case. */
export function detectedTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
}
