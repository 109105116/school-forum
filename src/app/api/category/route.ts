import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CategoryValidator } from "@/lib/validators/category";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, url, image, description } = CategoryValidator.parse(body);

    // check if category already exists
    const categoryExists = await db.category.findFirst({
      where: {
        url,
      },
    });

    if (categoryExists) {
      return new Response("Category already exists", { status: 409 });
    }

    // create category and associate it with the user
    const category = await db.category.create({
      data: {
        name: name,
        url: url,
        image: image,
        description: description,
        creatorId: session.user.id,
      },
    });

    // creator also has to be follow
    await db.follow.create({
      data: {
        userId: session.user.id,
        categoryId: category.id,
      },
    });

    return new Response(category.url);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create category", { status: 500 });
  }
}
