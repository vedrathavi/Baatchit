import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";

export const createChannel = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    const userId = req.userId;

    console.log("Creating channel with:", { name, members, userId });

    const admin = await User.findById(userId);
    if (!admin) {
      return res.status(400).send("Admin not found.");
    }

    const validMembers = await User.find({ _id: { $in: members } });

    console.log("Valid members found:", validMembers);

    if (validMembers.length !== members.length) {
      return res.status(400).send("Some members are not valid users");
    }

    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });

    await newChannel.save();
    console.log("Channel created:", newChannel);
    return res.status(201).json({ channel: newChannel });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("Internal Server Error");
  }
};
