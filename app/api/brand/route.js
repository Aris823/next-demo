import Brand from "@/models/Brand";

export async function GET() {
  const brands = await Brand.find().sort({order:-1})
  return Response.json(brands)
}

export async function POST(request) {
  const body = await request.json()
  const brand = new Brand(body)
  await brand.save()
  return Response.json(brand)
}

export async function PUT(request) {
  const body = await request.json()
  const brand = await Brand.findByIdAndUpdate(body._id, body)
  return Response.json(brand)
}

