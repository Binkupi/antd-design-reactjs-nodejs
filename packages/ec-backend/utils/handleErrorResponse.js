module.exports = {
  badRequest: (res, message, data) => res.status(400).json({ message, data }),

  notFound: (res, message, data) => res.status(404).json({ message, data }),

  badGateway: (res, message, data) => res.status(502).json({ message, data }),

  unauthorized: (res, message, data) => res.status(401).json({ message, data }),

  forbidden: (res, message, data) => res.status(403).json({ message, data }),
};
