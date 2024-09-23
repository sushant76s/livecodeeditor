const prisma = require("../config/prisma-db");

// snippetController.js
exports.saveSnippet = async (req, res) => {
  const { roomId, content } = req.body;
  try {
    const codeSnippet = await prisma.codeSnippet.create({
      data: {
        roomId,
        content,
      },
    });
    res.status(201).json({ message: "Code snippet saved", codeSnippet });
  } catch (err) {
    res.status(400).json({ error: "Saving code snippet failed", err });
  }
};
