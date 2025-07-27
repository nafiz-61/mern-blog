exports.validateBody = (req) => {
  if (req) {
    for (let field in req.body) {
      if (req.body[field] === "") {
        return { empty: true, fieldName: field };
      }
    }
    return { empty: false, fieldName: "" };
  }
};
