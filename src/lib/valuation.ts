const vehicleCatalog = [
  { make: "Audi", model: "A6 Saloon", imageSrc: "/assets/audi-a6.png" },
  { make: "BMW", model: "3 Series", imageSrc: "/assets/audi-a6.png" },
  { make: "Volkswagen", model: "Golf GTI Auto", imageSrc: "/assets/audi-a6.png" },
  { make: "Ford", model: "Focus ST-Line", imageSrc: "/assets/audi-a6.png" },
  { make: "Mercedes-Benz", model: "C-Class", imageSrc: "/assets/audi-a6.png" },
  { make: "Toyota", model: "Corolla Hybrid", imageSrc: "/assets/audi-a6.png" },
];

export function normaliseRegistration(value: string) {
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (cleaned.length <= 4) {
    return cleaned;
  }

  return `${cleaned.slice(0, cleaned.length - 3)} ${cleaned.slice(-3)}`;
}

export function parseMileage(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function formatMileage(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildValuationPreview(registration: string, mileage: number) {
  const reg = normaliseRegistration(registration || "AB12 CDE");
  const safeMileage = Math.max(0, mileage || 45000);
  const regSignal = reg.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const base = 16250;
  const mileageAdjustment = Math.min(safeMileage * 0.045, 11800);
  const regAdjustment = (regSignal % 1600) - 800;
  const midpoint = clampToNearest50(base - mileageAdjustment + regAdjustment, 1450, 28450);
  const spread = Math.max(500, Math.round(midpoint * 0.08 / 50) * 50);
  const vehicleMatched = /^[A-Z0-9 ]{5,8}$/.test(reg);
  const vehicle = vehicleMatched ? vehicleCatalog[regSignal % vehicleCatalog.length] : null;

  return {
    found: !!vehicle,
    imageSrc: vehicle?.imageSrc ?? null,
    make: vehicle?.make ?? null,
    model: vehicle?.model ?? null,
    reg,
    mileage: safeMileage,
    low: midpoint - spread,
    high: midpoint + spread,
    midpoint,
  };
}

function clampToNearest50(value: number, min: number, max: number) {
  const clamped = Math.max(min, Math.min(max, value));
  return Math.round(clamped / 50) * 50;
}
