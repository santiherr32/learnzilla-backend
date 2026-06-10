import { HttpError } from "../utils/HttpError.js";

const validateCourse = (req, res, next) => {
    const { name, price, description, img } = req.body;
  
    // Validar campos requeridos
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new HttpError(400, { error: "El nombre es obligatorio y debe ser un texto válido." });
    }
  
    if (!price || typeof price !== "number" || price <= 0) {
      throw new HttpError(400, { error: "El precio debe ser un número mayor a 0." });
    }
  
    if (!description || typeof description !== "string" || description.length < 10) {
      throw new HttpError(400, {
        error: "La descripción debe tener al menos 10 caracteres.",
      });
    }
  
    if (!img || typeof img !== "string" || !img.startsWith("http")) {
      throw new HttpError(400, { error: "La URL de la imagen no es válida." });
    }
  
    next(); // Si todo es válido, pasa al siguiente middleware o controlador
  };
  
  export default validateCourse;
  