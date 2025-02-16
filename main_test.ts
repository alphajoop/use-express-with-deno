import { assert, assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";

const baseUrl = "http://localhost:8000";

Deno.test("GET /", async () => {
  const response = await fetch(`${baseUrl}/`);
  const json = await response.json();
  assertEquals(response.status, 200);
  assertEquals(json, "Welcome to the Dinosaur API!");
});


Deno.test("GET /api", async () => {
  const response = await fetch(`${baseUrl}/api`);
  const data = await response.json();
  assertEquals(response.status, 200);
  assert(Array.isArray(data));
  assert(data.length > 0);
});

Deno.test("GET /api/:dinosaur", async () => {
  const response = await fetch(`${baseUrl}/api/Aardonyx`);
  const data = await response.json();
  assertEquals(response.status, 200);
  assertEquals(data.name, "Aardonyx");
  assertEquals(data.description, "An early stage in the evolution of sauropods.");
});
