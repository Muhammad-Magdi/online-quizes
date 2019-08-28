const ACCEPTEDTOKEN = 'HelloWorld';

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-fake-token');
    if (token !== ACCEPTEDTOKEN) {
      throw new Error();
    }
    next();
  } catch (e) {
    res.status(401).send({ error: 'Not Authenticated!' });
  }
};

module.exports = auth;
