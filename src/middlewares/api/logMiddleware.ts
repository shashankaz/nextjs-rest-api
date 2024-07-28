function logMiddleware(req: Request) {
  return { response: req.method + " " + req.url + " YES" };
}

export default logMiddleware;