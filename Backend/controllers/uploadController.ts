import type { Request, Response } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const upload = multer(); // memory storage

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const uploadProfileImage = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ error: "No file uploaded" });
      console.log(601, "file: ", file);

      const fileName = `${uuidv4()}-${file.originalname}`;

      const { data, error } = await supabase.storage
        .from("storage")
        .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (error)
        return res.status(500).json({ error: "Upload failed", detail: error });

      const { data: urlData } = supabase.storage
        .from("storage")
        .getPublicUrl(fileName);

      res.status(200).json({ fileName, url: urlData.publicUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error", detail: err });
    }
  },
];
