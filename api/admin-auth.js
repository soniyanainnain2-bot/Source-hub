
module.exports = (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return res.status(500).json({
      success: false,
      error: "ADMIN_PASSWORD is not configured in Vercel"
    });
  }

  const suppliedPassword =
    req.body && req.body.password;

  if (
    typeof suppliedPassword !== "string" ||
    suppliedPassword !== configuredPassword
  ) {
    return res.status(401).json({
      success: false,
      error: "Wrong admin password"
    });
  }

  return res.status(200).json({
    success: true
  });
};
