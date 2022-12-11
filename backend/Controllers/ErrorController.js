export const NotFoundController = (req, res, next) => {
  next({
    status: 404,
    message: "404 resourse not found",
  });
};

export const GlobalErrorHandler = (
  {
    status = 500,
    message = "sorry someting went wrong please try again after",
  },
  req,
  res,
  next
) => {
  res.status(status).json({
    status: "error",
    error: {
      message,
    },
  });
};
