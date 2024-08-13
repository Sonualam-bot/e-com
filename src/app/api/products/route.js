export async function GET() {
  const data = await fetch("https://fakestoreapi.in/api/products", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return Response.json({ data });
}
