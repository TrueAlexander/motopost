import connect from "@/utils/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"


export const PUT = async (request, {params}) => {

  const {slug} = params
  const postData  = await request.json() 

  await connect()

  try {
    console.log("slug: ", slug)
    const post = await Post.findOneAndUpdate(
      slug,                                           
      { $set: { 
        slug: postData.slug,
        title: postData.title,
        content: postData.content,
        img: postData.img,
        catSlug: postData.catSlug,
        // author: session?.data?.user.name,
        // authorEmail: session?.data?.user.email,
        category: postData.category,
      } },  
      { new: true }  
    )

    console.log(post)

    if (!post) {
      return new NextResponse("Post not found", {
        status: 404, 
      })
    }

    return new NextResponse("Post has been updated", {
      status: 200,
    })
    
  } catch (error) {
    console.log("error is here: ", error.message)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}


// export const PUT = async (request, {params}) => {

//   const {id} = params;
//   const body = await request.json()

//   try{
//      await connect();
//      const post = await Post.findByIdAndUpdate(id, 
//       { title: body.newTitle, content: body.newContent , img: body.newImg}, 
//       { new: true } )
//       if (!post) {
//           return new NextResponse("Post was not found", {status: 404});
//       }
//       return new NextResponse("Post was updated successfully", {status: 200});

//   }catch(err){
//       console.log(err)
//       return new NextResponse("Database Error",{status: 500});
//   }
  
// }