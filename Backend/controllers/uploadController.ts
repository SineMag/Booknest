import type { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const uploadProfileImage = async (req: Request, res: Response) => {
  console.log(200, req.body);
  try {
    const { fileName, fileType } = req.body;

    console.log(201, fileName, fileType);

    if (!fileName || !fileType)
      return res.status(400).json({ error: "Missing fileName or fileType" });

    // Generate signed URL
    const { data, error } = await supabase.storage
      .from("storage")
      .createSignedUploadUrl(fileName);

    console.log(202, data, error);

    if (error) throw error;

    res.status(200).json({ signedUrl: data.signedUrl, fileName });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
