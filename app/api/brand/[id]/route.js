import Brand from "@/models/Brand"

export async function GET(request, { params }) {
    const id = params.id;
    const brand = await Model.findById(id).populate("brand");
    return Response.json(brand);
  }
  
  export async function DELETE(request, { params }) {
    const id = params.id;
    return Response.json(await Brand.findByIdAndDelete(id));
  }
  