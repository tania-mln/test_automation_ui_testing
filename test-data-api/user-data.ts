import { randomUUID } from "node:crypto";

export function generateUserData() {
  return {
    first_name: "Emily",
    last_name: "Smith",
    address: {
      street: "Stereet 1",
      houseNumber: "12",
      city: "Warsaw",
      state: "Mazowieckie",
      postal_code: "00-001",
    },
    phone: "123-456-7890",
    dob: "1990-01-01",
    password: "PoiuySecure123!",
    email: `test+${randomUUID()}@example.com`,
  };
}
