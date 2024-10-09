function adminMiddleware(req, res, next) {
    const adminEmail = req.body.email; 
  if (adminEmail === "admin1@gmail.com") {
    next(); 
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }

}

export default adminMiddleware;