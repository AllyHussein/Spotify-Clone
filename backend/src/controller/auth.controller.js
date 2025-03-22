import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // Create new user in the database
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error In Auth Callback", error);
    next(error);
  }
};
