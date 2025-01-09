const z = require('zod')

// se utiliza zod para validar los datos del body
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5), // la propiedad puede ser default(5.5) / optional()
  poster: z.string().url({
    message: 'Movie poster must be a valid URL'
  }),
  genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Mystery', 'Thriller']), {
    required_error: 'Movie genre is required',
    invalid_type_error: 'Movie genre must be an array of strings'
  })
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
