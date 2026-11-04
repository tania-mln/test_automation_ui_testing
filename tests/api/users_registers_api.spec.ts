import { test, expect } from "@playwright/test";
import { generateUserData } from "../../test-data-api/user-data";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api-config";

test.use({ baseURL: API_BASE_URL });
let userData: ReturnType<typeof generateUserData>;
test.beforeEach(async () => {
  userData = generateUserData();
});

test("Register user with valid data", async ({ request }) => {
  const response = await request.post(API_ENDPOINTS.register, {
    data: userData,
  });

  expect(response.status()).toBe(201);
  const responseBody = await response.json();

  expect(responseBody.first_name).toBe(userData.first_name);
  expect(responseBody.last_name).toBe(userData.last_name);
  expect(responseBody.email).toBe(userData.email);
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).not.toHaveProperty("password");
});

test("Registration with existing email", async ({ request }) => {
  const userData = generateUserData();

  const firstResponse = await request.post(API_ENDPOINTS.register, {
    data: userData,
  });
  expect(firstResponse.status()).toBe(201);

  const secondResponse = await request.post(API_ENDPOINTS.register, {
    data: userData,
  });
  expect(secondResponse.status()).toBe(409);
  const responseBody = await secondResponse.json();
  expect(responseBody.email).toContain(
    "A customer with this email address already exists.",
  );
});
