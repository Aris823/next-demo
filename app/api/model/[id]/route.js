import Model from "@/models/Model"

export async function GET(request, { params }) {
    const id = params.id;
    const model = await Model.findById(id).populate("model");
    return Response.json(model);
  }
  
  export async function DELETE(request, { params }) {
    const id = params.id;
    return Response.json(await Model.findByIdAndDelete(id));
  }
  