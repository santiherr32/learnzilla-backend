const validateCourse = (req, res, next) => {
    const { name, price, description, img } = req.body;
  
    // Validar campos requeridos
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio y debe ser un texto válido." });
    }
  
    if (!price || typeof price !== "number" || price <= 0) {
      return res.status(400).json({ error: "El precio debe ser un número mayor a 0." });
    }
  
    if (!description || typeof description !== "string" || description.length < 10) {
      return res.status(400).json({
        error: "La descripción debe tener al menos 10 caracteres.",
      });
    }
  
    if (!img || typeof img !== "string" || !img.startsWith("http")) {
      return res.status(400).json({ error: "La URL de la imagen no es válida." });
    }
  
    next(); // Si todo es válido, pasa al siguiente middleware o controlador
  };
  
  module.exports = validateCourse;
  