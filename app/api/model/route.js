import Model from "@/models/Model";

export async function GET() {
  const models = await Model.find().sort({order:-1})
  return Response.json(models)
}

export async function POST(request) {
  const body = await request.json()
  const model = new Model(body)
  await model.save()
  return Response.json(model)
}

export async function PUT(request) {
  const body = await request.json()
  const model = await Model.findByIdAndUpdate(body._id, body)
  return Response.json(model)
}

